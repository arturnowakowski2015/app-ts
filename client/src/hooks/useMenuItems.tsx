import { IMenuItems, Lenghts } from "../components/Interface";
import { useState, useEffect } from "react";
interface Flag {
  flag: boolean;
}
const useMenuItems = (pid: number, treedata: IMenuItems[]) => {
  const [flag, setFlag] = useState<boolean[]>([]);
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
  const set = (i: number, flags: boolean) => {
    for (let ii = 0; ii < flag.length; ii++) flag[ii] = false;
    flag[i] = flags;
    setFlag([...flag]);
  };
  useEffect(() => {
    filterParentItem();
  }, [treedata]);
  useEffect(() => {
    treedata.map((t) => {
      flag.push(false);
    });
    setFlag(flag);
  }, [itemsonlevel]);
  return [itemsonlevel, flag, setFlag, recquantity, set] as const;
};
export { useMenuItems };
