//import Label from "./Label";
//import PossibleLabel from "./PossibleLabel";
import { IMenuItems } from "../../../model/Interface";
import { PossibleLabel } from "../../ui/possible-label";
import { Label } from "../../ui/label";
interface IProps {
  display: boolean;
  oldLabel?: IMenuItems;
  actLabel?: string;
  data: IMenuItems[];
  handleDragStart: (
    event: React.DragEvent<HTMLDivElement>,
    name: string
  ) => void;
  enableDropping: (
    event: React.DragEvent<HTMLDivElement>,
    name: string
  ) => void;
  handleDrop: (event: React.DragEvent<HTMLDivElement>, name: string) => void;
  handleDragEnd: (
    event: React.DragEvent<HTMLDivElement>,
    title: string
  ) => void;
}
export const TreeSettings = ({
  display,
  oldLabel,
  actLabel,
  data,
  handleDragStart,
  enableDropping,
  handleDragEnd,
  handleDrop,
}: IProps) => {
  return (
    <>
      {data.map((t) => {
        return (
          <div key={t.id}>
            <Label
              pid={t.pid}
              level={t.level * 10}
              title={t.name}
              nextlevel={t.nextlevel}
              handleDragStart={handleDragStart}
              handleDrop={handleDrop}
              enableDropping={enableDropping}
              handleDragEnd={handleDragEnd}
            />
            {actLabel === t.name && (
              <PossibleLabel
                display={display}
                ifroot="ifrootn"
                level={t.level * 10 + 10}
                title={oldLabel && oldLabel.name}
              />
            )}{" "}
          </div>
        );
      })}{" "}
    </>
  );
};
export default TreeSettings; //
