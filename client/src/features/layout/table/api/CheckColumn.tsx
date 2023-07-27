interface IProps {
  title: string;
  display: boolean;
  chooseColumn: (title: string) => void;
}
const CheckColumn = ({ title, chooseColumn, display }: IProps) => {
  return (
    <>
      <input
        type="checkbox"
        id="myCheck"
        checked={display}
        onChange={(str) => {
          chooseColumn(title);
        }}
      ></input>
      <label>{title}</label>
    </>
  );
};
export default CheckColumn;
