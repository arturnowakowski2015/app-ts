import { DataLengths, IMenuItems, Set } from "../../../model/Interface";
import { TreeNode } from "../../ui/tree-node";
import { useMenuItems } from "./api/useMenuItems";
import {
  useGlobalContext,
  AppStateContext,
} from "../../../ctx/useThemeContext";
import { useContext } from "react";
import "../../../styles/MenuItems.scss";
interface IProps {
  setoflen: DataLengths;
  treedata: IMenuItems[];
  set: Set;
  selected: string;
  overItem: string;
  onmouseover: (str: string) => void;
  onClick: (title: string) => void;
}
export const MenuItems = ({
  setoflen,
  treedata,
  set: set1,
  selected,
  overItem,
  onClick,
  onmouseover,
}: IProps) => {
  const { itemsonlevel, flag, set } = useMenuItems(0, treedata);
  const { sets, i } = useGlobalContext();
  const { state } = useContext(AppStateContext);

  const findLen = (str: string): number | undefined => {
    console.log("=find len=", str, setoflen);
    for (let y in setoflen) {
      if (y === str) return setoflen[y];
    }

    return undefined;
  };

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
              {flag[t.level / 10 + 1] !== t.name && t.nextlevel === 1 && (
                <div
                  className="plus"
                  onClick={(e) => {
                    e.preventDefault();
                    set(t.level / 10 + 1, t.name);
                  }}
                >
                  {}+
                </div>
              )}

              {flag[t.level / 10 + 1] === t.name && (
                <div
                  className="minus"
                  style={{ paddingRight: "10px" }}
                  onClick={(e) => {
                    e.preventDefault();
                    set(t.level / 10 + 1, t.name);
                  }}
                >
                  -
                </div>
              )}
              <div
                className={
                  t.name === selected
                    ? "selected-" + state.theme[state.i]
                    : t.name === overItem
                    ? "over-" + state.theme[state.i]
                    : "item-" + state.theme[state.i]
                }
                onClick={() => onClick(t.name)}
                onMouseOver={() => onmouseover(t.name)}
                onMouseOut={() => onmouseover("")}
              >
                {t.name}
                <span>{findLen(t.name)}</span>
              </div>
            </div>
            {flag[t.level / 10 + 1].indexOf(t.name) !== -1 && (
              <TreeNode
                setoflen={setoflen}
                overItem={overItem}
                onmouseover={(str) => onmouseover(str)}
                treedata={treedata}
                selected={selected}
                pid={t.id}
                onClick={onClick}
                set={set1}
              />
            )}
          </div>
        );
      })}
    </>
  );
};
