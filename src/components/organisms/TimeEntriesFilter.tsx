import React, { useState } from "react";
import FilterListIcon from "@material-ui/icons/FilterList";
import { Box, Dialog, IconButton } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { DateRangePicker } from "materialui-daterange-picker";
import { DateRange } from "../../types/types";

interface TimeEntriesFilterProps {
  dateRange: DateRange;
  onDateRangeChanged: (dateRange: DateRange) => void;
}

export const TimeEntriesFilter: React.FC<TimeEntriesFilterProps> = ({
  dateRange: dateRangeValue,
  onDateRangeChanged,
}) => {
  const [open, setOpen] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange>(dateRangeValue);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    onDateRangeChanged(dateRange);
  };

  return (
    <Box>
      <IconButton onClick={handleClickOpen}>
        <FilterListIcon color="secondary" />
      </IconButton>

      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Dialog open={open} onClose={handleClose} maxWidth="lg">
          <DateRangePicker
            open={open}
            initialDateRange={dateRange}
            toggle={handleClose}
            onChange={(range) =>
              setDateRange({
                endDate: range.endDate || dateRange.endDate,
                startDate: range.startDate || dateRange.startDate,
              })
            }
          />
        </Dialog>
      </MuiPickersUtilsProvider>
    </Box>
  );
};
