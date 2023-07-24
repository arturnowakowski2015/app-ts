import { IMenuItems } from "../../model/Interface";

import { useMenuItems } from "../layout/menu-items/useMenuItems";
import { useGlobalContext } from "../../ctx/MyGlobalContext";
import { useEffect, useRef } from "react";

import "../../styles/MenuItems.scss";
interface IProps {
  treedata: IMenuItems[];
  length: number;
  pid: number;
  overItem: string;
  selected: string;
  onmouseover: (str: string) => void;
  onClick: (title: string) => void;
}

export const TreeNode = ({
  treedata,
  length,
  pid,
  selected,
  overItem,
  onmouseover,
  onClick,
}: IProps) => {
  const [itemsonlevel, flag, set] = useMenuItems(pid, treedata);
  const { sets, i } = useGlobalContext();

  const fl = useRef<Function>();

  const sFlag = () => {
    console.log(itemsonlevel);
  };
  fl.current = sFlag;
  useEffect(() => {
    if (fl.current) fl.current();
  }, []); // eslint-disable-next-line react-hooks/exhaustive-deps
  console.log(pid);
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
                    onClick={(e) => {
                      set(t.pid, true);
                    }}
                  >
                    {pid}+
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
                  onMouseOut={() => onmouseover("")}
                >
                  {t.name}

                  <span>{length}</span>
                </div>
              </div>

              {flag[ii] && (
                <TreeNode
                  overItem={overItem}
                  onmouseover={onmouseover}
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
