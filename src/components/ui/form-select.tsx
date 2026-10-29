import * as React from "react";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const EMPTY_OPTION = "__form_select_empty__";

type FormSelectProps = Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "children" | "onChange"> & {
  children: React.ReactNode;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

export function FormSelect({ children, className, value, defaultValue, onChange, required, disabled, name, ...props }: FormSelectProps) {
  const options = React.Children.toArray(children).flatMap((child) => {
    if (!React.isValidElement(child) || child.type !== "option") return [];
    const option = child as React.ReactElement<React.OptionHTMLAttributes<HTMLOptionElement>>;
    const label = option.props.children;
    const text = React.Children.toArray(label).map((part) => typeof part === "string" || typeof part === "number" ? String(part) : "").join("");
    return [{ value: String(option.props.value ?? text), label, disabled: option.props.disabled ?? false }];
  });
  const hasEmptyOption = options.some((option) => option.value === "");
  const encode = (selected: string | undefined) => selected === "" && hasEmptyOption && !required ? EMPTY_OPTION : selected;
  const placeholder = required && hasEmptyOption ? options.find((option) => option.value === "")?.label : undefined;
  const visibleOptions = required && hasEmptyOption ? options.filter((option) => option.value !== "") : options;
  const initialValue = defaultValue === undefined ? (required ? "" : options[0]?.value ?? "") : String(defaultValue);
  const [internalValue, setInternalValue] = React.useState(encode(initialValue));
  const selectedValue = value === undefined ? internalValue : encode(String(value));

  return (
    <Select
      value={selectedValue}
      onValueChange={(selected) => {
        setInternalValue(selected);
        onChange?.({ target: { value: selected === EMPTY_OPTION ? "" : selected } } as React.ChangeEvent<HTMLSelectElement>);
      }}
      required={required}
      disabled={disabled}
      name={name}
    >
      <SelectTrigger {...props} className={cn("h-12 w-full rounded-xl border border-input bg-background px-4 text-sm font-medium outline-none focus-visible:ring-2 focus-visible:ring-ring", className)}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {visibleOptions.map((option) => <SelectItem key={option.value || EMPTY_OPTION} value={option.value || EMPTY_OPTION} disabled={option.disabled}>{option.label}</SelectItem>)}
      </SelectContent>
    </Select>
  );
}
