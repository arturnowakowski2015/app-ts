import { useSearch } from "./useSearch";
import "../../../styles/searchbox.scss";
interface IProps {
  onChange: (str: string) => void;
}

export const SearchBox = ({ onChange }: IProps) => {
  const [options, query, filteredOptions, setQuery, reset] = useSearch();

  return (
    <>
      <div className="searchbox">
        <label className="searchlabel">search name column</label>
        <input
          id="searchinput"
          type="text"
          value={query}
          onMouseOut={() => reset()}
          onChange={(e) => {
            setQuery(e.currentTarget.value);
            filteredOptions(e.currentTarget.value);
            onChange(e.currentTarget.value);
          }}
        />
        <div className="options">
          {options.map((t, j) => {
            return <div key={j}>{t}</div>;
          })}
        </div>
      </div>
    </>
  );
};
