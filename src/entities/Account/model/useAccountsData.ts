// import { useEffect, useState } from "react";
// import { TDataAccount } from "./types/accout";
// import { PaginationState } from "@tanstack/react-table";
// import axios from "axios";
// import { useDecounce } from "@/shared/hooks/useDebounce";

// export const useAccountsData = () => {
//   const [data, setData] = useState<TDataAccount[]>([]);
//   const [filtered, setFiltered] = useState<string>("");
//   const [sorted, setSorted] = useState<string>();
//   const [totalPages, setTotalPages] = useState<number>();
//   const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
//     pageIndex: 0,
//     pageSize: 10,
//   });
//   const debounceValue = useDecounce(
//     filtered.length > 0 ? `*${filtered}*` : null,
//     500
//   );
//   useEffect(() => {
//     const params = {
//       email: debounceValue,
//       sortBy: sorted,
//       page: pageIndex + 1,
//       limit: pageSize,
//     };
//     axios
//       .get("https://2a3130367b19b96f.mokky.dev/accounts", { params })
//       .then((responce) => {
//         setData(responce.data.items);
//         setTotalPages(responce.data.meta.total_pages);
//       });
//   }, [sorted, debounceValue, pageIndex]);

//   const onHandleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFiltered(e.target.value);
//   };
//   const onHandleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     setSorted(e.target.value);
//   };
//   return {
//     data,
//     totalPages,
//     pageIndex,
//     pageSize,
//     setPagination,
//     onHandleFilter,
//     onHandleSort,
//   };
// };
