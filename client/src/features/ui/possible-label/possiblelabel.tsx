import "./PossibleLabel.css";
interface IPossibleLabel {
  title: string | undefined;
  level: number;
  ifroot: "ifrooty" | "ifrootn";
  display: boolean;
}

export const PossibleLabel = ({
  title,
  level,
  ifroot,
  display,
}: IPossibleLabel) => {
  return (
    <>
      {display && (
        <div
          id={ifroot}
          draggable="true"
          className={"node  label"}
          style={{ marginLeft: level + "px" }}
        >
          {title}
        </div>
      )}
    </>
  );
};
