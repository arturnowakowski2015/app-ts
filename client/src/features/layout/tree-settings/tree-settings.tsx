//import Label from "./Label";
//import PossibleLabel from "./PossibleLabel";
import { IMenuItems } from "../../../Interface";
import { PossibleLabel } from "../../ui/possible-label";
import { Label } from "../../ui/label";
interface IProps {
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
  handleDrop: (event: React.DragEvent<HTMLDivElement>) => void;
}
export const TreeSettings = ({
  oldLabel,
  actLabel,
  data,
  handleDragStart,
  enableDropping,
  handleDrop,
}: IProps) => {
  return (
    <>
      {" "}
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
            />
            {actLabel === t.name && (
              <PossibleLabel
                ifroot="ifrootn"
                level={t.level * 10 + 10}
                title={oldLabel && oldLabel.name}
              />
            )}
          </div>
        );
      })}
    </>
  );
};
export default TreeSettings; //
