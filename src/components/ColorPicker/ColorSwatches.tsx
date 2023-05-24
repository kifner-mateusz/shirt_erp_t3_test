import { useId } from "react";
import ScrollArea from "../basic/ScrollArea";

interface ColorSwatchesProps {
  colors: { [key: string]: { [key: string]: string } };
  onClick?: (hex: string) => void;
}

function ColorSwatches(props: ColorSwatchesProps) {
  const { colors, onClick } = props;
  const uuid = useId();

  return (
    <ScrollArea className="max-h-screen">
      <div className="flex flex-col gap-4 px-1">
        {Object.keys(colors).map((key, index) => (
          <div key={`${key}_${index}_${uuid}`} className="flex flex-col gap-2">
            <span className="pl-2">{key}</span>
            <div className="flex flex-wrap gap-2">
              {Object.keys(colors[key]!).map((colorName, colorIndex) => (
                // <Tooltip
                //   delayDuration={150}
                //   tooltip={colorName}
                //   key={`${key}_${index}_${colorIndex}_${uuid}`}
                // >
                <div
                  key={`${key}_${index}_${colorIndex}_${uuid}`}
                  className="h-[1.9rem] w-[1.9rem] rounded"
                  style={{ background: colors[key]![colorName] }}
                  onClick={() => onClick?.(colors[key]![colorName]!)}
                  title={colorName}
                ></div>
                // {/* </Tooltip> */}
              ))}
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}

export default ColorSwatches;