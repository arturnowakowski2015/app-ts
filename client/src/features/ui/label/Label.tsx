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
  handleDrop: (event: React.DragEvent<HTMLDivElement>) => void;
}

export const Label = ({
  pid,
  title,
  level,
  nextlevel,
  handleDragStart,
  handleDrop,
  enableDropping,
}: ILabel) => {
  const { sets, i } = useGlobalContext();
  return (
    <div
      style={{ marginLeft: level + "px" }}
      className={"node" + (title.indexOf(".X") !== -1 ? " labelold" : "")}
      id="d1"
      draggable="true"
      onDragStart={(event) =>
        title.indexOf(".X") === -1 && handleDragStart(event, title)
      }
      onDrop={(event) => {
        handleDrop(event);
      }}
      onDragOver={(event) => enableDropping(event, title)}
    >
      <div
        className={
          "item-" +
          sets[i] +
          " p" +
          (isNaN(pid) ? -1 : pid) +
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
