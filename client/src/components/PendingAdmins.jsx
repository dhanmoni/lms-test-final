import React, { useEffect, useState } from "react";
import {
  List,
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  Grid,
  Box,
  Paper,
  Button,
} from "@mui/material";
import {
  AccessTimeOutlined,
  CloseRounded,
  DoneRounded,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { getAllAdmins, approveAdmin, rejectAdmin } from "../redux/adminSlice";
import PendingAdminCard from "./PendingAdminCard";

function PendingAdmins() {
  const dispatch = useDispatch();

  const { user, jwt_token } = useSelector((state) => state.auth);
  const { admins } = useSelector((state) => state.admins);

  useEffect(() => {
    dispatch(getAllAdmins({ jwt_token }));
  }, []);

  return (
    <Grid item xs={12}>
      <Paper
        elevation={4}
        sx={{ p: 2, display: "flex", flexDirection: "column", borderRadius: 3 }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600, padding: 2 }}>
          Pending Admins
        </Typography>
        <Divider variant="middle" />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <List sx={{ width: "100%" }}>
            {admins && admins.length ? (
              <>
                {admins.map((admin) => {
                  return (
                    !admin.isApproved && (
                      <>
                        <PendingAdminCard admin={admin} />
                        <Divider variant="inset" component="li" />
                      </>
                    )
                  );
                })}
              </>
            ) : (
              <>
                <Typography align="center">No Data Available...</Typography>
              </>
            )}
          </List>
        </Box>
      </Paper>
    </Grid>
  );
}
let str = "hello";

export default PendingAdmins;
