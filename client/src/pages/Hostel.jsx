import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";

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
  ListItemAvatar
} from "@mui/material";

import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ArrowBack, HelpOutline } from "@mui/icons-material";

function Hostel() {
  const { name, id } = useParams();
  const navigate = useNavigate();
  const { hostels } = useSelector((state) => state.info);
  const [currentHostel, setCurrentHostel] = useState(null);
  const [error, setError] = useState(false);
  useEffect(() => {
    console.log({ id });
    if (id) {
      //console.log('exists')
      hostels.map((hostel) => {
        if (hostel._id == id) {
          setCurrentHostel(hostel);
        }
      });
    } else {
      setError(true);
    }
  }, []);
  const handleUserNavigate = (student)=> {
    const {studentName, studentId} = student
    const newName = studentName.split(' ').join('-')
    navigate(`/user/${newName}/${studentId}`)     
  }

  if (error) {
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
            <Grid item xs={12} md={12} lg={12}>
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
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 600, padding: 2 }}>
                    This page doesnot exists!
                  </Typography>
                  <Button
                    variant="outlined"
                    color="primary"
                    sx={{ mt: 2 }}
                    endIcon={<ArrowBack />}
                    onClick={() => navigate("/dashboard")}
                  >
                    Go Back
                  </Button>
                </Box>
              </Paper>
            </Grid>
          </Container>
        </Box>
      </Layout>
    );
  }
  if (currentHostel) {
    const { name, students, admin, isActive } = currentHostel;
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
              {/* Hostel info card*/}
            <Grid item xs={12} md={12} lg={12}>
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
                  Hostel Info
                </Typography>
                <Divider variant="middle" />
                <Box
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                    {name}
                  </Typography>
                  <Typography>Total Students: {students.length}</Typography>
                  {admin && <Typography>Admin: {admin.adminName}</Typography>}
                  <Box sx={{ display: "flex", flexDirection: "row" }}>
                    <Typography sx={{ marginRight: "6px" }}>
                      Status: {isActive ? "Active" : "Inactive"}
                    </Typography>
                    {!isActive && (
                      <Tooltip title="Add admin to activate hostel">
                        <HelpOutline />
                      </Tooltip>
                    )}
                  </Box>
                </Box>
              </Paper>
            </Grid>

            {/* Show students of the hostel*/}
            <Grid item xs={12} md={12} lg={12}>
      <Paper
        elevation={4}
        sx={{ p: 2, display: "flex", flexDirection: "column", borderRadius: 3 }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600, padding: 2 }}>
          Students
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
            {students && students.length ? (
              <>
                {students.map((student) => {
                  return  (
                    <>
                      <ListItem
                      onClick={()=> handleUserNavigate(student)}
                      >
                        <ListItemAvatar>
                          <Avatar alt="Remy Sharp" />
                        </ListItemAvatar>
                        <ListItemText >
                            <Typography sx={{ fontWeight: "bold", }}>
                                {student.studentName}
                            </Typography>
                        </ListItemText>
                      </ListItem>
                      <Divider variant="inset" component="li" />
                    </>
                  ) 
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
    </Grid>
          </Container>
        </Box>
      </Layout>
    );
  }
}

export default Hostel;
