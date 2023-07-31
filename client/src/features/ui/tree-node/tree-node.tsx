import { DataLengths, IMenuItems, Set } from "../../../model/Interface";
import { useContext } from "react";
import { useMenuItems } from "../../layout/menu-items/api/useMenuItems";
import { useEffect, useRef } from "react";
import { useState } from "react";
import "../../../styles/MenuItems.scss";
import {
  useGlobalContext,
  AppStateContext,
} from "../../../ctx/useThemeContext";
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
  const { itemsonlevel, flag, set, findLen } = useMenuItems(0, treedata);
  const { state } = useContext(AppStateContext);

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
                {(flag[(t.level / 10) * (10 + 20)] === "" ||
                  flag[(t.level / 10) * (10 + 20)] === undefined) &&
                  t.nextlevel === 1 && (
                    <div
                      className="plus"
                      onClick={(e) => {
                        set((t.level / 10) * (10 + 20), t.name);
                      }}
                    >
                      +
                    </div>
                  )}
                {flag && flag[(t.level / 10) * (10 + 20)] === t.name && (
                  <div
                    className="minus"
                    style={{ paddingRight: "10px" }}
                    onClick={() => {
                      set((t.level / 10) * (10 + 20), t.name);
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
                  <span>{JSON.stringify(findLen(setoflen, t.name))}</span>
                </div>
              </div>

              {flag[(t.level / 10) * (10 + 20)] &&
                flag[(t.level / 10) * (10 + 20)].indexOf(t.name) !== -1 && (
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
