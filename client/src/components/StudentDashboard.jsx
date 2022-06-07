import {
  Box,
  Typography,
  Grid,
  Container,
  Paper,
  Avatar,
  Divider,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Collapse,
  IconButton
} from "@mui/material";
import {
  AddOutlined,
  KeyboardArrowDown,
  KeyboardArrowUp,
  Refresh,
} from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import PendingLeaveCard from "./PendingLeaveCard";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getApplications, refreshApplicationState } from "../redux/applicationSlice";

const Row = ({ application, user, status }) => {
  const { subject, reason, startDate, endDate, approveLevel, approvels } =
    application;
  const s_date = new Date(startDate * 1000).toLocaleDateString("en-GB");
  const e_date = new Date(endDate * 1000).toLocaleDateString("en-GB");
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow
        key={subject}
        onClick={() => setOpen(!open)}
        sx={{
          "& > *": { borderBottom: "unset" },
          "&:hover": { cursor: "pointer" },
        }}
      >
        <TableCell>
          <IconButton aria-label="expand row" size="small">
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell>{subject}</TableCell>
        <TableCell align="right">{s_date}</TableCell>
        <TableCell align="right">{e_date}</TableCell>
        <TableCell align="right">{status}</TableCell>
      </TableRow>
      <TableRow sx={{ borderBottom: 1 }}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <PendingLeaveCard application={application} user={user} showWitdrawBtn={false}/>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

function StudentDashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { applications } = useSelector((state) => state.applications);
  const { publicKey, user } = useSelector((state) => state.auth);
  const showApplyBtn = useState(true);
  useEffect(() => {
    dispatch(getApplications(publicKey));
  }, []);

  return (
    <>
      <Grid item xs={12}>
        <Paper
          elevation={4}
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            borderRadius: 3,
          }}
        >
          <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600, padding: 2 }}>
            Active Leave Application
          </Typography>
          <Button startIcon={<Refresh />} onClick={()=> {
            dispatch(refreshApplicationState())
            dispatch(getApplications(publicKey));
          }}>
            Refresh
          </Button>
        </Box>
          <Divider variant="middle" />
          {applications &&
            Object.keys(applications).length != 0 &&
            applications[publicKey] &&
            applications[publicKey].map((app) => {
              if (app.academicLeave && !app.withDrawn && app.approveLevel === 1) {
                showApplyBtn[0] = false;
                return (
                  <>
                    <PendingLeaveCard
                      application={app}
                      user={user}
                      key={app.subject}
                      showWitdrawBtn={true}
                    />
                  </>
                );
              }
              if (
                user.projectGuide?.id &&
                app.dswReq &&
                !app.academicLeave && 
                !app.withDrawn &&
                app.approveLevel > 0 &&
                app.approveLevel < 6
              ) {
                showApplyBtn[0] = false;
                return (
                  <>
                    <PendingLeaveCard
                      application={app}
                      user={user}
                      key={app.subject}
                      showWitdrawBtn={true}
                    />
                  </>
                );
              }
              if (
                user.projectGuide?.id &&
                !app.dswReq &&
                !app.academicLeave &&
                !app.withDrawn &&
                app.approveLevel > 0 &&
                app.approveLevel < 5
              ) {
                showApplyBtn[0] = false;
                return (
                  <>
                    <PendingLeaveCard
                      application={app}
                      user={user}
                      key={app.subject}
                      showWitdrawBtn={true}
                    />
                  </>
                );
              }
              if (
                !user.projectGuide?.id &&
                !app.dswReq &&
                !app.academicLeave &&
                !app.withDrawn &&
                app.approveLevel > 0 &&
                app.approveLevel < 4
              ) {
                showApplyBtn[0] = false;
                return (
                  <>
                    <PendingLeaveCard
                      application={app}
                      user={user}
                      key={app.subject}
                      showWitdrawBtn={true}
                    />
                  </>
                );
              }
              if (
                !user.projectGuide?.id &&
                app.dswReq &&
                !app.academicLeave &&
                !app.withDrawn &&
                app.approveLevel > 0 &&
                app.approveLevel < 5
              ) {
                showApplyBtn[0] = false;
                return (
                  <>
                    <PendingLeaveCard
                      application={app}
                      user={user}
                      key={app.subject}
                      showWitdrawBtn={true}
                    />
                  </>
                );
              }
            })}
          {showApplyBtn[0] == true && (
            <Box
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography>
                You do not have any active leave application!
              </Typography>
              <Button
                variant="outlined"
                color="primary"
                sx={{ mt: 2 }}
                endIcon={<AddOutlined />}
                onClick={() => navigate("/apply")}
              >
                Apply leave
              </Button>
            </Box>
          )}
        </Paper>
      </Grid>

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
          <Typography variant="h6" sx={{ fontWeight: 600, padding: 2 }}>
            Recent Leave Applications
          </Typography>
          <Divider variant="middle" />
          <Box
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow sx={{ background: "#F5F6FA" }}>
                    <TableCell />
                    <TableCell sx={{ fontWeight: "bold" }}>Subject</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }} align="right">
                      From Date
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }} align="right">
                      To Date
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }} align="right">
                      Status
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {applications &&
                    Object.entries(applications).map((appObj, index) => {
                      return appObj[1].map((app) => {
                        if(app.withDrawn){
                          return (
                            <Row
                              key={index}
                              application={app}
                              user={user}
                              status="Withdrawn"
                            />
                          );
                        }
                        else if (app.approveLevel == 0) {
                          return (
                            <Row
                              key={index}
                              application={app}
                              user={user}
                              status="Rejected"
                            />
                          );
                        } else if (
                          app.academicLeave &&
                          app.approveLevel === 2
                        ) {
                          return (
                            <Row
                              key={index}
                              application={app}
                              user={user}
                              status="Approved"
                            />
                          );
                        } else if (
                          user.projectGuide?.id &&
                          app.dswReq &&
                          app.approveLevel === 6
                        ) {
                          return (
                            <Row
                              key={index}
                              application={app}
                              user={user}
                              status="Approved"
                            />
                          );
                        } else if (
                          user.projectGuide?.id &&
                          !app.dswReq &&
                          app.approveLevel === 5
                        ) {
                          return (
                            <Row
                              key={index}
                              application={app}
                              user={user}
                              status="Approved"
                            />
                          );
                        } else if (
                          !user.projectGuide?.id &&
                          app.dswReq &&
                          app.approveLevel === 5
                        ) {
                          return (
                            <Row
                              key={index}
                              application={app}
                              user={user}
                              status="Approved"
                            />
                          );
                        } else if (
                          !user.projectGuide?.id &&
                          !app.dswReq &&
                          app.approveLevel === 4
                        ) {
                          return (
                            <Row
                              key={index}
                              application={app}
                              user={user}
                              status="Approved"
                            />
                          );
                        }
                      });
                    })}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Paper>
      </Grid>
    </>
  );
}

export default StudentDashboard;
