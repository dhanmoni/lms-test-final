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
  Snackbar
} from "@mui/material";
import { CloseRounded, DoneRounded } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  approveProfileUpdate
} from "../redux/adminSlice";
import { Link, useNavigate } from "react-router-dom";


function PendingProfileUpdate() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [status, setStatus] = useState('')
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };
  const { user, jwt_token } = useSelector((state) => state.auth);
  const { students } = useSelector((state) => state.students);

  const handleApproveStudent = (s) => {
    setOpenSnackbar(true)
    const userData = {
      jwt_token,
      publicKey: s.publicKey,
      projectGuideId: s.projectGuide.id
    };
    console.log({ userData });
    dispatch(approveProfileUpdate(userData))
    setStatus('approve')
  };
  const handleRejectStudent = (s) => {
    // setOpenSnackbar(true)
    // const userData = {
    //   jwt_token,
    //   publicKey: s.publicKey
    // };
    // console.log({ userData });
    // dispatch(rejectStudent(userData))
    // setStatus('reject')
  };
  
  return (
    <Grid item xs={12}>
      <Paper
        elevation={4}
        sx={{ p: 2, display: "flex", flexDirection: "column", borderRadius: 3 }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600, padding: 2 }}>
          Pending Profile Update
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
            {(students && students.length) ? (
              <>
                {students.map((student) => {
                  console.log('pending students', student)
                  return (!student.isApproved && student.email && student.projectGuide?.id) && (
                    <>
                      <ListItem
                      key={student.publicKey}
                        alignItems="flex-start"
                        secondaryAction={
                          <Box>
                            {status == 'approve' ? (
                              <Button
                                sx={{ fontSize: 12, marginRight: "6px" }}
                                color="success"
                                edge="end"
                                variant="outlined"
                                startIcon={<DoneRounded />}
                                //onClick={() => handleApproveStudent(student)}
                              >
                                Approved
                              </Button>
                            ) : status == 'reject' ? (
                              <Button
                                  sx={{ fontSize: 12 }}
                                  edge="end"
                                  variant="outlined"
                                  color="danger"
                                  startIcon={<CloseRounded />}
                                  //onClick={() => handleRejectStudent(student)}
                                >
                                  Rejected
                                </Button>
                            ) : (
                              <>
                                <Button
                                  sx={{ fontSize: 12, marginRight: "6px" }}
                                  color="success"
                                  edge="end"
                                  variant="outlined"
                                  startIcon={<DoneRounded />}
                                  onClick={() => handleApproveStudent(student)}
                                >
                                  Approve
                                </Button>
                                <Button
                                  sx={{ fontSize: 12 }}
                                  edge="end"
                                  variant="outlined"
                                  color="danger"
                                  startIcon={<CloseRounded />}
                                  onClick={() => handleRejectStudent(student)}
                                >
                                  Reject
                                </Button>
                              </>
                            )
                          }
                          </Box>
                        }
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
                              <Typography variant="body2" color="text.primary">
                                Local Guardian: {student.localGuardian.name}
                              </Typography>
                              {
                                student.projectGuide?.id ? (
                                  <Typography variant="body2" color="text.primary">
                                  Project Guide: {student.projectGuide?.name}
                                </Typography>
                                ) : null
                              }
                              <Button
                                sx = {{padding:0.5, fontSize:'12px', margin:'4px 0'}} 
                                variant="outlined"
                                onClick={()=> window.open(student.idProof) }
                                >
                                View ID Proof
                              </Button>
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
      <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
          message="Processing Request..."
        />
    </Grid>
  );
}

export default PendingProfileUpdate;
