import React, { useEffect, useState } from "react";
import { TopBar } from "../../organisms/TopBar";
import { Box, Button, Typography } from "@material-ui/core";
import { match } from "react-router-dom";
import { useAppDispatch } from "../../../App.reducer";
import { Container } from "../../atoms/Container";
import { api } from "../../../index";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { channels } from "../../../shared/constants";
import { UpdateAvailableResponse, UpdateDownloadedResponse } from "../../../types/api";
import { UpdateInfo } from "../../../types/types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    versionText: {
      fontWeight: 500,
    },
    wrapper: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      padding: theme.spacing(7, 0),
    },
    greenText: {
      color: theme.palette.success.main,
    },
    applyText: {
      cursor: "pointer",
    },
  })
);

interface UpdatesProps {
  match: match;
}

export const Updates: React.FC<UpdatesProps> = ({ match }) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const [version, setVersion] = useState("");
  const [loading, setLoading] = useState(false);
  const [updateDownloading, setUpdateDownloading] = useState(false);
  const [updateAvailable, setUpdateAvailable] = useState<UpdateInfo | undefined>();
  const [downloadedUpdate, setDownloadedUpdate] = useState<UpdateInfo | undefined>();

  const onApplyNewVersion = () => {
    api.applyUpdateAndRestart();
  };

  //TODO:: Updates loading states is in bad order. Low prio fix.

  useEffect(() => {
    const getVersion = async () => {
      const response = await api.getAppVersion();
      setVersion(response.version);
    };
    getVersion();

    window.api.on(channels.updateAvailable, (props?: UpdateAvailableResponse) => {
      console.log("update-available", props);
      setUpdateDownloading(true);
      setUpdateAvailable(props?.update);
    });

    window.api.on(channels.updateDownloaded, (props?: UpdateDownloadedResponse) => {
      console.log("update-downloaded", props);
      setUpdateDownloading(false);
      setDownloadedUpdate(props?.update);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <TopBar match={match} dispatch={dispatch} title="Updates">
      <Container>
        <Box className={classes.wrapper}>
          <Typography variant="h3">Adana Log</Typography>
          <Box display="inline-flex" py={3}>
            <Typography>Current version: &nbsp;</Typography>
            <Typography className={classes.versionText} color="primary">
              {version}
            </Typography>
          </Box>
          <Button
            variant="contained"
            disabled={loading}
            onClick={async () => {
              try {
                setLoading(true);
                await api.checkForUpdates();
              } finally {
                setLoading(false);
              }
            }}
          >
            Check for Updates
          </Button>
          <Box py={5} display="flex" flexDirection="column" alignItems="center">
            {updateDownloading && !downloadedUpdate && (
              <Typography>Downloading update v{updateAvailable?.version}...</Typography>
            )}
            {downloadedUpdate && (
              <>
                <Typography className={classes.greenText}>
                  New version available v{downloadedUpdate?.version}.
                </Typography>
                <Button onClick={onApplyNewVersion}>Click to Apply</Button>
              </>
            )}
          </Box>
        </Box>
      </Container>
    </TopBar>
  );
};
