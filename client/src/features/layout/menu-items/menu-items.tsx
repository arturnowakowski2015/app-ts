import { DataLengths, IMenuItems, Set } from "../../../model/Interface";
import { TreeNode } from "../../ui/tree-node";
import { useMenuItems } from "./api/useMenuItems";

import { useContext } from "react";
import { AppStateContext } from "../../../ctx/useThemeContext";
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
  const { itemsonlevel, flag, findLen } = useMenuItems(0, treedata);
  const { state } = useContext(AppStateContext);
  // check values
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
                <span>{findLen(setoflen, t.name)}</span>
              </div>
            </div>
            {flag[ii] === t.name && (
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
