import React, { useState, useEffect } from "react";
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
  TextField,
  Stack,
  Checkbox,
  FormControl,
  FormControlLabel,
  Snackbar,
} from "@mui/material";
import { Send } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { getApplications, applyApplication } from "../redux/applicationSlice";

function ApplyLeave() {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [subject, setSubject] = useState("");
  const [reason, setReason] = useState("");
  const [prefixReason, setPrefixReason] = useState("");
  const [suffixReason, setSuffixReason] = useState("");
  const [prefixDate, setprefixDate] = useState("");
  const [suffixDate, setSuffixDate] = useState("");
  const [isAcademicLeave, setIsAcademicLeave] = useState(false);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const showApplyBtn = useState(true);

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  const dispatch = useDispatch();
  const { departments } = useSelector((state) => state.info);
  const { publicKey, user } = useSelector((state) => state.auth);
  const { applications } = useSelector((state) => state.applications);

  const handleFromChange = (e) => {
    setFromDate(e.target.value);
  };
  const handleToChange = (e) => {
    setToDate(e.target.value);
  };

  const handleApply = (e) => {
    e.preventDefault();
    let dsw_req = false;
    // convert to unix timestamp
    const start_date = new Date(fromDate).getTime() / 1000;
    const end_date = new Date(toDate).getTime() / 1000;

    let prefix_date = new Date(prefixDate).getTime() / 1000;
    let suffix_date = new Date(suffixDate).getTime() / 1000;

    const date1 = new Date(fromDate);
    const date2 = new Date(toDate);
    const diffInMS = Math.abs(date2 - date1);
    const diffInHours = Math.ceil(diffInMS / (1000 * 60 * 60));
    if (diffInHours >= 72) {
      dsw_req = true;
    }
    if(!reason || !subject){
      return alert("Please enter the required fields!")
    }
    if(isNaN(start_date)){
      return alert("Please enter a valid start date")
    }
    if(isNaN(end_date)){
      return alert("Please enter a valid end date")
    }
    if(isNaN(prefix_date)){
      prefix_date = 1;
    }
    if(isNaN(suffix_date)){
      suffix_date = 1;
    }
    if(prefix_date == 1 && prefixReason.length > 0){
      return alert("Please enter a valid reason for prefix date")
    }
    if(suffix_date == 1  && suffixReason.length > 0){
      return alert("Please enter a valid reason for suffix date")
    }
    if(prefix_date > 1 && prefixReason.length < 1){
      return alert("Please enter a valid date for prefix reason")
    }
    if(suffix_date > 1 && suffixReason.length < 1){
      return alert("Please enter a valid date for suffix reason")
    }

    if(end_date < start_date){
      return alert("Please enter a valid start and end date")
    }
    if(prefix_date > 1 && prefix_date > start_date){
      return alert("Please enter a valid start and prefix date")
    }
    if(suffix_date > 1 && suffix_date < end_date){
      return alert("Please enter a valid start and suffix date")
    }
    // let updatedPreReason = prefixReason.length > 0 ? prefixReason : "NULL";
    // let updatedSuffReason = suffixReason.length > 0 ? suffixReason : "NULL";
    console.log({
      subject,
      reason,
      start_date,
      end_date,
      isAcademicLeave,
      dsw_req,
      prefixReason,
      suffixReason,
      prefix_date,
      suffix_date
    });
    dispatch(
      applyApplication({
        subject,
        reason,
        start_date,
        end_date,
        isAcademicLeave,
        dsw_req,
        prefix_date,
        prefixReason,
        suffix_date,
        suffixReason,
      })
    );
    setOpenSnackbar(true);
  };
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
              <Typography variant="h6" sx={{ fontWeight: 600, padding: 2 }}>
                Apply For Leave
              </Typography>
              <Divider variant="middle" />
              <Box
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography variant="body1">
                  Provide the required information:
                </Typography>
                <Box>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="subject"
                    label="Subject (state the reason of applying for leave)"
                    id="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    multiline
                    minRows={3}
                    fullWidth
                    id="desc"
                    label="Give a detailed description of the reason"
                    name="desc"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                  />
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <TextField
                      id="from_date"
                      sx={{ width: "200px", mt: 2 }}
                      label="From"
                      type="date"
                      required
                      defaultValue={fromDate}
                      onChange={handleFromChange}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />

                    <TextField
                      id="to_date"
                      label="To"
                      type="date"
                      required
                      sx={{ width: "200px", mt: 2 }}
                      defaultValue={toDate}
                      onChange={handleToChange}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Box>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="academic leave"
                        value={isAcademicLeave}
                        onChange={() => setIsAcademicLeave(!isAcademicLeave)}
                      />
                    }
                    label="Apply for academic leave"
                  />
                  <br />

                  {/* prefix and suffix */}
                  <Box>
                    <TextField
                      id="prefix"
                      label="Prefix Date"
                      type="date"
                      sx={{ width: "200px", mt: 2 }}
                      defaultValue={prefixDate}
                      onChange={(e) => setprefixDate(e.target.value)}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                    <TextField
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      name="prefixReason"
                      label="Reason for prefix date"
                      id="prefixReason"
                      value={prefixReason}
                      onChange={(e) => setPrefixReason(e.target.value)}
                    />
                    <TextField
                      id="suffix"
                      label="Suffix Date"
                      type="date"
                      sx={{ width: "200px", mt: 2 }}
                      defaultValue={suffixDate}
                      onChange={(e) => setSuffixDate(e.target.value)}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                    <TextField
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      name="suffixReason"
                      label="Reason for suffix date"
                      id="suffixReason"
                      value={suffixReason}
                      onChange={(e) => setSuffixReason(e.target.value)}
                    />
                  </Box>

                  {applications &&
                    Object.keys(applications).length != 0 &&
                    applications[publicKey] &&
                    applications[publicKey].map((app) => {
                      if (
                        app.academicLeave &&
                        !app.withDrawn &&
                        app.approveLevel === 1
                      ) {
                        showApplyBtn[0] = false;
                        return (
                          <Typography sx={{ color: "red", margin: 2 }}>
                            You already have an active leave application. You
                            can only apply for another once the previous
                            application gets approved/rejected!
                          </Typography>
                        );
                      }
                      if (
                        user.projectGuide?.id &&
                        app.dswReq &&
                        !app.withDrawn &&
                        app.approveLevel > 0 &&
                        app.approveLevel < 5
                      ) {
                        showApplyBtn[0] = false;
                        return (
                          <Typography sx={{ color: "red", margin: 2 }}>
                            You already have an active leave application. You
                            can only apply for another once the previous
                            application gets approved/rejected!
                          </Typography>
                        );
                      }
                      if (
                        user.projectGuide?.id &&
                        !app.dswReq &&
                        !app.withDrawn &&
                        !app.academicLeave &&
                        app.approveLevel > 0 &&
                        app.approveLevel < 4
                      ) {
                        showApplyBtn[0] = false;
                        return (
                          <Typography sx={{ color: "red", margin: 2 }}>
                            You already have an active leave application. You
                            can only apply for another once the previous
                            application gets approved/rejected!!!
                          </Typography>
                        );
                      }
                      if (
                        !user.projectGuide?.id &&
                        !app.dswReq &&
                        !app.withDrawn &&
                        !app.academicLeave &&
                        app.approveLevel > 0 &&
                        app.approveLevel < 3
                      ) {
                        showApplyBtn[0] = false;
                        return (
                          <Typography sx={{ color: "red", margin: 2 }}>
                            You already have an active leave application. You
                            can only apply for another once the previous
                            application gets approved/rejected!
                          </Typography>
                        );
                      }
                    })}
                  {!user.isApproved && (
                    <Typography sx={{ color: "red" }}>
                      Your profile needs to be verified first before you can
                      apply for leave
                    </Typography>
                  )}
                  {showApplyBtn[0] && (
                    <Box textAlign="center">
                      <Button
                        type="submit"
                        variant="contained"
                        endIcon={<Send />}
                        disabled={user.isApproved ? false : true}
                        onClick={handleApply}
                        sx={{
                          mt: 3,
                          mb: 1,
                          paddingLeft: 6,
                          paddingRight: 6,
                        }}
                      >
                        Submit
                      </Button>
                    </Box>
                  )}
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Container>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={5000}
          onClose={handleSnackbarClose}
          message="Adding application to blockchain. This might take a minute... Do not re-submit!"
        />
      </Box>
    </Layout>
  );
}

export default ApplyLeave;
