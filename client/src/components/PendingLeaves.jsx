import React, { useEffect, useState, useRef } from "react";
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
  Card,
  CardHeader,
  CardContent,
  CardActions,
  IconButton,
  Stack,
} from "@mui/material";

import {
  CloseRounded,
  DoneRounded,
  ErrorOutline,
  Refresh,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  getApplications,
  rejectApplication,
  refreshApplicationState,
  approveApplication,
} from "../redux/applicationSlice";

const ApplicationCard = ({ application, student, system_admin }) => {
  const dispatch = useDispatch();
  const btnClicked = useRef(1);
  const [status, setStatus] = useState("");
  const handleRejectApplication = (key) => {
    dispatch(rejectApplication(key));
    btnClicked.current--;
    setStatus("reject");
  };
  const handleApproveApplication = (key) => {
    dispatch(approveApplication(key));
    btnClicked.current++;
    setStatus("approve");
  };
  console.log({ student, application, system_admin });
  const {
    subject,
    reason,
    startDate,
    endDate,
    prefixDate,
    suffixDate,
    prefixReason,
    suffixReason,
    approveLevel,
    approvels,
  } = application;

  const s_date = new Date(startDate * 1000).toLocaleDateString("en-GB");
  const e_date = new Date(endDate * 1000).toLocaleDateString("en-GB");
  let pre_date;
  let suff_date;
  if (prefixDate > 1) {
    pre_date = new Date(prefixDate * 1000).toLocaleDateString("en-GB");
  }
  if (suffixDate > 1) {
    suff_date = new Date(suffixDate * 1000).toLocaleDateString("en-GB");
  }
  return (
    <Card sx={{ margin: 2 }} spacing={2} elevation={4}>
      <CardHeader
        avatar={<Avatar aria-label="recipe">{student.name[0]}</Avatar>}
        title={
          <Typography sx={{ fontWeight: "bold" }}>{student.name}</Typography>
        }
        subheader={
          <Box>
            <Typography sx={{}}>
              Department: {student.department.name}
            </Typography>
            <Typography sx={{}}>Hostel: {student.hostel.name}</Typography>
          </Box>
        }
      />
      <Divider variant="middle" />
      <CardContent>
        <Typography
          sx={{ lineHeight: 2, fontWeight: "bold", fontSize: "1.2rem" }}
        >
          {subject}
        </Typography>
        <Typography sx={{ lineHeight: 1.5 }}>{reason}</Typography>
        <Typography>
          From <span style={{ fontWeight: "bold" }}>{s_date}</span>
        </Typography>
        <Typography>
          To: <span style={{ fontWeight: "bold" }}>{e_date}</span>
        </Typography>
        {pre_date && (
          <>
            <Typography>
              Prefix Date:{" "}
              <span style={{ fontWeight: "bold" }}>{pre_date}</span>
            </Typography>
            <Typography>
              Prefix Reason:{" "}
              <span style={{ fontWeight: "bold" }}>{prefixReason}</span>
            </Typography>
          </>
        )}
        {suff_date && (
          <>
            <Typography>
              Suffix Date{" "}
              <span style={{ fontWeight: "bold" }}>{suff_date}</span>
            </Typography>
            <Typography>
              Suffix Reason:{" "}
              <span style={{ fontWeight: "bold" }}>{suffixReason}</span>
            </Typography>
          </>
        )}
      </CardContent>
      {!system_admin && (
        <CardActions sx={{ margin: 1 }}>
          <Box>
            {btnClicked.current == 1 && (
              <>
                <Button
                  sx={{ fontSize: 12, marginRight: "6px" }}
                  edge="end"
                  variant="outlined"
                  color="success"
                  startIcon={<DoneRounded />}
                  onClick={() => handleApproveApplication(student.publicKey)}
                >
                  Approve
                </Button>
                <Button
                  sx={{ fontSize: 12 }}
                  edge="end"
                  variant="outlined"
                  color="danger"
                  startIcon={<CloseRounded />}
                  onClick={() => handleRejectApplication(student.publicKey)}
                >
                  Reject
                </Button>
              </>
            )}
          </Box>
        </CardActions>
      )}
    </Card>
  );
};

function PendingLeaves() {
  const dispatch = useDispatch();
  const [refresh, setRefresh] = useState(0);
  const { user, jwt_token } = useSelector((state) => state.auth);
  const { applications } = useSelector((state) => state.applications);
  const { students } = useSelector((state) => state.students);

  useEffect(() => {
    if (user.isApproved) {
      students &&
        students.map((s) => {
          console.log("geting application for ", s.publicKey);
          dispatch(getApplications(s.publicKey));
        });
    }
  }, [refresh]);

  const refreshApplications = () => {
    dispatch(refreshApplicationState());
    setRefresh(refresh + 1);
  };

  if (!user.isApproved) {
    return (
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
              Your profile needs to be approved first by the system admin before
              you can perform any action!
            </Typography>
          </Box>
        </Paper>
      </Grid>
    );
  }

  return (
    <Grid item xs={12}>
      <Paper
        elevation={4}
        sx={{ p: 2, display: "flex", flexDirection: "column", borderRadius: 3 }}
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
            Pending leaves
          </Typography>
          <Button startIcon={<Refresh />} onClick={refreshApplications}>
            Refresh
          </Button>
        </Box>
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
            {applications &&
              Object.entries(applications).map((appObj, index) => {
                return appObj[1].map((app) => {
                  console.log({ app });
                  const studentInfo = students.filter(
                    (s) => s.publicKey == appObj[0]
                  );
                  console.log({ studentInfo });
                  let studentHostelID = studentInfo.length
                    ? studentInfo[0].hostel.id
                    : 0;
                  let studentDeptID = studentInfo.length
                    ? studentInfo[0].department.id
                    : 0;
                  if (
                    app.academicLeave &&
                    ((user.roles[0] === "HOD" &&
                      user.department?.id === studentDeptID) ||
                      user.roles[0] == "SYSTEM_ADMIN") &&
                    !app.withDrawn
                  ) {
                    if (app.approveLevel === 1) {
                      return (
                        <ApplicationCard
                          key={app.approveLevel + app.reason}
                          application={app}
                          student={studentInfo[0]}
                          system_admin={
                            user.roles[0] == "SYSTEM_ADMIN" ? true : false
                          }
                        />
                      );
                    }
                  } 
                  if (
                    ((user.roles[0] === "LOCAL_GUARDIAN" &&
                      user._id === studentInfo[0].localGuardian.id) ||
                      user.roles[0] == "SYSTEM_ADMIN") &&
                    !app.withDrawn
                  ) {
                    if (app.approveLevel == 1) {
                      return (
                        <ApplicationCard
                          key={app.approveLevel + app.reason}
                          application={app}
                          student={studentInfo[0]}
                          system_admin={
                            user.roles[0] == "SYSTEM_ADMIN" ? true : false
                          }
                        />
                      );
                    }
                  }
                  // if project guide exists then show him the card
                  if (
                    ((user.roles[0] === "PROJECT_GUIDE" &&
                      user._id === studentInfo[0]?.projectGuide?.id) ||
                      user.roles[0] == "SYSTEM_ADMIN") &&
                    !app.withDrawn
                  ) {
                    if (!app.academicLeave && app.approveLevel === 2) {
                      return (
                        <ApplicationCard
                          key={app.approveLevel + app.reason}
                          application={app}
                          student={studentInfo[0]}
                          system_admin={
                            user.roles[0] == "SYSTEM_ADMIN" ? true : false
                          }
                        />
                      );
                    }
                  }
                  
                  // condition to check if admin is HOD of student's dept
                  if (
                    ((user.roles[0] === "HOD" &&
                      user.department?.id === studentDeptID) ||
                      user.roles[0] == "SYSTEM_ADMIN") &&
                    !app.withDrawn && !app.academicLeave
                  ) {
                    // check if project guide exists, if so then approvelevel is 3 for HOD
                    if (
                      studentInfo[0].projectGuide?.id &&
                      app.approveLevel === 3
                    ) {
                      return (
                        <ApplicationCard
                          key={app.approveLevel + app.reason}
                          application={app}
                          student={studentInfo[0]}
                          system_admin={
                            user.roles[0] == "SYSTEM_ADMIN" ? true : false
                          }
                        />
                      );
                      // if project guide doesnot exist, then approvelevel is 2 for HOD
                    } else if (
                      !studentInfo[0].projectGuide?.id &&
                      app.approveLevel === 2
                    ) {
                      return (
                        <ApplicationCard
                          key={app.approveLevel + app.reason}
                          application={app}
                          student={studentInfo[0]}
                          system_admin={
                            user.roles[0] == "SYSTEM_ADMIN" ? true : false
                          }
                        />
                      );
                    }
                  }
                  // check if application requires dsw sign
                  if (
                    ((user.roles[0] === "DSW" && app.dswReq) ||
                      user.roles[0] == "SYSTEM_ADMIN") &&
                    !app.withDrawn
                  ) {
                    // check if project guide exists, if so then approvelevel is 4 for DSW
                    if (
                      studentInfo[0].projectGuide?.id &&
                      app.approveLevel === 4
                    ) {
                      return (
                        <ApplicationCard
                          key={app.approveLevel + app.reason}
                          application={app}
                          student={studentInfo[0]}
                          system_admin={
                            user.roles[0] == "SYSTEM_ADMIN" ? true : false
                          }
                        />
                      );
                      // if project guide doesnot exist, then approvelevel is 3 for DSW
                    } else if (
                      !studentInfo[0].projectGuide?.id &&
                      app.approveLevel === 3
                    ) {
                      return (
                        <ApplicationCard
                          key={app.approveLevel + app.reason}
                          application={app}
                          student={studentInfo[0]}
                          system_admin={
                            user.roles[0] == "SYSTEM_ADMIN" ? true : false
                          }
                        />
                      );
                    }
                  }
                  //checl for warden
                  if (
                    ((user.roles[0] === "WARDEN" &&
                      user.hostel?.id === studentHostelID) ||
                      user.roles[0] == "SYSTEM_ADMIN") &&
                    !app.withDrawn
                  ) {
                    // check if project guide exists and dsw required, if so then approvelevel is 5 for warden
                    if (
                      studentInfo[0].projectGuide?.id &&
                      app.dswReq &&
                      app.approveLevel === 5
                    ) {
                      return (
                        <ApplicationCard
                          key={app.approveLevel + app.reason}
                          application={app}
                          student={studentInfo[0]}
                          system_admin={
                            user.roles[0] == "SYSTEM_ADMIN" ? true : false
                          }
                        />
                      );
                      // if project guide exists but dsw not required, then approvelevel is 4 for Warden
                    } else if (
                      studentInfo[0].projectGuide?.id &&
                      !app.dswReq &&
                      app.approveLevel === 4
                    ) {
                      return (
                        <ApplicationCard
                          key={app.approveLevel + app.reason}
                          application={app}
                          student={studentInfo[0]}
                          system_admin={
                            user.roles[0] == "SYSTEM_ADMIN" ? true : false
                          }
                        />
                      );
                      // if project guide doesnot exist and dsw not required, then approvelevel is 3 for Warden
                    } else if (
                      !studentInfo[0].projectGuide?.id &&
                      !app.dswReq &&
                      app.approveLevel === 3
                    ) {
                      return (
                        <ApplicationCard
                          key={app.approveLevel + app.reason}
                          application={app}
                          student={studentInfo[0]}
                          system_admin={
                            user.roles[0] == "SYSTEM_ADMIN" ? true : false
                          }
                        />
                      );
                    }
                      // if project guide doesnot exist and dsw is required, then approvelevel is 4 for Warden
                    else if (
                      !studentInfo[0].projectGuide?.id &&
                      app.dswReq &&
                      app.approveLevel === 4
                    ) {
                      return (
                        <ApplicationCard
                          key={app.approveLevel + app.reason}
                          application={app}
                          student={studentInfo[0]}
                          system_admin={
                            user.roles[0] == "SYSTEM_ADMIN" ? true : false
                          }
                        />
                      );
                    }
                  }
                });
              })}
          </List>
        </Box>
      </Paper>
    </Grid>
  );
}

export default PendingLeaves;
