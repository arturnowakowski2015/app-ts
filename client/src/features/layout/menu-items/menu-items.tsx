import { IMenuItems } from "../../../model/Interface";
import { TreeNode } from "../../tree-node";
import { useMenuItems } from "./useMenuItems";
import { useGlobalContext } from "../../../ctx/MyGlobalContext";

import "../../../styles/MenuItems.scss";
interface IProps {
  treedata: IMenuItems[];
  length: number;
  selected: string;
  overItem: string;
  onmouseover: (str: string) => void;
  onClick: (title: string) => void;
}
export const MenuItems = ({
  treedata,
  length,
  selected,
  overItem,
  onClick,
  onmouseover,
}: IProps) => {
  const [itemsonlevel, flag, set] = useMenuItems(0, treedata);
  const { sets, i } = useGlobalContext();

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
                  {}
                  +a
                </div>
              )}
              {flag[ii] && (
                <div
                  className="minus"
                  onClick={(e) => {
                    e.preventDefault();
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
                onMouseOut={() => onmouseover("")}
              >
                {t.name}
                <span>{t.name === "new" && length}</span>
              </div>
            </div>
            {flag[i] && (
              <TreeNode
                overItem={overItem}
                onmouseover={(str) => onmouseover(str)}
                treedata={treedata}
                selected={selected}
                pid={t.id}
                onClick={onClick}
                length={length}
              />
            )}
          </div>
        );
      })}
    </>
  );
};
