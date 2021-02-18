import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { IconButton, Menu, MenuItem } from "@material-ui/core";
import { Template } from "../../types/models";
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      position: "absolute",
      top: -12,
      right: 0,
      marginLeft: "auto",
      marginRight: "auto",
    },
  })
);

interface TemplateSelectProps {
  templates: Template[];
  onSelect: (template: Template) => void;
}

export const TemplateSelect: React.FC<TemplateSelectProps> = ({ templates, onSelect }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (template: Template) => () => {
    handleClose();
    onSelect(template);
  };

  return (
    <>
      <IconButton
        className={classes.button}
        onClick={(event) => {
          handleClick(event);
        }}
      >
        <MenuIcon color="primary" />
      </IconButton>
      <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem disabled>Templates</MenuItem>
        {templates.map((el) => (
          <MenuItem key={el.id} onClick={handleSelect(el)}>
            {el.title}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
