import React from "react";
import { Issue } from "../../types/models";
import { Box, Typography } from "@material-ui/core";
import { FormSearchField } from "../organisms/FormSearchField";
import { Control } from "react-hook-form";

interface FormIssueSelectProps {
  control: Control<{ issue: Issue | null }>;
  issues: Issue[];
}

export const FormIssueSelect: React.FC<FormIssueSelectProps> = ({ control, issues }) => {
  return (
    <FormSearchField
      name="issue"
      label="Issue"
      control={control}
      options={issues}
      getOptionLabel={(issue: Issue | "") => (issue ? `#${issue.id} ${issue.subject}` : "")}
      getOptionSelected={(option: Issue, value: Issue | "") =>
        value === "" ? true : option.id === value.id
      }
      filterOptions={(options: Issue[], state: { inputValue: string }) => {
        const input = state.inputValue.toLowerCase();
        return options.filter(
          (issue) => issue.subject.toLowerCase().includes(input) || `${issue.id}`.includes(input)
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
  );
};
