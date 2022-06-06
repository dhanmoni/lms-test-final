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
import {
  AccessTimeOutlined,
  CloseRounded,
  DoneRounded,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { getAllAdmins, approveAdmin, rejectAdmin, approveGuideAdmin } from "../redux/adminSlice";


function PendingAdminCard({ admin }) {
  const dispatch = useDispatch();
  const [status, setStatus] = useState("");
  const { user, jwt_token } = useSelector((state) => state.auth);
  const { admins } = useSelector((state) => state.admins);

  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleApproveAdmin = (s) => {
      setOpenSnackbar(true)
    let userData;
    if(s.roles[0] == 'HOD'){
        userData = {
            jwt_token,
            id: s.department.id,
            role: 'HOD',
            publicKey: s.publicKey
          };
        dispatch(approveAdmin(userData))
    } else if(s.roles[0] == 'WARDEN') {
        userData = {
            jwt_token,
            id: s.hostel.id,
            role: 'WARDEN',
            publicKey: s.publicKey
          };
    dispatch(approveAdmin(userData))
        
    } else if(s.roles[0] == 'LOCAL_GUARDIAN') {
      userData = {
        jwt_token,
        role: 'LOCAL_GUARDIAN',
        publicKey: s.publicKey
      };
    dispatch(approveGuideAdmin(userData))
    } else if(s.roles[0] == 'PROJECT_GUIDE') {
      userData = {
        jwt_token,
        role: 'PROJECT_GUIDE',
        publicKey: s.publicKey
      };
    dispatch(approveGuideAdmin(userData))
    } else if(s.roles[0] == 'DSW') {
        userData = {
          jwt_token,
          role: 'DSW',
          publicKey: s.publicKey
        };
      dispatch(approveGuideAdmin(userData))
      } 
    console.log({ userData });
    setStatus('approve')
  };
  const handleRejectAdmin = (s) => {
    const userData = {
      jwt_token,
      publicKey: s.publicKey
    };
    console.log({ userData });
    dispatch(rejectAdmin(userData))
    setStatus('reject')
  };
  return (
    <ListItem
      key={admin.publicKey}
      alignItems="flex-start"
      secondaryAction={
        <Box>
          {status == "approve" ? (
            <Button
              sx={{ fontSize: 12, marginRight: "6px" }}
              color="success"
              edge="end"
              variant="outlined"
              startIcon={<AccessTimeOutlined />}
              //onClick={() => handleApproveAdmin(admin)}
            >
              Approving...
            </Button>
          ) : status == "reject" ? (
            <Button
              sx={{ fontSize: 12 }}
              edge="end"
              variant="outlined"
              color="danger"
              startIcon={<AccessTimeOutlined />}
              //onClick={() => handleRejectAdmin(admin)}
            >
              Rejecting...
            </Button>
          ) : (
            <>
              <Button
                sx={{ fontSize: 12, marginRight: "6px" }}
                color="success"
                edge="end"
                variant="outlined"
                startIcon={<DoneRounded />}
                onClick={() => handleApproveAdmin(admin)}
              >
                Approve
              </Button>
              <Button
                sx={{ fontSize: 12 }}
                edge="end"
                variant="outlined"
                color="danger"
                startIcon={<CloseRounded />}
                onClick={() => handleRejectAdmin(admin)}
              >
                Reject
              </Button>
            </>
          )}
        </Box>
      }
    >
      <ListItemAvatar>
        <Avatar alt="Remy Sharp" />
      </ListItemAvatar>
      <ListItemText
        primary={
          <Typography variant="body2" sx={{ fontWeight: "bold" }}>
            {admin.name}
          </Typography>
        }
        secondary={
          <Box>
           
            <Typography variant="body2" color="text.primary">
              Email: {admin.email}
            </Typography>
            <Typography variant="body2" color="text.primary">
              Phone: {admin.phone}
            </Typography>
            <Typography variant="body2" color="text.primary">
              Role: {admin.roles[0].toLowerCase().replace("_", " ")}
            </Typography>
            {admin.roles[0] === "WARDEN" && (
              <Typography variant="body2" color="text.primary">
                Hostel: {admin.hostel.name}
              </Typography>
            )}
            {(admin.roles[0] === "HOD" ||
              admin.roles[0] === "PROJECT_GUIDE") && (
              <Typography variant="body2" color="text.primary">
                Department: {admin.department.name}
              </Typography>
            )}
            <Button
              sx={{ padding: 0.5, fontSize: "12px", margin: "4px 0" }}
              variant="outlined"
              onClick={() => window.open(admin.idProof)}
            >
              View ID Proof
            </Button>
          </Box>
        }
      />
      <Snackbar
        open={openSnackbar}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
        message="Processing... This might take anywhere between 30 seconds to 5 minutes!"
      />
    </ListItem>
  );
}

export default PendingAdminCard;
