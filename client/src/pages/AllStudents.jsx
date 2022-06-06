import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import ApprovedStudents from "../components/ApprovedStudents";
import PendingStudents from "../components/PendingStudents";

import {
  Box,
  Typography,
  Grid,
  Container,
  Paper,
  Avatar,
  Divider,
  Button,
  Tooltip,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { ErrorOutline } from "@mui/icons-material";
function AllStudents() {
  const { user } = useSelector((state) => state.auth);

  return (
    <Layout>
      <Box
        sx={{
          background: "#F5F6FA",
          flexGrow: 1,
          minHeight: "100vh",
          padding: 5,
        }}
      >
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={6}>
            
            {user.isApproved ? (
              <>
              {
                user.roles[0] === "HOD"
                || user.roles[0] === "WARDEN" || user.roles[0] === "SYSTEM_ADMIN" ? (
                  <PendingStudents />
                ) : null
              }
                <ApprovedStudents />
              </>
            ) : (
              <Grid item xs={12}>
                <Paper
                  elevation={4}
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: 3,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: 2,
                      color: "red",
                    }}
                  >
                    <ErrorOutline />
                    <Typography sx={{ marginLeft: 2 }}>
                      Your profile needs to be approved first by the system admin before you can
                      perform any action!
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            )}
          </Grid>
        </Container>
      </Box>
    </Layout>
  );
}

export default AllStudents;
