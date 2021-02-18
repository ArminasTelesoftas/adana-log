import { TableListCol } from "../atoms/TableListCol";
import { FormSelect } from "../atoms/FormSelect";
import { FormSearchField } from "../organisms/FormSearchField";
import { Issue } from "../../types/models";
import { Box, TextField, Typography } from "@material-ui/core";
import React from "react";
import { Control, FieldErrors } from "react-hook-form";
import { FormAddEntryRowValues } from "../organisms/FormAddEntryRow";

interface TimeEntryFormFieldsProps {
  control: Control<FormAddEntryRowValues>;
  errors: FieldErrors<FormAddEntryRowValues>;
  activityOptions: Array<{ value: number; label: string }>;
  issues: Issue[];
  register: any;
}

export const TimeEntryFormFields: React.FC<TimeEntryFormFieldsProps> = ({
  control,
  errors,
  register,
  issues,
  activityOptions,
}) => {
  return (
    <React.Fragment>
      <TableListCol item xs={2}>
        <FormSelect
          control={control}
          options={activityOptions}
          name="activity"
          size="small"
        />
      </TableListCol>
      <TableListCol item xs={3}>
        <FormSearchField
          name="issue"
          size="small"
          control={control}
          options={issues}
          getOptionLabel={(issue: Issue | "") => (issue ? `#${issue.id}` : "")}
          getOptionSelected={(option: Issue, value: Issue | "") =>
            value === "" ? true : option.id === value.id
          }
          filterOptions={(options: Issue[], state: { inputValue: string }) => {
            const input = state.inputValue.toLowerCase();
            return options.filter(
              (issue) =>
                issue.subject.toLowerCase().includes(input) ||
                `${issue.id}`.includes(input)
            );
          }}
          renderOption={(issue: Issue) => (
            <Box>
              <Typography variant="body2" color="textSecondary">
                #{issue.id}
              </Typography>
              <Typography>{issue.subject}</Typography>
            </Box>
          )}
        />
      </TableListCol>
      <TableListCol item xs={5}>
        <TextField
          fullWidth
          size="small"
          variant="filled"
          inputRef={register}
          name="comments"
        />
      </TableListCol>
      <TableListCol item xs={2}>
        <TextField
          size="small"
          variant="filled"
          inputRef={register}
          name="hours"
          type="number"
          helperText={errors.hours?.message}
          error={Boolean(errors.hours)}
        />
      </TableListCol>
    </React.Fragment>
  );
};
