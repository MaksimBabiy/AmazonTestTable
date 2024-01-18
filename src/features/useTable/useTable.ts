import { useEffect, useState } from "react";

import { PaginationState } from "@tanstack/react-table";
import axios from "axios";
import { useDecounce } from "@/shared/hooks/useDebounce";

export const useTable = <T>({
  filter,
  url,
}: {
  filter: string;
  url: string;
}) => {
  const [data, setData] = useState<T[]>([]);
  const [filtered, setFiltered] = useState<string>("");
  const [sorted, setSorted] = useState<string>();
  const [totalPages, setTotalPages] = useState<number>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });
  const debounceValue = useDecounce(
    filtered.length > 0 ? `*${filtered}*` : null,
    500
  );
  useEffect(() => {
    const params = {
      [filter]: debounceValue,
      sortBy: sorted,
      page: pageIndex + 1,
      limit: pageSize,
    };
    axios
      .get(url, { params })
      .then((responce) => {
        setData(responce.data.items);
        setTotalPages(responce.data.meta.total_pages);
      })
      .finally(() => setIsLoading(false));
  }, [sorted, debounceValue, pageIndex]);

  const onHandleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiltered(e.target.value);
  };
  const onHandleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSorted(e.target.value);
  };
  return {
    data,
    totalPages,
    pageIndex,
    pageSize,
    setPagination,
    onHandleFilter,
    onHandleSort,
    isLoading,
  };
};
