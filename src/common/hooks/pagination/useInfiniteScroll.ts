import { MutableRefObject, RefObject, TouchEvent, useEffect, useRef } from "react";
import throttle from "lodash.throttle";
import { PaginatedResponse, Props as PaginationProps } from "./usePagination";

const thresholdBeforeLoadingNextPage = 250; // px

interface Props<T> {
  isRefreshing: boolean;
  setIsRefreshing: (value: boolean) => void;
  hasNextRef: MutableRefObject<boolean>;
  scrollRef: RefObject<HTMLDivElement>;
  sentinelRef: RefObject<HTMLDivElement>;
  fetchData: () => void;
  currentPageRef: MutableRefObject<number>;
  result: PaginationProps<T>["result"];
}

export default function useInfiniteScroll<T extends PaginatedResponse<unknown>>(props: Props<T>) {
  const {
    isRefreshing,
    setIsRefreshing,
    hasNextRef,
    fetchData,
    currentPageRef,
    scrollRef,
    sentinelRef,
    result,
  } = props;
  const startYRef = useRef<number | null>(null);
  const locked = useRef(false);
  const sentinelDistanceFromWindowBottom = useRef(0);

  const isInView = () => {
    if (!sentinelRef.current) {
      return false;
    }
    const { top } = sentinelRef.current.getBoundingClientRect();
    const distanceFromWindowBottom = top - (window.innerHeight || 0);
    sentinelDistanceFromWindowBottom.current = distanceFromWindowBottom;

    return distanceFromWindowBottom < thresholdBeforeLoadingNextPage;
  };

  useEffect(() => {
    if (result.isUninitialized) {
      currentPageRef.current = 1;
    }
  }, [result.isUninitialized]);

  useEffect(() => {
    if (result.data?.stale) {
      currentPageRef.current = 1;
      fetchData();
    }
  }, [result.data?.stale]);

  useEffect(() => {
    const scrollListener = throttle(async () => {
      if (result.error) {
        return;
      }

      if (locked.current) {
        return;
      }

      if (result.isFetching) {
        return;
      }

      if (!hasNextRef.current) {
        return;
      }

      if (!isInView()) {
        return;
      }

      locked.current = true;
      await fetchData();

      // Let the stack clear before unlocking.
      setTimeout(() => {
        locked.current = false;
      }, 0);
    }, 100);

    scrollListener();
    scrollRef.current?.addEventListener("scroll", scrollListener);

    return () => {
      scrollRef.current?.removeEventListener("scroll", scrollListener);
    };
  }, []);

  const handleTouchStart = (event: TouchEvent) => {
    if (locked.current) {
      return;
    }

    if (isRefreshing) {
      return;
    }

    // Only start tracking if the scrollbar is at the top of the screen
    if (event.currentTarget.scrollTop != 0) {
      return;
    }

    startYRef.current = event.touches[0].clientY;
  };

  const handleTouchMove = (event: TouchEvent) => {
    if (startYRef.current == null) {
      return;
    }

    if (locked.current) {
      return;
    }

    if (isRefreshing) {
      return;
    }

    const currentY = event.touches[0].clientY;

    // Detect downward pull
    if (currentY - startYRef.current > 100) {
      currentPageRef.current = 1;
      setIsRefreshing(true);
      locked.current = true;
      fetchData();

      setTimeout(() => {
        locked.current = false;
      }, 1000);
    }
  };

  const handleTouchEnd = () => {
    startYRef.current = null;
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.addEventListener("touchstart", (e) =>
        handleTouchStart(e as unknown as TouchEvent)
      );
      scrollRef.current.addEventListener("touchmove", (e) =>
        handleTouchMove(e as unknown as TouchEvent)
      );
      scrollRef.current.addEventListener("touchend", handleTouchEnd);
    }
    return () => {
      if (scrollRef.current) {
        scrollRef.current.removeEventListener("touchstart", (e) =>
          handleTouchStart(e as unknown as TouchEvent)
        );
        scrollRef.current.removeEventListener("touchmove", (e) =>
          handleTouchMove(e as unknown as TouchEvent)
        );
        scrollRef.current.removeEventListener("touchend", handleTouchEnd);
      }
    };
  }, []);
}
