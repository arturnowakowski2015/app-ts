import { useState, useEffect } from "react";
import { IMenuItems, Set } from "../../model/Interface";
import { useTempTable } from "../../features/layout/table/api/useTempTable";
import { useGetPaginatedData } from "../../features/layout/table/api/useGetPaginatedData";
import { useGetSortedData } from "../../features/layout/table/api/useGetSortedData";
import { useDeleteRow } from "../../features/layout/table/api/useDeleteRow";

const useHome = (
  set: Set,
  pageSize: number,
  treedata: IMenuItems[],
  actcategory: string
) => {
  const [currentPage, setCurrentPage] = useState(1);

  const [result, setResult] = useState<any[] | undefined>([] as any[]);
  const [len, setLen] = useState<number | undefined>(0);
  const [direction, setDirection] = useState<boolean>(true);
  const [ref, setRef] = useState<boolean>(false);
  const [ref2, setRef2] = useState<boolean>(false);

  const { mutator, len1: mutatedLen } = useDeleteRow(set, currentPage);

  useEffect(() => {
    if (mutator.context?.nextPage.data.length < 1) {
      setCurrentPage(currentPage + 1);
    }
    // alert(currentPage + ":::" + mutator.context?.nextPage.data.length);
  }, [mutator.context?.nextPage]);
  const {
    isLoading,
    isFetching,
    isSuccess,
    data: paginated_data,
  } = useGetPaginatedData(
    pageSize,
    direction,
    len as number,
    currentPage,
    set,
    actcategory
  );

  const {
    columns,
    chevron,
    selectedColumn,
    sort,
    onSort,
    showChevron,
    showSelectedColumn,
  } = useTempTable(
    set.actcategory,
    paginated_data && paginated_data["data"] && paginated_data["data"]["data"],
    treedata
  );

  const { sorted_data, r } = useGetSortedData(
    pageSize,
    sort,
    set,
    currentPage,
    actcategory,
    columns,
    selectedColumn,
    chevron
  );
  const [r1, setR1] = useState<boolean>(false);
  const [fetching, setFetching] = useState<boolean>(false);
  useEffect(() => {
    r();
    //setFetching(true);
  }, [r1]);
  useEffect(() => {
    setResult(
      paginated_data &&
        paginated_data["data"] &&
        (paginated_data["data"]["data"] as unknown as any[])
    );
    setTimeout(() => {
      setLen((len) => 1);
    }, 1000);
  }, [paginated_data]);
  useEffect(() => {
    setLen(
      sorted_data &&
        sorted_data["data"] &&
        sorted_data["data"]["obj"] &&
        (sorted_data["data"]["obj"][actcategory] as unknown as number)
    );

    setResult(
      sorted_data &&
        sorted_data["data"] &&
        (sorted_data["data"]["data"] as unknown as any[])
    );
  }, [sorted_data]); // eslint-disable-next-line react-hooks/exhaustive-deps

  useEffect(() => {
    setResult(mutator.context?.currentPage1.data);

    setR1(true);
    setRef(false);
  }, [ref]); // eslint-disable-next-line react-hooks/exhaustive-deps

  const deleteRow = (id: number) => {
    mutator.mutate(id);
    console.log(id);

    setRef(true);
  };
  return {
    mutatedLen,
    result,
    currentPage,
    paginated_data,
    len,
    mutator,
    isLoading,
    fetching,
    onSort,
    showChevron,
    columns,
    showSelectedColumn,
    setDirection,
    setCurrentPage,
    deleteRow,
    setLen,
  };
};
export default useHome;
