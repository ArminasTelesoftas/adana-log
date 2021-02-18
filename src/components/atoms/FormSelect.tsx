import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import { Control, Controller } from "react-hook-form";
import { TextField } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  })
);

interface SelectOptions {
  options: { value: number; label: string }[];
  value?: number;
  label?: string;
  name: string;
  control: Control<any>;
  size?: "small" | "medium";
}

export const FormSelect: React.FC<SelectOptions> = ({
  options,
  label,
  name,
  control,
  size = "medium",
}) => {
  const classes = useStyles();

  return (
    <FormControl className={classes.formControl} fullWidth>
      <Controller
        control={control}
        name={name}
        as={
          <TextField select variant="filled" label={label} size={size}>
            {options.map(({ value, label }) => (
              <MenuItem key={value} value={value}>
                {label}
              </MenuItem>
            ))}
          </TextField>
        }
      />
    </FormControl>
  );
};
