import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import MuiSelect from "@material-ui/core/Select";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
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
}

export const Select: React.FC<SelectOptions> = ({
  options,
  value: outerValue,
  label,
}) => {
  const classes = useStyles();

  const [value, setValue] = React.useState(outerValue);

  const handleChange = (event: React.ChangeEvent<{ value: any }>) => {
    setValue(event.target.value);
  };

  return (
    <FormControl className={classes.formControl}>
      {label && <InputLabel>{label}</InputLabel>}
      <MuiSelect variant="filled" value={value} onChange={handleChange}>
        {options.map(({ value, label }) => (
          <MenuItem key={value} value={value}>
            {label}
          </MenuItem>
        ))}
      </MuiSelect>
    </FormControl>
  );
};
