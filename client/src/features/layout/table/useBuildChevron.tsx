import { useState, useEffect, useRef } from "react";

import { Chevron } from "../../../Interface";
interface ColumnsHeader {
  title: string;
  disp: boolean;
}
export interface Column {
  col: ColumnsHeader;
}

const useBuildChevron = (columns: Column[]) => {
  let ch: string[] = [];
  const chevron1 = useRef<Function>();
  const [chevron, setChevron] = useState<Chevron>({
    atall: true,
    down: true,
    title: "",
    class: [],
  });
  const createChevron = () => {
    for (let i = 0; i < columns.length; i++) ch.unshift("gray");
    setChevron({
      atall: true,
      down: true,
      title: "",
      class: [...ch],
    });
  };
  chevron1.current = createChevron;
  useEffect(() => {
    if (chevron1.current) chevron1.current();
  }, [columns]);
  const buildchevron = (fc: Column[]) => {
    fc &&
      fc.map((t, i) => {
        chevron.class[i] = "gray";
        return t;
      });
    setChevron({
      atall: true,
      down: true,
      title: "",
      class: [...chevron.class],
    });
  };
  return [buildchevron, chevron, setChevron] as const;
};
export { useBuildChevron };
