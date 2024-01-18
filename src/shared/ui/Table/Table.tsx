import { TDataAccount } from "@/entities/Account";
import {
  HeaderGroup,
  RowModel,
  Table,
  flexRender,
} from "@tanstack/react-table";
import UISelect from "../CustomSelect/UISelect";
import { useNavigate } from "react-router-dom";
import { Option } from "@/shared/types/types";
import { TDataCampaigns } from "@/entities/Campaigns/model/types/campaigns";
import { TDataProfile } from "@/entities/Profile/model/types/profile";

type Props<T> = {
  headers: HeaderGroup<T>[];
  rows: RowModel<T>;
  table: Table<T>;
  onHandleFilter: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onHandleSort: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  to?: string;
  options: Option[];
};

const UITable = <T extends TDataAccount | TDataCampaigns | TDataProfile>({
  to,
  headers,
  rows,
  options,
  table,
  onHandleFilter,
  onHandleSort,
}: Props<T>) => {
  const navigate = useNavigate();
  const onHandleClick = (item: T) => {
    to && navigate(to + item.id);
  };
  return (
    <div className="min-w-full flex flex-col gap-4 min-h-[544px]">
      <div className="flex justify-between">
        <input
          type="text"
          className="py-2 px-5"
          placeholder="Фільтрування"
          onChange={onHandleFilter}
        />
        <UISelect onHandleSort={onHandleSort} options={options} />
      </div>
      <table className="min-w-full ">
        <thead>
          {headers.map((headerGroup) => (
            <tr className="bg-[#6c7ae0]" key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="p-5">
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {rows.rows.map((row) => (
            <tr
              onClick={() => onHandleClick(row.original)}
              key={row.id}
              className="hover:cursor-pointer hover:opacity-90 h-[48px] [&>*:nth-child(2)]:w-[521px]"
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className={`text-center bg-white text-black`}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex items-center gap-2 self-end">
        <button
          className="border rounded p-2 bg-transparent w-[30px] h-[30px] flex items-center"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {"<"}
        </button>
        <button
          className="border rounded p-2 bg-transparent w-[30px] h-[30px] flex items-center"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {">"}
        </button>
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </strong>
        </span>
      </div>
    </div>
  );
};

export default UITable;
