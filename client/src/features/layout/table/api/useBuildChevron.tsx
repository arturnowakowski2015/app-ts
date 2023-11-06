import { useState, useEffect, useRef } from "react";

import { Chevron, Column } from "../../../../model/Interface";

const useBuildChevron = (columns: Column[]) => {
  let ch: string[] = [];
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
  useEffect(() => {
    createChevron(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [columns]);
  const buildchevron = (fc: Column[]) => {
    fc &&
      fc.map((t, i) => {
        chevron.class[i] = "gray";
        return t;
      });
    setChevron({
      atall: true,
      down: !chevron.down,
      title: "",
      class: [...chevron.class],
    });
  };
  return [buildchevron, chevron, setChevron] as const;
};
export { useBuildChevron };
