import "./PossibleLabel.css";
interface IPossibleLabel {
  title: string | undefined;
  level: number;
  ifroot: "ifrooty" | "ifrootn";
}

export const PossibleLabel = ({ title, level, ifroot }: IPossibleLabel) => {
  return (
    <div
      id={ifroot}
      draggable="true"
      className={"node  label"}
      style={{ marginLeft: level + "px" }}
    >
      {title}
    </div>
  );
};
