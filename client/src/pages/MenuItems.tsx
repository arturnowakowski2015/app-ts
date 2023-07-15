import { IMenuItems } from "../components/Interface";
import { DataTable, Lenghts } from "../components/Interface";
import TreeNode from "../components/TreeNode";
import { useMenuItems } from "../hooks/useMenuItems";
import { useGlobalContext } from "../ctx/MyGlobalContext";
import { useEffect, useRef } from "react";

import "../scss/MenuItems.scss";
interface IProps {
  datalengths: Lenghts;
  treedata: IMenuItems[];
  length: number;
  selected: string;
  overItem: string;
  onmouseover: (str: string) => void;
  onmouseout: (str: string) => void;
  onClick: (title: string) => void;
  datalegth: number;
}
const MenuItems = ({
  datalegth,
  treedata,
  length,
  selected,
  overItem,
  onClick,
  onmouseover,
  onmouseout,
  datalengths,
}: IProps) => {
  const [itemsonlevel, flag, setFlag, recquantity, set] = useMenuItems(
    0,
    treedata
  );
  const { sets, i } = useGlobalContext();
  const ret = (str: string) => {
    for (const [key, value] of Object.entries(datalengths)) {
      if (key === str) return value;
    }
  };
  const ref = useRef<Function>();
  const sFlag = () => {
    console.log(recquantity);
  };
  ref.current = sFlag;
  useEffect(() => {
    if (ref.current) ref.current();
  }, []);
  return (
    <>
      {itemsonlevel.map((t, ii) => {
        return (
          <div
            className="node"
            style={{ marginLeft: t.level * 10 + "px" }}
            key={t.id}
          >
            <div style={{ display: "flex", flexDirection: "row" }}>
              {flag[ii] === false && t.nextlevel === 1 && (
                <div
                  className="plus"
                  onClick={() => {
                    set(i, true);
                  }}
                >
                  {" "}
                  +
                </div>
              )}
              {flag[ii] && (
                <div
                  className="minus"
                  onClick={() => {
                    set(i, false);
                  }}
                >
                  -
                </div>
              )}
              <div
                className={
                  t.name === selected
                    ? "selected-" + sets[i]
                    : t.name === overItem
                    ? "over-" + sets[i]
                    : "item-" + sets[i]
                }
                onClick={() => onClick(t.name)}
                onMouseOver={() => onmouseover(t.name)}
                onMouseOut={() => onmouseout(t.name)}
              >
                {t.name}
                <span>{t.name === "new" && length}</span>
              </div>
            </div>
            {flag[i] && (
              <TreeNode
                overItem={overItem}
                onmouseout={(str) => onmouseout(str)}
                onmouseover={(str) => onmouseover(str)}
                treedata={treedata}
                selected={selected}
                pid={t.id}
                onClick={onClick}
                datalengths={datalengths}
                length={length}
              />
            )}
          </div>
        );
      })}
    </>
  );
};
export default MenuItems;
