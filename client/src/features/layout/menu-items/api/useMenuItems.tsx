import { IMenuItems, Lenghts, DataLengths } from "../../../../model/Interface";
import { useState, useEffect, useContext } from "react";

const useMenuItems = (pid: number, treedata: IMenuItems[]) => {
  const [flag, setFlag] = useState<string[]>([]);
  const [itemsonlevel, setItemsonlevel] = useState<IMenuItems[]>([]);
  let flags: boolean[];
  const recquantity = (str: string, datalengths: Lenghts) => {
    for (const [key, value] of Object.entries(datalengths)) {
      if (key === str) return value;
    }
  };
  const filterParentItem = () => {
    setItemsonlevel(
      treedata.filter((t) => {
        return t.pid === pid && t;
      })
    );
  };

  const findLen = (setoflen: DataLengths, str: string): number | undefined => {
    for (let y in setoflen) {
      if (y === str) return setoflen[y];
    }

    return undefined;
  };

  const set = (i: number, name: string) => {
    if (flag[i] === name) flag[i] = "";
    else flag[i] = name;
    for (
      let ii =
        flag.findIndex((t) => {
          return t === name;
        }) + 1;
      ii < flag.length;
      ii++
    )
      flag[ii] = "";

    setFlag([...flag]);
  };
  useEffect(() => {
    filterParentItem();
  }, [treedata]); // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    treedata.map((t) => {
      flag.push("");
    });
    setFlag(flag);
  }, [itemsonlevel]); // eslint-disable-next-line react-hooks/exhaustive-deps
  return { itemsonlevel, flag, set, findLen } as const;
};
export { useMenuItems };
