import React, { useEffect, useState } from "react";
import {
  List,
  ListItem,
  Divider,
  IconButton,
  Tooltip,
  Avatar,
  Typography,
  Grid,
  Box,
  Paper,
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { ArrowForward, AddOutlined, HelpOutline } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { getHostel } from "../redux/dataSlice";
import { useNavigate } from "react-router-dom";

function Hostels() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [open, setOpen] = useState(false);
  const [hostelName, setHostelName] = useState("");
  const [error, setError] = useState("");

  const { jwt_token } = useSelector((state) => state.auth);
  const { hostels } = useSelector((state) => state.info);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setError("");
    setOpen(false);
  };

  const handleHostelCreate = (e) => {
    console.log({ hostelName });
    if (!hostelName) {
      setError("Please Enter a name!");
    } else {
      fetch(`http://localhost:5000/api/admin/add-hostel`, {
        body: JSON.stringify({ name: hostelName }),
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": jwt_token,
        },
        method: "POST",
      })
        .then(() => {
          setError("");
          setOpen(false);
          dispatch(getHostel())
        })
        .catch((err) => console.log({ err }));
    }
  };

  const handleNavigate = (hostel)=> {
    const {name, _id} = hostel
    const newName = name.split(' ').join('-')
    navigate(`/hostel/${newName}/${_id}`)    
  }

  return (
    <Grid item xs={12}>
      <Paper
        elevation={4}
        sx={{ p: 2, display: "flex", flexDirection: "column", borderRadius: 3 }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600, padding: 2 }}>
          Available Hostels
        </Typography>
        <Divider variant="middle" />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            p: 2,
          }}
        >
          {hostels && hostels.length ? (
            <Grid container spacing={2}>
              {hostels.map((hostel) => (
                <Grid item xs={12} sm={6} lg={4} key={hostel.name}>
                  <Card elevation={2} sx={{minHeight: 200}}>
                    <CardContent>
                      <Typography
                        sx={{ fontWeight: "bold", fontSize: "1.2rem" }}
                      >
                        {hostel.name}
                      </Typography>
                      <Typography>
                        Total Students: {hostel.students.length}
                      </Typography>
                      {hostel.admin && (
                        <Typography>Admin: {hostel.admin.adminName}</Typography>
                      )}
                      <Box sx={{ display: "flex", flexDirection: "row" }}>
                        <Typography sx={{ marginRight: "6px" }}>
                          Status: {hostel.isActive ? "Active" : "Inactive"}
                        </Typography>
                        {!hostel.isActive && (
                          <Tooltip title="Add admin to activate hostel">
                            <HelpOutline />
                          </Tooltip>
                        )}
                      </Box>
                    </CardContent>
                    <CardActions>
                      <Button
                        sx={{ marginLeft: "auto" }}
                        variant="outlined"
                        endIcon={<ArrowForward />}
                        size="small"
                        onClick={()=> handleNavigate(hostel)}
                      >
                        More
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <>
              <Typography align="center">No Data Available...</Typography>
            </>
          )}
          <Box
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button
              variant="outlined"
              color="primary"
              sx={{ mt: 2 }}
              endIcon={<AddOutlined />}
              onClick={handleOpen}
            >
              Add Hostel
            </Button>
          </Box>
        </Box>
      </Paper>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Hostel:</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please Enter the name of the Hostel:
          </DialogContentText>
          <TextField
            autoFocus
            margin="normal"
            id="hostel_name"
            label="Hostel Name"
            type="text"
            fullWidth
            variant="outlined"
            value={hostelName}
            onChange={(e) => setHostelName(e.target.value)}
          />
          <Typography variant="body2" sx={{ fontSize: "0.8rem" }}>
            (This hostel will get activated once a user creates admin profile
            for this hostel and gets approved by the system admin)
          </Typography>
          {error && (
            <Typography
              variant="body2"
              sx={{ fontSize: "0.8rem", color: "red" }}
            >
              {error}
            </Typography>
          )}
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleHostelCreate}
            >
              Add
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </Grid>
  );
}

export default Hostels;
