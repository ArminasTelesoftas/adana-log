import React from "react";
import { Box, IconButton, Menu, MenuItem, Typography } from "@material-ui/core";
import { TableListCol } from "../atoms/TableListCol";
import { TableListRow } from "../atoms/TableListRow";
import { TimeEntry } from "../../types/models";
import MoreVertIcon from "@material-ui/icons/MoreVert";

interface EntryRowViewProps {
  entry: TimeEntry;
  onEdit: () => void;
  onDelete: () => void;
}

export const EntryRowView: React.FC<EntryRowViewProps> = ({
  entry: { hours, activity, comments, issue },
  onDelete,
  onEdit,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <TableListRow
      secondaryAction={
        <Box>
          <IconButton onClick={handleClick}>
            <MoreVertIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={onEdit}>Edit</MenuItem>
            <MenuItem onClick={onDelete}>Delete</MenuItem>
          </Menu>
        </Box>
      }
    >
      <TableListCol item xs={2}>
        <Box pl={1.5}>
          <Typography>{activity?.name}</Typography>
        </Box>
      </TableListCol>
      <TableListCol item xs={3}>
        <Typography>{issue?.id && `#${issue.id}`}</Typography>
      </TableListCol>
      <TableListCol item xs={5}>
        <Typography>{comments}</Typography>
      </TableListCol>
      <TableListCol item xs={2}>
        <Typography>{hours}</Typography>
      </TableListCol>
    </TableListRow>
  );
};
