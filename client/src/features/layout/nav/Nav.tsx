import { useNavigate } from "react-router-dom";

import { useGlobalContext } from "../../../ctx/MyGlobalContext";
import "../../../styles/Nav.scss";
export interface IProps {
  one: (str: string) => void;
}
export const Nav = ({ one }: IProps) => {
  const navigate = useNavigate();
  const set: string[] = ["Almond", "Cyan", "Aqua"];
  const { setI } = useGlobalContext();
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
                <div className="colorid" onClick={() => setI(j)}>
                  {t}/{j}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
