import * as RadixTooltip from "@radix-ui/react-tooltip";
import { type ReactNode } from "react";

interface TooltipProps {
  children: ReactNode;
  tooltip: ReactNode;
  position?: "left" | "right" | "top" | "bottom";
  spacing?: number | string;
  withinPortal?: boolean;
}

function Tooltip(props: TooltipProps) {
  const { tooltip, children } = props;

  if (!tooltip) return <>{children}</>;

  return (
    <RadixTooltip.Provider>
      <RadixTooltip.Root>
        <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
        <RadixTooltip.Portal>
          <RadixTooltip.Content
            // className="data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade text-violet11 select-none rounded-[4px] bg-white px-[15px] py-[10px] text-[15px] leading-none shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] will-change-[transform,opacity]"

            className="z-10
            rounded-md
            bg-stone-200
            px-3
            py-2
            shadow-lg
            shadow-[rgba(0,0,0,0.3)]
            transition-all
            will-change-[opacity]
            data-[state=delayed-open]:animate-show
            data-[state=instant-open]:animate-show
            dark:bg-stone-800"
            sideOffset={5}
          >
            {tooltip}
            <RadixTooltip.Arrow className="TooltipArrow" />
          </RadixTooltip.Content>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  );
}

// function Tooltip(props: TooltipProps) {
//   const {
//     children,
//     tooltip,
//     position = "top",
//     spacing = 6,
//     withinPortal = false,
//     ...moreProps
//   } = props;
//   const ref = useRef<HTMLElement | null>(null);
//   const state = useTooltipTriggerState(moreProps);
//   const { triggerProps, tooltipProps } = useTooltipTrigger(
//     moreProps,
//     state,
//     ref
//   );

//   const boundingBox = ref.current?.getBoundingClientRect();
//   console.log(boundingBox);

//   // const { tooltipProps } = useTooltip(props, state);

//   if (withinPortal)
//     return (
//       <>
//         <Portal
//           className="pointer-events-none absolute"
//           style={{
//             top: boundingBox?.top,
//             left: boundingBox?.left,
//             width: boundingBox?.width,
//             height: boundingBox?.height,
//           }}
//         >
//           <div
//             className="
//               absolute
//               rounded
//               border
//               border-solid
//               border-gray-500
//               bg-stone-200
//               p-2
//               px-3
//               text-stone-800
//               shadow-md
//               transition-all
//               dark:bg-stone-800
//               dark:text-stone-200
//               dark:after:border-t-stone-800"
//             style={{
//               maxWidth: 150,
//               opacity: state.isOpen ? 1 : 0,
//               display: state.isOpen ? "block" : "none",
//               ...getAbsolutePositionStyle(position, spacing),
//             }}
//             {...mergeProps(moreProps, tooltipProps)}
//           >
//             {tooltip}
//           </div>
//         </Portal>

//         {cloneElement(children, { ...triggerProps, ref: ref })}
//       </>
//     );

//   return (
//     <div
//       className="relative"
//       {...triggerProps}
//       ref={ref as MutableRefObject<HTMLDivElement | null>}
//     >
//       <span
//         className="
//           absolute
//           rounded
//           border
//           border-solid
//           border-gray-500
//           bg-stone-200
//           p-2
//           px-3
//           text-stone-800
//           shadow-md
//           transition-all
//           dark:bg-stone-800
//           dark:text-stone-200
//           dark:after:border-t-stone-800"
//         style={{
//           maxWidth: 150,
//           opacity: state.isOpen ? 1 : 0,
//           display: state.isOpen ? "block" : "none",
//           ...getAbsolutePositionStyle(position, spacing),
//         }}
//         {...mergeProps(props, tooltipProps)}
//       >
//         {tooltip}
//       </span>

//       {children}
//     </div>
//   );
// }

// function TooltipButton(props) {
//   let ref = React.useRef(null);

//   // Get props for the trigger and its tooltip
//   let { triggerProps, tooltipProps } = useTooltipTrigger(props, state, ref);

//   return (
//     <span style={{ position: 'relative' }}>
//       <button
//         ref={ref}
//         {...triggerProps}
//         style={{ fontSize: 18 }}
//         onClick={() => alert('Pressed button')}
//       >
//         {props.children}
//       </button>
//       {state.isOpen && (
//         <Tooltip state={state} {...tooltipProps}>{props.tooltip}</Tooltip>
//       )}
//     </span>
//   );
// }

// function Tooltip({
//   children,
//   tooltip,
//   className,
//   classNameTooltip,
//   delay = "delay-1500",
//   withPortal = false,
// }: PropsWithChildren & {
//   tooltip: ReactNode;
//   className?: string;
//   classNameTooltip?: string;
//   delay?:
//     | "delay-0"
//     | "delay-75"
//     | "delay-100"
//     | "delay-150"
//     | "delay-200"
//     | "delay-300"
//     | "delay-500"
//     | "delay-700"
//     | "delay-1000"
//     | "delay-1500"
//     | "delay-2000"
//     | "delay-2500"
//     | "delay-3000";
//   withPortal?: boolean;
// }) {
//   if (withPortal) {
//     return (
//       <div className={`tooltip ${className ?? ""} tooltip-${delay}`}>
//         {children}
//         <Portal>
//           <div
//             className={`tooltip-text bg-stone-200 text-stone-800 after:border-transparent after:border-t-stone-200 dark:bg-stone-800 dark:text-stone-200 dark:after:border-t-stone-800 ${
//               classNameTooltip ?? ""
//             }`}
//           >
//             {tooltip}
//           </div>
//         </Portal>
//       </div>
//     );
//   }

//   return (
//     <div className={`tooltip ${className ?? ""} tooltip-${delay}`}>
//       {children}

//       <div
//         className={`tooltip-text bg-stone-200 text-stone-800 after:border-transparent after:border-t-stone-200 dark:bg-stone-800 dark:text-stone-200 dark:after:border-t-stone-800 ${
//           classNameTooltip ?? ""
//         }`}
//       >
//         {tooltip}
//       </div>
//     </div>
//   );
// }

export default Tooltip;
