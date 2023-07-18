import { DataTable, Lenghts, IMenuItems } from "./Interface";

import { useMenuItems } from "../hooks/useMenuItems";
import { useGlobalContext } from "../ctx/MyGlobalContext";
import { useEffect, useRef } from "react";

import "../scss/MenuItems.scss";
interface IProps {
  treedata: IMenuItems[];
  length: number;
  pid: number;
  overItem: string;
  selected: string;
  onmouseout: (str: string) => void;
  onmouseover: (str: string) => void;
  onClick: (title: string) => void;
}

const TreeNode = ({
  treedata,
  length,
  pid,
  selected,
  overItem,
  onmouseout,
  onmouseover,
  onClick,
}: IProps) => {
  const [itemsonlevel, flag, set] = useMenuItems(pid, treedata);
  const { sets, i } = useGlobalContext();
  console.log(itemsonlevel);
  const fl = useRef<Function>();

  const sFlag = () => {};
  fl.current = sFlag;
  useEffect(() => {
    if (fl.current) fl.current();
  }, []);
  return (
    <>
      {treedata.map((t, ii) => {
        return (
          t.pid === pid &&
          t.pid > 0 && (
            <div>
              <div
                className="node"
                style={{
                  marginLeft: t.level * 10 + "px",
                  display: "flex",
                  flexDirection: "row",
                }}
                key={t.id}
              >
                {flag[ii] === false && t.nextlevel === 1 && (
                  <div
                    className="plus"
                    onClick={() => {
                      set(t.pid, true);
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
                      set(t.pid, false);
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

                  <span>{length}</span>
                </div>
              </div>

              {flag[ii] && (
                <TreeNode
                  overItem={overItem}
                  onmouseover={onmouseover}
                  onmouseout={onmouseout}
                  selected={selected}
                  treedata={treedata}
                  pid={t.id}
                  onClick={onClick}
                  length={length}
                />
              )}
            </div>
          )
        );
      })}
    </>
  );
};
export default TreeNode;
