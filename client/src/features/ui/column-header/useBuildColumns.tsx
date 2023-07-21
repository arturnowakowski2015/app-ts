import { useState } from "react";

import { Chevron } from "../../../Interface";
interface ColumnsHeader {
  title: string;
  disp: boolean;
}
export interface Column {
  col: ColumnsHeader;
}

const useBuildColumns = () => {
  const [filteredColumns, setFilteredColumns] = useState<Column[]>();
  const [chevron, setChevron] = useState<Chevron>({
    atall: true,
    down: true,
    title: "",
    class: [],
  });
  const filterColumns = (tocompare?: Column[], columns?: Column[]) => {
    let obj: Column[] | undefined =
      tocompare &&
      tocompare.filter((k: Column, ii: number) => {
        return columns && columns[ii].col.disp === true && k;
      });

    setFilteredColumns(obj);

    functionbuildcol();
  };
  const functionbuildcol = () => {
    filteredColumns &&
      filteredColumns.map((t, i) => {
        chevron.class[i] = "gray";
        return t;
      });
    setChevron({
      atall: true,
      down: true,
      title: "",
      class: [...chevron.class],
    });
    return filteredColumns;
  };

  return [filteredColumns, filterColumns] as const;
};
export { useBuildColumns };
