import { useTable } from "@/features";
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { TDataCampaigns } from "../model/types/campaigns";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import UITable from "@/shared/ui/Table/Table";
import TableLoader from "@/shared/ui/TableLoader/TableLoader";

const CampaignsTable = () => {
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
  } = useTable<TDataCampaigns>({
    filter: "cost",
    url: `https://2a3130367b19b96f.mokky.dev/campaigns?profileId=${params.id}`,
  });

  const columnHelper = createColumnHelper<TDataCampaigns>();
  const columns = [
    columnHelper.accessor("id", {
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.clicks, {
      id: "clicks",
      cell: (info) => <i>{info.getValue()}</i>,
      header: () => <span>Clicks</span>,
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("cost", {
      header: () => "cost",
      cell: (info) => info.renderValue(),
      footer: (info) => info.column.id,
    }),
    columnHelper.accessor("date", {
      header: () => "date",
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
          { value: "clicks", title: "Кількість кліків  (за зростанням)" },
          { value: "-clicks", title: "Кількість кліків (за спаданням)" },
        ]}
        table={table}
        headers={table.getHeaderGroups()}
        rows={table.getRowModel()}
        onHandleFilter={onHandleFilter}
        onHandleSort={onHandleSort}
      />
    </>
  );
};

export default CampaignsTable;
