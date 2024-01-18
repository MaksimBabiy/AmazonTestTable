import { routePaths } from "@/shared/routes/routes";
import { TDataProfile } from "../model/types/profile";
import { useTable } from "@/features";
import UITable from "@/shared/ui/Table/Table";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import TableLoader from "@/shared/ui/TableLoader/TableLoader";

const ProfilesTable = () => {
  const params = useParams();
  const {
    data,
    totalPages,
    pageIndex,
    pageSize,
    setPagination,
    onHandleFilter,
    onHandleSort,
    isLoading,
  } = useTable<TDataProfile>({
    filter: "country",
    url: `https://2a3130367b19b96f.mokky.dev/profiles?accountId=${params.id}`,
  });

  const columnHelper = createColumnHelper<TDataProfile>();
  const columns = [
    columnHelper.accessor("id", {
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.country, {
      id: "country",
      cell: (info) => <i>{info.getValue()}</i>,
      header: () => <span>Country</span>,
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("marketplace", {
      header: () => "marketplace",
      cell: (info) => info.renderValue(),
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
          { value: "country", title: "Країна(за алфавітом)" },
          { value: "-country", title: "Країна(проти алфавіту)" },
        ]}
        table={table}
        to={routePaths.campaigns}
        headers={table.getHeaderGroups()}
        rows={table.getRowModel()}
        onHandleFilter={onHandleFilter}
        onHandleSort={onHandleSort}
      />
    </>
  );
};

export default ProfilesTable;
