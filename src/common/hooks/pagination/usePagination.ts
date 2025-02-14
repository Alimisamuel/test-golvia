import { useRef, useState } from "react";
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  QueryActionCreatorResult,
  QueryDefinition,
  TypedUseLazyQueryStateResult,
} from "@reduxjs/toolkit/dist/query/react";
import useInfiniteScroll from "./useInfiniteScroll";

export interface PageParams {
  page?: number;
  size?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    currentPage: number;
    perPage: number;
    totalItems: number;
    totalPages: number;
  };
  stale?: boolean;
}

export type MakePagePaginationPath<T> = (params: {
  page: number;
}) => QueryActionCreatorResult<
  QueryDefinition<
    unknown,
    BaseQueryFn<string | FetchArgs, object, FetchBaseQueryError, object, FetchBaseQueryMeta>,
    string,
    T,
    string
  >
>;

export interface Props<T> {
  trigger: MakePagePaginationPath<T>;
  result: TypedUseLazyQueryStateResult<T, object, BaseQueryFn>;
  size?: number;
}

export default function usePagination<T extends PaginatedResponse<unknown>>(props: Props<T>) {
  const { trigger, result } = props;
  const hasNextRef = useRef(true);
  const currentPageRef = useRef(1);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const fetchData = async () => {
    const currentPage = currentPageRef.current;

    try {
      const { data } = await trigger({ page: currentPageRef.current });

      if (data) {
        hasNextRef.current = currentPage != data.pagination.totalPages;
        currentPageRef.current += 1;
      }

      setTimeout(() => setIsRefreshing(false), 1000);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useInfiniteScroll({
    isRefreshing,
    setIsRefreshing,
    hasNextRef,
    fetchData,
    currentPageRef,
    scrollRef,
    sentinelRef,
    result,
  });

  return {
    result,
    isRefreshing,
    scrollRef,
    sentinelRef,
  };
}
