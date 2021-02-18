import { Grid, Typography } from "@material-ui/core";
import { GridProps } from "@material-ui/core/Grid";
import React from "react";

interface TableListHeaderColProps {
  align?: "right" | "left";
}

export const TableListHeadCol: React.FC<
  GridProps & TableListHeaderColProps
> = ({ children, align, ...props }) => {
  return (
    <Grid item {...props}>
      <Typography variant="body2" color="textSecondary" align={align}>
        {children}
      </Typography>
    </Grid>
  );
};
