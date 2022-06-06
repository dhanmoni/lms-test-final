import React from "react";
import {
  Box,
  Typography,
  Grid,
  Container
} from "@mui/material";

import Layout from "../components/Layout";
import PendingLeaves from "../components/PendingLeaves";
import RecentLeaves from "../components/RecenctLeaves";
function LeaveRequests() {
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
            <PendingLeaves />
            <RecentLeaves/>
          </Grid>
        </Container>
      </Box>
    </Layout>
  );
}

export default LeaveRequests;
