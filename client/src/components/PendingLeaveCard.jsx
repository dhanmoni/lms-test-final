import React, { useEffect, useState } from "react";
import {
  Typography,
  Grid,
  Box,
  Paper,
  Button,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
} from "@mui/material";
import { CancelScheduleSend } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { withdrawApplication } from "../redux/applicationSlice";

const PendingLeaveCard = ({ application, user, showWitdrawBtn }) => {
  const dispatch = useDispatch();
  let {
    subject,
    reason,
    startDate,
    endDate,
    approveLevel,
    approvels,
    dswReq,
    academicLeave,
    prefixDate,
    suffixDate,
    prefixReason,
    suffixReason,
  } = application;
  const s_date = new Date(startDate * 1000).toLocaleDateString("en-GB");
  const e_date = new Date(endDate * 1000).toLocaleDateString("en-GB");
  const [open, setOpen] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  console.log({ prefixDate, suffixDate });
  let pre_date;
  let suff_date;
  if (prefixDate > 1) {
    pre_date = new Date(prefixDate * 1000).toLocaleDateString("en-GB");
  }
  if (suffixDate > 1) {
    suff_date = new Date(suffixDate * 1000).toLocaleDateString("en-GB");
  }
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };
  const handleWithDraw = () => {
    setOpenSnackbar(true);
    dispatch(withdrawApplication(user.publicKey));
    setOpen(false);
  };

  let steps;
  if (academicLeave) {
    steps = [
      {
        label: (
          <Typography sx={{ fontWeight: "bold", color: "green" }}>
            Application Submitted
          </Typography>
        ),
      },
      {
        label:
          approveLevel == 2 ? (
            <Typography sx={{ fontWeight: "bold", color: "green" }}>
              Approved by HoD
            </Typography>
          ) : approveLevel == 0 && approvels.length == 1 ? (
            <Typography sx={{ fontWeight: "bold", color: "red" }}>
              Rejected by HoD
            </Typography>
          ) : (
            "Approval by HoD"
          ),
      },
    ];
  } else if (!dswReq && !user.projectGuide.id) {
    steps = [
      {
        label: (
          <Typography sx={{ fontWeight: "bold", color: "green" }}>
            Application Submitted
          </Typography>
        ),
      },
      {
        label:
          approveLevel == 2 || approveLevel == 3 || approveLevel == 4 ? (
            <Typography sx={{ fontWeight: "bold", color: "green" }}>
              Approved by Local Guardian
            </Typography>
          ) : approveLevel == 0 && approvels.length == 1 ? (
            <Typography sx={{ fontWeight: "bold", color: "red" }}>
              Rejected by Local Guardian
            </Typography>
          ) : approveLevel == 0 && approvels.length > 1 ? (
            <Typography sx={{ fontWeight: "bold", color: "green" }}>
              Approved by Local Guardian
            </Typography>
          ) : (
            "Approval by Local Guardian"
          ),
      },
      {
        label:
          approveLevel == 3 ||
          approveLevel == 4 ||
          (approveLevel == 0 && approvels.length > 2) ? (
            <Typography sx={{ fontWeight: "bold", color: "green" }}>
              Approved by HoD
            </Typography>
          ) : approveLevel == 0 && approvels.length == 2 ? (
            <Typography sx={{ fontWeight: "bold", color: "red" }}>
              Rejected by HoD
            </Typography>
          ) : (
            "Approval by HoD"
          ),
      },
      {
        label:
          approveLevel == 4 || (approveLevel == 0 && approvels.length > 3) ? (
            <Typography sx={{ fontWeight: "bold", color: "green" }}>
              Approved by Warden
            </Typography>
          ) : approveLevel == 0 && approvels.length == 3 ? (
            <Typography sx={{ fontWeight: "bold", color: "red" }}>
              Rejected by Warden
            </Typography>
          ) : (
            "Approval by Warden"
          ),
      },
    ];
  } else if (!dswReq && user.projectGuide.id) {
    steps = [
      {
        label: (
          <Typography sx={{ fontWeight: "bold", color: "green" }}>
            Application Submitted
          </Typography>
        ),
      },
      {
        label:
          approveLevel == 2 ||
          approveLevel == 3 ||
          approveLevel == 4 ||
          approveLevel == 5 ? (
            <Typography sx={{ fontWeight: "bold", color: "green" }}>
              Approved by Local Guardian
            </Typography>
          ) : approveLevel == 0 && approvels.length == 1 ? (
            <Typography sx={{ fontWeight: "bold", color: "red" }}>
              Rejected by Local Guardian
            </Typography>
          ) : approveLevel == 0 && approvels.length > 1 ? (
            <Typography sx={{ fontWeight: "bold", color: "green" }}>
              Approved by Local Guardian
            </Typography>
          ) : (
            "Approval by Local Guardian"
          ),
      },
      {
        label:
          approveLevel == 3 ||
          approveLevel == 4 ||
          approveLevel == 5 ||
          (approveLevel == 0 && approvels.length > 2) ? (
            <Typography sx={{ fontWeight: "bold", color: "green" }}>
              Approved by Project Guide
            </Typography>
          ) : approveLevel == 0 && approvels.length == 2 ? (
            <Typography sx={{ fontWeight: "bold", color: "red" }}>
              Rejected by Project Guide
            </Typography>
          ) : (
            "Approval by Project Guide"
          ),
      },
      {
        label:
          approveLevel == 4 ||
          approveLevel == 5 ||
          (approveLevel == 0 && approvels.length > 3) ? (
            <Typography sx={{ fontWeight: "bold", color: "green" }}>
              Approved by HoD
            </Typography>
          ) : approveLevel == 0 && approvels.length == 3 ? (
            <Typography sx={{ fontWeight: "bold", color: "red" }}>
              Rejected by HoD
            </Typography>
          ) : (
            "Approval by HoD"
          ),
      },
      {
        label:
          approveLevel == 5 || (approveLevel == 0 && approvels.length > 4) ? (
            <Typography sx={{ fontWeight: "bold", color: "green" }}>
              Approved by Warden
            </Typography>
          ) : approveLevel == 0 && approvels.length == 4 ? (
            <Typography sx={{ fontWeight: "bold", color: "red" }}>
              Rejected by Warden
            </Typography>
          ) : (
            "Approval by Warden"
          ),
      },
    ];
  } else if (dswReq && user.projectGuide?.id) {
    steps = [
      {
        label: (
          <Typography sx={{ fontWeight: "bold", color: "green" }}>
            Application Submitted
          </Typography>
        ),
      },
      {
        label:
          approveLevel == 2 ||
          approveLevel == 3 ||
          approveLevel == 4 ||
          approveLevel == 5 ||
          approveLevel == 6 ? (
            <Typography sx={{ fontWeight: "bold", color: "green" }}>
              Approved by Local Guardian
            </Typography>
          ) : approveLevel == 0 && approvels.length == 1 ? (
            <Typography sx={{ fontWeight: "bold", color: "red" }}>
              Rejected by Local Guardian
            </Typography>
          ) : approveLevel == 0 && approvels.length > 1 ? (
            <Typography sx={{ fontWeight: "bold", color: "green" }}>
              Approved by Local Guardian
            </Typography>
          ) : (
            "Approval by Local Guardian"
          ),
      },
      {
        label:
          approveLevel == 3 ||
          approveLevel == 4 ||
          approveLevel == 5 ||
          approveLevel == 6 ||
          (approveLevel == 0 && approvels.length > 2) ? (
            <Typography sx={{ fontWeight: "bold", color: "green" }}>
              Approved by Project Guide
            </Typography>
          ) : approveLevel == 0 && approvels.length == 2 ? (
            <Typography sx={{ fontWeight: "bold", color: "red" }}>
              Rejected by Project Guide
            </Typography>
          ) : (
            "Approval by Project Guide"
          ),
      },
      {
        label:
          approveLevel == 4 ||
          approveLevel == 5 ||
          approveLevel == 6 ||
          (approveLevel == 0 && approvels.length > 3) ? (
            <Typography sx={{ fontWeight: "bold", color: "green" }}>
              Approved by HoD
            </Typography>
          ) : approveLevel == 0 && approvels.length == 3 ? (
            <Typography sx={{ fontWeight: "bold", color: "red" }}>
              Rejected by HoD
            </Typography>
          ) : (
            "Approval by HoD"
          ),
      },
      {
        label:
          approveLevel == 5 || approveLevel == 6 || (approveLevel == 0 && approvels.length > 4) ? (
            <Typography sx={{ fontWeight: "bold", color: "green" }}>
              Approved by DSW
            </Typography>
          ) : approveLevel == 0 && approvels.length == 4 ? (
            <Typography sx={{ fontWeight: "bold", color: "red" }}>
              Rejected by DSW
            </Typography>
          ) : (
            "Approval by DSW"
          ),
      },
      {
        label:
          approveLevel == 6 || (approveLevel == 0 && approvels.length > 5) ? (
            <Typography sx={{ fontWeight: "bold", color: "green" }}>
              Approved by Warden
            </Typography>
          ) : approveLevel == 0 && approvels.length == 5 ? (
            <Typography sx={{ fontWeight: "bold", color: "red" }}>
              Rejected by Warden
            </Typography>
          ) : (
            "Approval by Warden"
          ),
      },
    ];
  } else if (dswReq && !user.projectGuide?.id) {
    steps = [
      {
        label: (
          <Typography sx={{ fontWeight: "bold", color: "green" }}>
            Application Submitted
          </Typography>
        ),
      },
      {
        label:
          approveLevel == 2 || approveLevel == 3 || approveLevel == 4 ? (
            <Typography sx={{ fontWeight: "bold", color: "green" }}>
              Approved by Local Guardian
            </Typography>
          ) : approveLevel == 0 && approvels.length == 1 ? (
            <Typography sx={{ fontWeight: "bold", color: "red" }}>
              Rejected by Local Guardian
            </Typography>
          ) : approveLevel == 0 && approvels.length > 1 ? (
            <Typography sx={{ fontWeight: "bold", color: "green" }}>
              Approved by Local Guardian
            </Typography>
          ) : (
            "Approval by Local Guardian"
          ),
      },
      {
        label:
          approveLevel == 3 ||
          approveLevel == 4 ||
          approveLevel == 5 ||
          (approveLevel == 0 && approvels.length > 2) ? (
            <Typography sx={{ fontWeight: "bold", color: "green" }}>
              Approved by HoD
            </Typography>
          ) : approveLevel == 0 && approvels.length == 2 ? (
            <Typography sx={{ fontWeight: "bold", color: "red" }}>
              Rejected by HoD
            </Typography>
          ) : (
            "Approval by HoD"
          ),
      },
      {
        label:
          approveLevel == 4 ||
          approveLevel == 5 ||
          (approveLevel == 0 && approvels.length > 3) ? (
            <Typography sx={{ fontWeight: "bold", color: "green" }}>
              Approved by DSW
            </Typography>
          ) : approveLevel == 0 && approvels.length == 3 ? (
            <Typography sx={{ fontWeight: "bold", color: "red" }}>
              Rejected by DSW
            </Typography>
          ) : (
            "Approval by DSW"
          ),
      },
      {
        label:
          approveLevel == 5 || (approveLevel == 0 && approvels.length > 4) ? (
            <Typography sx={{ fontWeight: "bold", color: "green" }}>
              Approved by Warden
            </Typography>
          ) : approveLevel == 0 && approvels.length == 4 ? (
            <Typography sx={{ fontWeight: "bold", color: "red" }}>
              Rejected by Warden
            </Typography>
          ) : (
            "Approval by Warden"
          ),
      },
    ];
  }

  return (
    <Card sx={{ margin: 2 }} spacing={2} elevation={4}>
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
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "flex-start",
          }}
        >
          <Typography sx={{ marginRight: 2 }}>Status:</Typography>
          <Stepper activeStep={approvels.length} orientation="vertical">
            {steps.map((step, index) => (
              <Step key={step.label}>
                <StepLabel>{step.label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
      </CardContent>
      <CardActions>
        {showWitdrawBtn && (
          <Button
            variant="outlined"
            color="danger"
            startIcon={<CancelScheduleSend />}
            onClick={() => setOpen(true)}
          >
            Withdraw
          </Button>
        )}
      </CardActions>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Withdraw leave application?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to withdraw this leave application? This
            cannot be undone!
          </DialogContentText>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="outlined" color="danger" onClick={handleWithDraw}>
              Withdraw
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
        message="Withdrawing... This might take anywhere between 30 seconds to 5 minutes... Do not re-withdraw!"
      />
    </Card>
  );
};

export default PendingLeaveCard;
