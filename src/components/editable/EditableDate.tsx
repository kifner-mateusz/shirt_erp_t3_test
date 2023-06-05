import { useEffect, useId, useRef, useState } from "react";

import { useDebouncedValue } from "@mantine/hooks";
import { IconCalendar } from "@tabler/icons-react";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import Calendar from "react-calendar";

import ActionButton from "~/components/basic/ActionButton";
import DisplayCell from "~/components/basic/DisplayCell";
import Popover from "~/components/basic/Popover";
import InputLabel from "~/components/input/InputLabel";

import type EditableInput from "~/types/EditableInput";
import { handleBlurForInnerElements } from "~/utils/handleBlurForInnerElements";
import { handleFocusForInnerElements } from "~/utils/handleFocusForInnerElements";

type InputDateProps = EditableInput<string>;

const EditableDate = (props: InputDateProps) => {
  const {
    label,
    value,
    initialValue,
    onSubmit,
    disabled,
    required,
    leftSection,
    rightSection,
  } = props;
  const uuid = useId();
  const router = useRouter();
  const [focus, setFocus] = useState<boolean>(false);
  const dateFormat = router.locale === "pl" ? "DD.MM.YYYY" : "YYYY-MM-DD";
  const [text, setText] = useState(
    dayjs(value ?? initialValue ?? null)
      .format("L")
      .toString()
  );

  const [debouncedText, cancel] = useDebouncedValue(text, 300);
  const inputDateRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<boolean>(false);
  const [calendarOpened, setCalendarOpened] = useState<boolean>(false);

  useEffect(() => {
    if (focus && !calendarOpened) {
      inputDateRef.current?.focus();
      inputDateRef.current?.selectionStart &&
        (inputDateRef.current.selectionStart =
          inputDateRef.current.value.length);
    }
  }, [focus]);

  useEffect(() => {
    if (debouncedText.length === 0) {
      onSubmit?.(null);
      return;
    }

    const newDate = dayjs(debouncedText, dateFormat, router.locale);
    if (!newDate.isValid()) {
      setError(true);
      return;
    }

    if (
      newDate.format("YYYY-MM-DD").toString() !=
      dayjs(value).format("YYYY-MM-DD").toString()
    ) {
      onSubmit?.(newDate.format("YYYY-MM-DD").toString());
    }
    setError(false);
  }, [debouncedText]);

  return (
    <div className="relative flex-grow">
      <InputLabel
        label={label}
        copyValue={text}
        htmlFor={"inputDate_" + uuid}
      />
      <DisplayCell
        onFocus={handleFocusForInnerElements(() => setFocus(true))}
        onBlur={handleBlurForInnerElements(() => setFocus(false))}
        onClick={() => setFocus(true)}
        className={"px-2"}
        error={error}
        leftSection={leftSection}
        rightSection={
          <Popover
            onOpenChange={setCalendarOpened}
            trigger={
              !!rightSection ? (
                rightSection
              ) : (
                <div className="flex items-center justify-center">
                  <ActionButton>
                    <IconCalendar size={18} />
                  </ActionButton>
                </div>
              )
            }
            contentProps={{ align: "end", sideOffset: 13 }}
          >
            <Calendar
              key={value}
              className={"z-[1000] w-96 rounded p-2"}
              onChange={(date) => {
                setText(
                  dayjs(date as Date)
                    .format("L")
                    .toString()
                );
              }}
              value={
                dayjs(text).isValid()
                  ? dayjs(text).format("YYYY-MM-DD").toString()
                  : null
              }
            />
          </Popover>
        }
        focus={focus || calendarOpened}
      >
        <input
          id={"inputDate_" + uuid}
          ref={inputDateRef}
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
          className="
              data-disabled:text-gray-500
              dark:data-disabled:text-gray-500
              w-full
              resize-none
              overflow-hidden 
              whitespace-pre-line
              break-words
              bg-transparent
              py-1
              text-sm
              outline-none
              placeholder:text-gray-400
              focus-visible:border-transparent
              focus-visible:outline-none
              dark:placeholder:text-stone-600
              "
          readOnly={disabled}
          required={required}
          autoComplete="off"
        />
      </DisplayCell>
    </div>
  );
};

export default EditableDate;
