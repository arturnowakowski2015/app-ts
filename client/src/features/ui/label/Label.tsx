import "./Label.css";
import { useGlobalContext } from "../../../ctx/MyGlobalContext";

interface ILabel {
  title: string;
  level: number;
  pid: number;
  nextlevel: number;
  handleDragStart: (
    event: React.DragEvent<HTMLDivElement>,
    name: string
  ) => void;
  enableDropping: (
    event: React.DragEvent<HTMLDivElement>,
    name: string
  ) => void;
  handleDrop: (event: React.DragEvent<HTMLDivElement>, title: string) => void;
  handleDragEnd: (
    event: React.DragEvent<HTMLDivElement>,
    title: string
  ) => void;
}

export const Label = ({
  pid,
  title,
  level,
  nextlevel,
  handleDragStart,
  handleDrop,
  enableDropping,
  handleDragEnd,
}: ILabel) => {
  const { sets, i } = useGlobalContext();
  return (
    <div
      style={{ marginLeft: level + "px" }}
      className={"node" + (title.indexOf(".X") !== -1 ? " labelold" : "")}
    >
      <div
        id="d1"
        draggable="true"
        onDragStart={(event) =>
          title.indexOf(".X") === -1 && handleDragStart(event, title)
        }
        onDrop={(event) => {
          handleDrop(event, title);
        }}
        onDragOver={(event) => enableDropping(event, title)}
        onDragEnd={(e) => handleDragEnd(e, title)}
        className={
          "item-" +
          sets[i] +
          " p" +
          (isNaN(pid) ? 0 : pid) +
          "/" +
          " l" +
          nextlevel +
          "?"
        }
      >
        {title}
      </div>
    </div>
  );
};
