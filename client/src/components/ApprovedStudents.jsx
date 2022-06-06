import React, { useEffect } from "react";
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
import { CloseRounded, DoneRounded } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";


function ApprovedStudents() {
  const dispatch = useDispatch();
  const { user, jwt_token } = useSelector((state) => state.auth);
  const { students } = useSelector((state) => state.students);

  // useEffect(() => {
  //   if (user.roles[0] === "WARDEN") {
  //     dispatch(getStudentsByHostel({ id: user.hostel.id, jwt_token }));
  //   } else if (user.roles[0] === "HOD") {
  //     dispatch(getStudentsByDepartment({ id: user.department.id, jwt_token }));
  //   } else if(user.roles[0] === "LOCAL_GUARDIAN"){
  //     dispatch(getStudentsByLocalGuardian({ id: user._id, jwt_token }))
  //   } else if(user.roles[0] === "PROJECT_GUIDE"){
  //     dispatch(getStudentsByProjectGuide({ id: user._id, jwt_token }))
  //   }
  // }, []);

  return (
    <Grid item xs={12}>
      <Paper
        elevation={4}
        sx={{ p: 2, display: "flex", flexDirection: "column", borderRadius: 3 }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600, padding: 2 }}>
          Approved Students
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
                  return student.isApproved && (
                    <>
                      <ListItem
                        alignItems="flex-start"
                      >
                        <ListItemAvatar>
                          <Avatar alt="Remy Sharp" />
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Typography
                              variant="body2"
                              sx={{ fontWeight: "bold" }}
                            >
                              {student.name}
                            </Typography>
                          }
                          secondary={
                            <Box>
                              <Typography variant="body2" color="text.primary">
                                Department: {student.department.name}
                              </Typography>
                              <Typography variant="body2" color="text.primary">
                                Hostel: {student.hostel.name}
                              </Typography>
                              <Typography variant="body2" color="text.primary">
                                Email: {student.email}
                              </Typography>
                              <Typography variant="body2" color="text.primary">
                                Phone: {student.phone}
                              </Typography>
                              <Typography variant="body2" color="text.primary">
                                Roll: {student.roll}
                              </Typography>
                            </Box>
                          }
                        />
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
  );
}

export default ApprovedStudents;
