import { SearchBox } from "../../features/ui/search-box";
import { Table } from "../../features/layout/table";
import { IMenuItems, Set } from "../../model/Interface";
import { useTempTable } from "../../features/layout/table/api/useTempTable";
import { useGetPaginatedData } from "../../features/layout/table/api/useGetPaginatedData";
import { useGetSortedData } from "../../features/layout/table/api/useGetSortedData";
import { useDeleteRow } from "../../features/layout/table/api/useDeleteRow";
interface IProps {
  treedata: IMenuItems[];
  actcategory: string;
  set: Set;
  pageSize: number;
  setDataLength: (length: any) => void;
  onChange: (str: string) => void;
}
export const SearchPage = ({
  treedata,
  actcategory,
  set,
  pageSize,
  setDataLength,
  onChange,
}: IProps) => {
  /*

  const paginated_data = useGetPaginatedData(currentPage, set, actcategory);
  const [
    columns,
    chevron,
    selectedColumn,
    enabled,
    showChevron,
    showSelectedColumn,
    showQuery,
  ] = useTempTable(set.actcategory, result, treedata);

  const sorted_data = useGetSortedData(
    enabled,
    set,
    currentPage,
    actcategory,
    columns,
    selectedColumn,
    chevron
  );
const mutator  = deleteRow(set, currentPage)
 

  useEffect(() => {
    setResult(paginated_data);
  }, [paginated_data]);
  useEffect(() => {
    setResult(sorted_data);
  }, [sorted_data]);
 

  return (
    <div className="searchbox">
      <SearchBox onChange={onChange} />
      <div className="table">
      <Table
          showChevron={(e: Boolean) => showChevron(e)}
          columns={columns}
          pageSize={pageSize}
          result={result}
          showSelectedColumn={showSelectedColumn}
          showQuery={showQuery}
        />
      </div>
    </div>
  );
};
*/
  return <div>kk</div>;
};
