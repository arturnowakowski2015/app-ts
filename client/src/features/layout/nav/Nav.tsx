import { useNavigate } from "react-router-dom";

import { useContext } from "react";
import { AppStateContext } from "../../../ctx/useThemeContext";
import "../../../styles/Nav.scss";
export interface IProps {
  one: (str: string) => void;
}
export const Nav = ({ one }: IProps) => {
  const navigate = useNavigate();
  const set: string[] = ["Pink", "Green", "Blue"];

  const { state, setState } = useContext(AppStateContext);
  // check values
  // console.log("Counter...state...", state);
  // console.log("Counter...setState...", setState);

  //think about shalow comparison
  //when working with complex objects
  //use redux reducer pattern returning new object

  return (
    <div className="nav">
      <div
        onClick={() => {
          navigate("/search");
          one("search");
        }}
      >
        search
      </div>
      <div
        onClick={() => {
          navigate("/settings/treesettings");
          one("settings");
        }}
      >
        settings
      </div>
      <div className="dropdown">
        <button className="dropbtn">Dropdown</button>
        <div className="dropdown-content">
          {set.map((t, j) => {
            return (
              <div className="container">
                <div className={"colorprobe-" + (j + 1)}></div>
                <div
                  className="colorid"
                  onClick={() => setState({ ...state, i: (state.i = j) })}
                >
                  {t}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
