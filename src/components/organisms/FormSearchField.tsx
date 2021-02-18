import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Control, Controller } from "react-hook-form";

interface FormSearchFieldProps {
  options: Array<any>;
  getOptionLabel: (option: any) => string;
  renderOption: (option: any) => React.ReactElement;
  filterOptions: (option: any, state: any) => Array<any>;
  name: string;
  control: Control<any>;
  getOptionSelected: (option: any, value: any) => boolean;
  size?: "small" | "medium"
  label?: string
}

export const FormSearchField: React.FC<FormSearchFieldProps> = ({
  options,
  getOptionLabel,
  renderOption,
  filterOptions,
  getOptionSelected,
  name,
  control,
  size = "medium",
  label
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ onChange, ...props }) => (
        <Autocomplete
          getOptionSelected={getOptionSelected}
          options={options}
          getOptionLabel={getOptionLabel}
          renderOption={renderOption}
          filterOptions={filterOptions}
          onChange={(e, data) => onChange(data)}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Search"
              size={size}
              label={label}
              variant="filled"
            />
          )}
          {...props}
        />
      )}
    />
  );
};
