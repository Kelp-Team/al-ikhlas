import { Input } from "@/components/ui/input";

interface TimePickerProps {
  value?: string;
  onChange?: (value: string) => void;
  id?: string;
  name?: string;
}

function TimePicker({ value, onChange, id, name }: TimePickerProps) {
  return (
    <Input
      type="time"
      id={id}
      name={name}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
    />
  );
}

export { TimePicker };
