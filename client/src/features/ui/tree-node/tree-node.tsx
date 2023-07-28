import { DataLengths, IMenuItems, Set } from "../../../model/Interface";

import { useMenuItems } from "../../layout/menu-items/api/useMenuItems";
import { useGlobalContext } from "../../../ctx/MyGlobalContext";
import { useEffect, useRef } from "react";
import { useState } from "react";
import "../../../styles/MenuItems.scss";
interface IProps {
  setoflen: DataLengths;
  treedata: IMenuItems[];
  set: Set;
  pid: number;
  overItem: string;
  selected: string;
  onmouseover: (str: string) => void;
  onClick: (title: string) => void;
}

export const TreeNode = ({
  setoflen,
  treedata,
  set: set1,
  pid,
  selected,
  overItem,
  onmouseover,
  onClick,
}: IProps) => {
  const [itemsonlevel, flag, set] = useMenuItems(pid, treedata);
  const { sets, i } = useGlobalContext();

  const fl1 = useRef<Function>();

  const sFlag = () => {
    console.log(itemsonlevel);
  };
  fl1.current = sFlag;
  useEffect(() => {
    if (fl1.current) fl1.current();
  }, []); // eslint-disable-next-line react-hooks/exhaustive-deps
  const [fl, setFl] = useState<boolean>(false);
  const findLen = (str: string): number | undefined => {
    for (let y in setoflen) {
      if (y === str) return setoflen[y];
    }

    return undefined;
  };

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
                  marginLeft:
                    flag[ii] === "" && t.nextlevel === 0
                      ? t.level * 10 + 20 + "px"
                      : t.level * 10 + "px",
                  display: "flex",
                  flexDirection: "row",
                }}
                key={t.id}
              >
                {flag[ii] === "" && t.nextlevel === 1 && (
                  <div
                    className="plus"
                    onClick={(e) => {
                      set(t.pid, t.name);
                      setFl(true);
                    }}
                  >
                    +
                  </div>
                )}
                {flag[ii] === t.name && (
                  <div
                    className="minus"
                    style={{ paddingRight: "10px" }}
                    onClick={() => {
                      set(t.pid, t.name);
                      setFl(false);
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

                  <span>{JSON.stringify(findLen(t.name))}</span>
                </div>
              </div>

              {flag[ii] && (
                <TreeNode
                  setoflen={setoflen}
                  overItem={overItem}
                  onmouseover={onmouseover}
                  selected={selected}
                  treedata={treedata}
                  pid={t.id}
                  onClick={onClick}
                  set={set1}
                />
              )}
            </div>
          )
        );
      })}
    </>
  );
};
