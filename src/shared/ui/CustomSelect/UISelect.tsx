import { Option } from "@/shared/types/types";

type Props = {
  options: Option[];
  onHandleSort: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const UISelect = ({ options, onHandleSort }: Props) => {
  return (
    <select
      className="outline-none p-2"
      onChange={onHandleSort}
      defaultValue={"default"}
    >
      <option value={"default"} disabled>
        Сортування
      </option>
      {options.map((item) => (
        <option value={item.value} key={item.value}>
          {item.title}
        </option>
      ))}
    </select>
  );
};

export default UISelect;
