import React from "react";
import DateFnsUtils from "@date-io/date-fns";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { Control, Controller } from "react-hook-form";

interface FormDatePickerFieldProps {
  name: string;
  format?: string;
  label?: string;
  control: Control<any>;
  variant?: "filled" | "standard" | "outlined";
}

export const FormDatePickerField: React.FC<FormDatePickerFieldProps> = ({
  name,
  label,
  format = "yyyy/MM/dd",
  variant = "standard",
  control,
}) => {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Controller
        control={control}
        name={name}
        render={({ onChange, value }) => (
          <KeyboardDatePicker
            fullWidth
            label={label}
            format={format}
            value={value}
            inputVariant={variant}
            onChange={(value: Date | null) => {
              onChange(value);
            }}
          />
        )}
      />
    </MuiPickersUtilsProvider>
  );
};
