import {
  Box,
  Typography,
  Grid,
  Container,
  Paper,
  Avatar,
  Divider,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  MenuItem,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AdminDashboard from "../components/AdminDashboard";
import StudentDashboard from "../components/StudentDashboard";
import SystemAdminDashboard from "../components/SystemAdminDashboard";
import {
  getDepartment,
  getHostel,
  getProjectGuides,
  addProjectGuide,
} from "../redux/dataSlice";
import {
  getStudentsByHostel,
  getStudentsByDepartment,
  approveStudent,
  rejectStudent,
  getAllStudents,
  getStudentsByLocalGuardian,
  getStudentsByProjectGuide,
  getAllApprovedStudents
} from "../redux/studentsSlice";

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [projectGuide, setProjectGuide] = useState("");
  const { publicKey, jwt_token, user, isLoggedIn } = useSelector(
    (state) => state.auth
  );
  const { projectGuides } = useSelector((state) => state.info);

  useEffect(() => {
    dispatch(getProjectGuides(jwt_token));
    if (user.roles[0] == "WARDEN") {
      dispatch(getStudentsByHostel({ id: user.hostel.id, jwt_token }));
    } else if (user.roles[0] == "HOD") {
      dispatch(getStudentsByDepartment({ id: user.department.id, jwt_token }));
    } else if (user.roles[0] == "SYSTEM_ADMIN") {
      dispatch(getAllStudents({ jwt_token }));
    } else if(user.roles[0] === "LOCAL_GUARDIAN"){
      dispatch(getStudentsByLocalGuardian({ id: user._id, jwt_token }))
    } else if(user.roles[0] === "PROJECT_GUIDE"){
      dispatch(getStudentsByProjectGuide({ id: user._id, jwt_token }))
    } else if(user.roles[0] === "DSW"){
      dispatch(getAllApprovedStudents({jwt_token }))
    }
  }, []);
  

  const handleProjectGuideChange = (e) => {
    setProjectGuide(e.target.value);
  };

  const parseProjectGuideData = () => {
    const projectGuideInfo = projectGuide.split("&&&");
    const projectGuideID = projectGuideInfo[0];
    const projectGuideName = projectGuideInfo[1];
    const projectGuideData = {
      id: projectGuideID,
      name: projectGuideName,
    };
    return projectGuideData;
  };

  const handleProjectGuideUpdate = () => {
    const projectGuideData = parseProjectGuideData();
    console.log("helo", projectGuideData);
    const userData = {
      projectGuide: projectGuideData,
      publicKey,
      jwt_token,
    };
    dispatch(addProjectGuide(userData));
    setOpen(false);
  };

  if (!user) {
    return (
      <Layout>
        <Typography>Loading...</Typography>
      </Layout>
    );
  }

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
            {/* Profile info */}
            <Grid item xs={12} md={12} lg={12}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 3,
                }}
                elevation={4}
              >
                <Typography variant="h6" sx={{ fontWeight: 600, padding: 2 }}>
                  My Profile
                </Typography>
                <Divider variant="middle" />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 2,
                  }}
                >
                  <Avatar
                    sx={{
                      height: "150px",
                      width: "150px",
                      bgcolor: "primary.main",
                      fontSize: 48,
                    }}
                  >
                    {/* {user.name[0]} */}
                  </Avatar>
                  <Typography
                    sx={{ fontWeight: "bold", fontSize: 28, padding: 2 }}
                    noWrap
                  >
                    {user.name}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                    }}
                  >
                    <Typography noWrap>Public Key: {user.publicKey}</Typography>
                    <Typography noWrap>Email: {user.email}</Typography>
                    <Typography noWrap>Phone: {user.phone}</Typography>
                    <Typography noWrap>
                      Profile status: {user.isApproved ? "Approved" : "Pending"}
                    </Typography>
                    {user.roles[0] == "STUDENT" ? (
                      <>
                      <Typography noWrap>
                          Roll: {user.roll}
                        </Typography>
                        <Typography noWrap>
                          Department: {user.department.name}
                        </Typography>
                        <Typography noWrap>
                          Hostel: {user.hostel.name}
                        </Typography>
                        <Typography noWrap>
                          Local Guardian: {user.localGuardian.name}
                        </Typography>
                        {user.projectGuide?.id  && (
                            <Typography noWrap>
                              Project Guide: {user.projectGuide.name}
                            </Typography>
                        ) }
                          <Button
                            onClick={() => setOpen(true)}
                            variant="outlined"
                            sx={{
                              fontSize: "10px",
                              marginTop: "10px",
                              padding: "4px",
                              maxWidth: "20%",
                            }}
                          >
                            Add/Change Project Guide
                          </Button>
                      </>
                    ) : user.roles[0] == "HOD" ? (
                      <>
                        <Typography noWrap>Role: Admin (HoD)</Typography>
                        <Typography noWrap>
                          Department: {user.department.name}
                        </Typography>
                      </>
                    ) : user.roles[0] == "WARDEN" ? (
                      <>
                        <Typography noWrap>Role: Admin (Warden)</Typography>
                        <Typography noWrap>
                          Hostel: {user.hostel.name}
                        </Typography>
                      </>
                    ) : user.roles[0] == "LOCAL_GUARDIAN" ? (
                      <>
                        <Typography noWrap>
                          Role: Admin (Local Guardian)
                        </Typography>
                      </>
                    ) : user.roles[0] == "PROJECT_GUIDE" ? (
                      <>
                        <Typography noWrap>
                          Role: Admin (Project Guide)
                        </Typography>
                        <Typography noWrap>
                          Department: {user.department.name}
                        </Typography>
                      </>
                    ) : user.roles[0] == "DSW" ? (
                      <>
                        <Typography noWrap>Role: DSW</Typography>
                      </>
                    ) : (
                      <>
                        <Typography noWrap>Role: System Admin</Typography>
                      </>
                    )
                  }
                  </Box>
                </Box>
              </Paper>
            </Grid>

            {user.roles[0] == "STUDENT" ? (
              <StudentDashboard />
            ) : user.roles[0] == "SYSTEM_ADMIN" ? (
              <SystemAdminDashboard />
            ) : (
              <AdminDashboard />
            )}
          </Grid>
        </Container>
      </Box>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add/Change Project Guide:</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Select a project guide from the dropdown.
          </DialogContentText>
          <TextField
            id="select-project-guide"
            select
            margin="normal"
            //required
            fullWidth
            label="Select Project Guide"
            onChange={handleProjectGuideChange}
            variant="outlined"
            value={projectGuide}
          >
            {projectGuides &&
              projectGuides.map((option) => (
                <MenuItem
                  style={{ whiteSpace: "normal" }}
                  key={option.name}
                  value={`${option._id}&&&${option.name}`}
                >
                  <>
                    <Typography>
                      {option.name} : {option.email} :
                    </Typography>
                    <Typography>
                      {" "}
                      Department: {option.department.name}
                    </Typography>
                  </>
                </MenuItem>
              ))}
          </TextField>
          <Typography variant="body2" sx={{ fontSize: "0.8rem" }}>
            (Your profile will be inactivated until your HOD or system admin
            approves the update!)
          </Typography>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleProjectGuideUpdate}
            >
              Add
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </Layout>
  );
}

export default Dashboard;
