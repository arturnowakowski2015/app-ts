import { IMenuItems } from "../../../model/Interface";
import { useState, useEffect } from "react";

const useMenuItems = (pid: number, treedata: IMenuItems[]) => {
  const [flag, setFlag] = useState<boolean[]>([]);
  const [itemsonlevel, setItemsonlevel] = useState<IMenuItems[]>([]);

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
    filterParentItem(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [treedata]);

  useEffect(() => {
    treedata.map((t) => {
      flag.push(false);
      return t;
    });
    setFlag(flag); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemsonlevel]);

  return [itemsonlevel, flag, set] as const;
};
export { useMenuItems };
