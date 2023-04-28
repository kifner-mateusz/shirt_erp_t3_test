import { type ComponentType, useEffect, useId, useState } from "react";
import { useHover, useListState } from "@mantine/hooks";
import { isEqual, omit } from "lodash";
import type EditableInput from "../../types/EditableInput";
import { IconDots, IconPlus, IconTrashX } from "@tabler/icons-react";
import { handleBlurForInnerElements } from "~/utils/handleBlurForInnerElements";
import Button from "../basic/Button";
import { Menu } from "@headlessui/react";
import ActionButton from "../basic/ActionButton";

// fixme submit only on edit end

interface EditableArrayProps
  extends Omit<EditableInput<any[]>, "value" | "initialValue"> {
  value?: any[] | null;
  initialValue?: any[] | null;
  newItemValue?: any;
  maxCount?: number;
  Element: ComponentType<any>;
  elementProps: any;
  organizingHandle: "none" | "arrows" | "drag and drop";
  linkEntry: boolean;
  unique: boolean;
}

const EditableArray = (props: EditableArrayProps) => {
  const {
    label,
    value,
    initialValue,
    newItemValue,
    onSubmit,
    disabled,
    required,
    maxCount,
    Element,
    elementProps,
    organizingHandle = "none",
    linkEntry = false,
    unique = true,
  } = props;
  const [items, handlers] = useListState<any>(value ?? initialValue ?? []);
  const [focus, setFocus] = useState<boolean>(false);
  const [prev, setPrev] = useState<any[]>(items);
  const uuid = useId();

  useEffect(() => {
    const filtered_items = items.filter((val) => !!val);
    if (
      isEqual(
        filtered_items,
        prev.filter((val) => !!val)
      )
    )
      return;
    onSubmit?.(filtered_items);
    // eslint-disable-next-line
  }, [items]);

  useEffect(() => {
    if (value === undefined || value === null) return;
    handlers.setState(value);
    setPrev(value);
    // eslint-disable-next-line
  }, [value]);

  // useEffect(() => {
  //   // console.log("items append")
  //   if (
  //     active &&
  //     (items.length === 0 || (items.length && !!items[items.length - 1]))
  //   ) {
  //     handlers.append(null)
  //   }
  //   // console.log(
  //   //   items.some((item) => !item),
  //   //   items
  //   // )
  //   if (!active && items.some((item) => !item)) {
  //     handlers.filter((val) => !!val)
  //     console.log("items filter")
  //   }
  //   // console.log("items active")
  // }, [items, active])

  return (
    <div
      className="flex-grow"
      onClick={() => !disabled && setFocus(true)}
      onFocus={() => !disabled && setFocus(true)}
      onBlur={handleBlurForInnerElements(() => setFocus(false))}
      tabIndex={999999}
    >
      {label && (
        <label
          htmlFor={"textarea_" + uuid}
          className="
        text-sm
        dark:text-gray-400"
        >
          <div className="flex items-center py-1">{label}</div>
        </label>
      )}

      <div className="relative h-11">
        <div className=" mb-8 mt-4 flex flex-col">
          {items.length == 0 && "⸺"}
          {items.map((val, index) => {
            return (
              <div className="flex gap-2" key={uuid + index}>
                <div className="flex-grow rounded-sm bg-stone-200 dark:bg-stone-800">
                  <Element
                    {...omit(elementProps, ["label"])}
                    value={val}
                    onSubmit={(itemValue: any) => {
                      handlers.setItem(index, itemValue);
                    }}
                    disabled={disabled}
                    linkEntry={linkEntry}
                  />
                </div>
                {!disabled && (
                  <Menu>
                    <Menu.Button>
                      <ActionButton tabIndex={-1} className="rounded-xl">
                        <IconDots size={14} />
                      </ActionButton>
                    </Menu.Button>

                    <Menu.Items>
                      <Menu.Item>
                        <ActionButton
                          tabIndex={-1}
                          className="rounded-xl"
                          onClick={() => {
                            handlers.remove(index);
                            // setItems((val) => val.filter((_, i) => i !== index))
                          }}
                        >
                          <IconTrashX size={14} />
                          Delete
                        </ActionButton>
                      </Menu.Item>
                    </Menu.Items>
                  </Menu>
                )}
              </div>
            );
          })}
        </div>

        {!disabled && (
          <Button
            className="bg-sky-500"
            onClick={
              () => handlers.append(null)
              //  setItems((val) => [...val, null])
            }
            disabled={maxCount ? maxCount <= items.length : undefined}
            style={{ flexGrow: 1 }}
          >
            <IconPlus />
          </Button>
        )}
      </div>
    </div>
  );
};

export default EditableArray;
