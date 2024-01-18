import { useMemo } from "react";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { TDataAccount } from "../..";
import UITable from "@/shared/ui/Table/Table";
import { useTable } from "@/features";
import { routePaths } from "@/shared/routes/routes";
import TableLoader from "@/shared/ui/TableLoader/TableLoader";

export const AccoutsTable = () => {
  const {
    data,
    totalPages,
    pageIndex,
    pageSize,
    setPagination,
    onHandleFilter,
    onHandleSort,
    isLoading,
  } = useTable<TDataAccount>({
    filter: "email",
    url: "https://2a3130367b19b96f.mokky.dev/accounts",
  });

  const columnHelper = createColumnHelper<TDataAccount>();
  const columns = [
    columnHelper.accessor("id", {
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.email, {
      id: "email",
      cell: (info) => <i>{info.getValue()}</i>,
      header: () => <span>Email</span>,
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("authToken", {
      header: () => "authToken",
      cell: (info) => info.renderValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("creationDate", {
      header: () => <span>creationDate</span>,
      footer: (info) => info.column.id,
    }),
  ];
  const pagination = useMemo(
    () => ({
      pageIndex: pageIndex,
      pageSize: pageSize,
    }),
    [pageIndex, pageSize]
  );
  const table = useReactTable({
    data,
    columns,
    pageCount: totalPages,
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    debugTable: true,
  });
  if (isLoading) {
    return <TableLoader />;
  }
  return (
    <>
      <UITable
        options={[
          { value: "-creationDate", title: "Дата створення(за спаданням)" },
          { value: "creationDate", title: "Дата створення(за зростанням)" },
        ]}
        table={table}
        to={routePaths.profiles}
        headers={table.getHeaderGroups()}
        rows={table.getRowModel()}
        onHandleFilter={onHandleFilter}
        onHandleSort={onHandleSort}
      />
    </>
  );
};
