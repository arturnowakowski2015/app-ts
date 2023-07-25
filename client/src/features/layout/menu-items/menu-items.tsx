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
      {JSON.stringify(itemsonlevel)}
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
                    set(i, t.name);
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
                    set(i, t.name);
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
                <span></span>
              </div>
            </div>
            {flag[i] === t.name && (
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
