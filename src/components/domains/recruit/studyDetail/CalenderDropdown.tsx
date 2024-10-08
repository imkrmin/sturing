import Dropdown from "../../../commons/Dropdown";
import { Calendar } from "@/components/shadcn/ui/calendar";
import { DateRange } from "react-day-picker";
import { format, isBefore, startOfToday } from "date-fns";
import { ko } from "date-fns/locale";

interface CalenderDropdownProps {
  date: DateRange;
  setDate: (date: DateRange) => void;
}

export default function CalenderDropdown(props: CalenderDropdownProps) {
  const { date, setDate } = props;
  const handleDateChange = (range: DateRange | undefined) => {
    if (
      !range ||
      (range.from && isBefore(range.from, startOfToday())) ||
      (range.to && isBefore(range.to, startOfToday()))
    ) {
      return;
    }
    setDate(range);
  };

  const formattedDate = date?.from
    ? date?.to
      ? `${format(date.from, "yyyy-MM-dd", { locale: ko })} ~ ${format(date.to, "yyyy-MM-dd", { locale: ko })}`
      : `${format(date.from, "yyyy-MM-dd", { locale: ko })}`
    : "";

  return (
    <Dropdown value={formattedDate} placeholder="진행기간을 선택해 주세요" autoClose onChange={(e) => e.target.value}>
      <div className="w-full flex-col inline-flex justify-center items-center mt-2">
        <div className="w-full h-px rotate-180 border border-neutral-200 z-toast"></div>
        <Calendar
          mode="range"
          initialFocus
          defaultMonth={date?.from || new Date()}
          selected={date}
          onSelect={handleDateChange}
          numberOfMonths={1}
          disabled={{ before: startOfToday() }}
        />
      </div>
    </Dropdown>
  );
}
