import { Box } from "@mui/material";
import { BaseQueryFn, TypedUseLazyQueryStateResult } from "@reduxjs/toolkit/dist/query/react";
import { forwardRef, ReactNode, Ref } from "react";
import { PageParams, PaginatedResponse } from "./hooks/pagination/usePagination";

const sentinelStyle = { height: 1 };

interface Props<T> {
  children: ReactNode;
  result: TypedUseLazyQueryStateResult<T, PageParams, BaseQueryFn>;
}

const FetchLoader = () => {
  return (
    <div className="flex justify-center items-center space-x-2 mb-4">
      <div className="w-3 h-3 bg-gv-greyMinus2_DCE1EC rounded-full animate-bounce"></div>
      <div className="w-3 h-3 bg-gv-greyMinus2_DCE1EC rounded-full animate-bounce delay-150"></div>
      <div className="w-3 h-3 bg-gv-greyMinus2_DCE1EC rounded-full animate-bounce delay-300"></div>
    </div>
  );
};

function InfiniteScroll<T extends PaginatedResponse<unknown>>(
  props: Props<T>,
  ref: Ref<HTMLDivElement>
) {
  const { children, result } = props;
  return (
    <div>
      {children}

      <Box ref={ref} style={sentinelStyle} mb={!!result.data && result.isFetching ? 2 : 0} />

      {!!result.currentData && result.isFetching && <FetchLoader />}
    </div>
  );
}

export default forwardRef(InfiniteScroll) as <T extends PaginatedResponse<unknown>>(
  props: Props<T> & { ref: Ref<HTMLDivElement> }
) => ReturnType<typeof InfiniteScroll>;
