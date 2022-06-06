import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Box,
  Typography,
  Container,
  Card,
  MenuItem,
  AppBar,
  Snackbar,
  Toolbar,
} from "@mui/material";
import { AssignmentIndOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createAdminProfile, createUserProfile } from "../redux/authSlice";
import {getDepartment, getHostel, getLocalGuardians} from '../redux/dataSlice'


export default function CreateProfile() {
  const [name, setName] = useState("");
  const [studentRoll, setStudentRoll] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [hostel, setHostel] = useState("");
  const [department, setDept] = useState("");
  const [guardian, setGuardian] = useState("");
  const [idProofFile, setIdProofFile] = useState("");
  const [role, setRole] = useState("student");
  const [adminRole, setAdminRole] = useState("");
  const roles = [
    { name: "Head Of Department(HoD)", value: "HOD" },
    { name: "Warden", value: "WARDEN" },
    { name: "Project Guide", value: "PROJECT_GUIDE" },
  ];

  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  
  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { publicKey, jwt_token, isLoggedIn } = useSelector(
    (state) => state.auth
  );

  const { hostels, departments, localGuardians } = useSelector((state) => state.info);

  const handleRoleChange = (e) => {
    setAdminRole(e.target.value);
    console.log(e.target.value);
  };
  // console.log({availableHostels, availableDepts})
  const handleHostelChange = (e) => {
    console.log(e.target.value);
    setHostel(e.target.value);
  };
  const handleDeptChange = (e) => {
    setDept(e.target.value);
  };
  const handleGuardianChange = (e)=> {
    setGuardian(e.target.value)
  }

  const parseHostelData = () => {
    const hostelInfo = hostel.split("&&&");
    const hostelID = hostelInfo[0];
    const hostelName = hostelInfo[1];
    const hostelData = {
      id: hostelID,
      name: hostelName,
    };
    return hostelData;
  };

  const parseDeptData = () => {
    const deptInfo = department.split("&&&");
    const deptID = deptInfo[0];
    const deptName = deptInfo[1];
    const deptData = {
      id: deptID,
      name: deptName,
    };
    return deptData;
  };

  const parseGuardianData = () => {
    const guardianInfo = guardian.split("&&&");
    const guardianID = guardianInfo[0];
    const guardianName = guardianInfo[1];
    const guardianData = {
      id: guardianID,
      name: guardianName,
    };
    return guardianData;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setOpenSnackbar(true)
    const data = new FormData();
    console.log({jwt_token, publicKey})
    if (role === "student") {
      console.log('role', role)
      const hostelData = parseHostelData();
      const deptData = parseDeptData();
      const guardianData = parseGuardianData()
      data.append("name", name);
      data.append("roll", studentRoll);
      data.append("phone", phone);
      data.append("email", email);
      data.append("hostel", JSON.stringify(hostelData));
      data.append("department", JSON.stringify(deptData));
      data.append("localGuardian", JSON.stringify(guardianData));
      data.append("publicKey", publicKey);
      data.append("idProof", idProofFile);
      data.append("jwt_token", jwt_token);
      
      dispatch(createUserProfile(data));
    } else if (adminRole === "HOD" || adminRole === "PROJECT_GUIDE") {
      const deptData = parseDeptData();
      console.log('role', role)
      
      data.append("name", name);
      data.append("phone", phone);
      data.append("email", email);
      data.append("publicKey", publicKey);
      data.append("department", JSON.stringify(deptData));
      data.append("idProof", idProofFile);
      adminRole === "HOD" ? data.append("role", "HOD") : data.append("role", "PROJECT_GUIDE")
      data.append("jwt_token", jwt_token);
      
      //call createAdminProfile for hod/project guide
      dispatch(createAdminProfile(data))
    } else if (adminRole == "WARDEN") {
      const hostelData = parseHostelData();

      data.append("name", name);
      data.append("phone", phone);
      data.append("email", email);
      data.append("hostel", JSON.stringify(hostelData));
      data.append("publicKey", publicKey);
      data.append("role", "WARDEN");
      data.append("idProof", idProofFile);
      data.append("jwt_token", jwt_token);

      dispatch(createAdminProfile(data))
      //call createAdminProfile for warden
    }else if (role === "local_guardian") {
      console.log('role', role)
      data.append("name", name);
      data.append("phone", phone);
      data.append("email", email);
      data.append("publicKey", publicKey);
      data.append("role", "LOCAL_GUARDIAN");
      data.append("idProof", idProofFile);
      data.append("jwt_token", jwt_token);

      dispatch(createAdminProfile(data))
      //call createAdminProfile for local guardian
    }
  };
  useEffect(() => {
    dispatch(getHostel())
    dispatch(getDepartment())
    dispatch(getLocalGuardians(jwt_token))
    if (isLoggedIn) {
      navigate("/dashboard");
    } else if (jwt_token) {
      navigate("/create-profile");
    } else {
      navigate("/");
    }
  }, [isLoggedIn]);

  return (
    <Box
      className="create-profile"
      sx={{
        flexGrow: 1,
        height: "auto",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar sx={{ width: "80%", margin: "0 auto" }}>
          <Typography
            onClick={() => navigate("/")}
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, fontWeight: 600 }}
          >
            Leave Management System
          </Typography>

          <MenuItem>
            <Typography
              variant="h6"
              textAlign="center"
              sx={{ fontWeight: 600 }}
            >
              Help
            </Typography>
          </MenuItem>
          <MenuItem>
            <Typography
              variant="h6"
              textAlign="center"
              sx={{ fontWeight: 600 }}
            >
              About Us
            </Typography>
          </MenuItem>
        </Toolbar>
      </AppBar>

      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "white",
            padding: 5,
            borderRadius: 2,
            margin: 2,
          }}
          elevation={2}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <AssignmentIndOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            Complete your profile
          </Typography>
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="name"
              label="Name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {
              role == "student" && (
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="roll"
                  label="Roll Number"
                  id="roll"
                  value={studentRoll}
                  onChange={(e) => setStudentRoll(e.target.value)}
                />
              )
            }
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="phone"
              label="Phone number"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            {role === "admin" && (
              <>
                <TextField
                  id="select-role"
                  select
                  margin="normal"
                  required
                  fullWidth
                  label="Select Role"
                  onChange={handleRoleChange}
                  variant="outlined"
                  value={adminRole}
                >
                  {roles.map((option) => (
                    <MenuItem key={option.name} value={option.value}>
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>
                {adminRole === "HOD" && (
                  <TextField
                    id="select-dept"
                    select
                    margin="normal"
                    required
                    fullWidth
                    label="Select Department"
                    onChange={handleDeptChange}
                    variant="outlined"
                    value={department}
                  >
                    {departments &&
                      departments.map((option) => (
                        <MenuItem
                          key={option.name}
                          value={`${option._id}&&&${option.name}`}
                        >
                          {option.name}
                        </MenuItem>
                      ))}
                  </TextField>
                )}
                {adminRole === "WARDEN" && (
                  <TextField
                    id="select-hostel"
                    select
                    margin="normal"
                    required
                    fullWidth
                    label="Select Hostel"
                    onChange={handleHostelChange}
                    variant="outlined"
                    value={hostel}
                  >
                    {hostels &&
                      hostels.map((option, index) => (
                        <MenuItem
                          key={index}
                          value={`${option._id}&&&${option.name}`}
                        >
                          {option.name}
                        </MenuItem>
                      ))}
                  </TextField>
                )}
                {
                  adminRole === 'PROJECT_GUIDE' && (
                    <TextField
                    id="select-dept"
                    select
                    margin="normal"
                    required
                    fullWidth
                    label="Select Department"
                    onChange={handleDeptChange}
                    variant="outlined"
                    value={department}
                  >
                    {departments &&
                      departments.map((option) => (
                        <MenuItem
                          key={option.name}
                          value={`${option._id}&&&${option.name}`}
                        >
                          {option.name}
                        </MenuItem>
                      ))}
                  </TextField>
                  )
                }
              </>
            ) }
            {
              role === 'student' && (
              <>
                <TextField
                  id="select-dept"
                  select
                  margin="normal"
                  //required
                  fullWidth
                  label="Select Department"
                  onChange={handleDeptChange}
                  variant="outlined"
                  value={department}
                >
                  {departments &&
                    departments.map((option) => (
                      <MenuItem
                        key={option.name}
                        value={`${option._id}&&&${option.name}`}
                      >
                        {option.name}
                      </MenuItem>
                    ))}
                </TextField>
                <TextField
                  id="select-hostel"
                  select
                  margin="normal"
                  //required
                  fullWidth
                  label="Select Hostel"
                  onChange={handleHostelChange}
                  variant="outlined"
                  value={hostel}
                >
                  {hostels &&
                    hostels.map((option, index) => (
                      <MenuItem
                        key={index}
                        value={`${option._id}&&&${option.name}`}
                      >
                        {option.name}
                      </MenuItem>
                    ))}
                </TextField>

                <TextField
                  id="select-guardian"
                  select
                  margin="normal"
                  //required
                  fullWidth
                  label="Select Local Guardian"
                  onChange={handleGuardianChange}
                  variant="outlined"
                  value={guardian}
                >
                  {localGuardians &&
                    localGuardians.map((option) => (
                      <MenuItem
                        key={option.name}
                        value={`${option._id}&&&${option.name}`}
                      >
                        {option.name} : {option.email}
                      </MenuItem>
                    ))}
                </TextField>
              </>
            )}
            
            <Typography variant="body2">Upload an ID proof (Max file size: 3MB)</Typography>
            <TextField
              name="idProof"
              type="file"
              required
              fullWidth
              onChange={(e) => setIdProofFile(e.target.files[0])}
            />
            <Box textAlign="center">
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 1, paddingLeft: 6, paddingRight: 6 }}
              >
                Submit
              </Button>
            </Box>
            {role !== "student" && (
              <Typography
                sx={{
                  color: "primary.main",
                  textDecoration: "underline",
                  fontSize: 14,
                  cursor:'pointer'
                }}
                onClick={() => setRole("student")}
              >
                Create profile as student?
              </Typography>
            )}
            {role !== "admin" && (
              <Typography
                sx={{
                  color: "primary.main",
                  textDecoration: "underline",
                  fontSize: 14,
                  cursor:'pointer'
                }}
                onClick={() => setRole("admin")}
              >
                Create profile as admin(HoD/ Warden / Project Guide)?
              </Typography>
            )}
            
            {
              role !== "local_guardian" && (
                <Typography
                sx={{
                  color: "primary.main",
                  textDecoration: "underline",
                  fontSize: 14,
                  cursor:'pointer'
                }}
                onClick={() => setRole("local_guardian")}
              >
                Create profile as local guardian?
              </Typography>
              )
            }
          </Box>
        </Card>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
          message="Creating Profile..."
        />
      </Container>
    </Box>
  );
}
