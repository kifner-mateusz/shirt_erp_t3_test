import { useMove } from "@mantine/hooks";
import { useEffect, useState } from "react";
import tinycolor2 from "tinycolor2";

const TRACK_THICKNESS = 28;
const THUMB_SIZE = 20;

interface ColorSliderProps {
  value: number;
  isDisabled?: boolean;
  saturation?: number;
  brightness?: number;
  hue?: number;
  onChange: (value: number) => void;
}

function HueSlider(props: ColorSliderProps) {
  const { value, onChange, hue = 0, saturation = 0, brightness = 0 } = props;
  const [alpha, setAlpha] = useState(value);
  const { ref, active } = useMove(({ x }) => {
    setAlpha(x);
    onChange?.(x);
  });

  const sliderColor = tinycolor2.fromRatio({
    h: hue,
    s: saturation,
    v: brightness,
  });

  const thumbColor = tinycolor2.fromRatio({
    h: hue,
    s: saturation,
    v: brightness,
    a: alpha,
  });

  useEffect(() => {
    if (value !== alpha) {
      setAlpha(value);
    }
  }, [value]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: 360,
        minWidth: 360,
        touchAction: "none",
        forcedColorAdjust: "none",
        position: "relative",
        background: 'url("/assets/checkerboard.svg") 0px 0px/16px 16px repeat',
        borderRadius: 4,
        height: TRACK_THICKNESS,
      }}
      ref={ref}
    >
      <div
        style={{
          height: TRACK_THICKNESS,
          width: "100%",
          borderRadius: 4,
          touchAction: "none",
          forcedColorAdjust: "none",
          background: `linear-gradient(to right, rgba(0,0,0,0), ${sliderColor.toHex8String()})`,
        }}
      >
        <div
          className="absolute box-border -translate-x-1/2 -translate-y-1/2 rounded-full transition-[width,height] duration-[50ms] ease-in-out"
          style={{
            top: TRACK_THICKNESS / 2,
            border: "2px solid white",
            boxShadow: "0 0 0 1px black, inset 0 0 0 1px black",
            width: false ? TRACK_THICKNESS + 4 : THUMB_SIZE,
            height: false ? TRACK_THICKNESS + 4 : THUMB_SIZE,
            background: 'url("/assets/checkerboard.svg")  repeat',
            left: alpha * 360,
          }}
        >
          <div
            className="h-full w-full rounded-full"
            style={{ background: thumbColor.toHex8String() }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default HueSlider;
