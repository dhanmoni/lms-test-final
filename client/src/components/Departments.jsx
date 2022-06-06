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
import { getDepartment } from "../redux/dataSlice";
import { useNavigate } from "react-router-dom";

function Departments() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [open, setOpen] = useState(false);
  const [deptName, setDeptName] = useState("")
  const [error, setError] = useState("")
  
  const { jwt_token } = useSelector((state) => state.auth);
  const { hostels, departments } = useSelector((state) => state.info);

//   console.log({ departments, user, hostels });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setError("")
    setOpen(false);
  };

  const handleDeptCreate = (e)=> {
      console.log({deptName})
      if(!deptName){
          setError("Please Enter a name!")
      } else {
        fetch(`http://localhost:5000/api/admin/add-department`, {
			body: JSON.stringify({ name: deptName }),
			headers: {
				'Content-Type': 'application/json',
                'x-auth-token': jwt_token
			},
			method: 'POST',
		}).then(()=>{
            setError("")
            setOpen(false)
            dispatch(getDepartment())
        })
        .catch(err=> console.log({err}))
      }
  }

  const handleNavigate = (department)=> {
    const {name, _id} = department
    const newName = name.split(' ').join('-')
    navigate(`/department/${newName}/${_id}`)    
  }


  return (
    <Grid item xs={12}>
      <Paper
        elevation={4}
        sx={{ p: 2, display: "flex", flexDirection: "column", borderRadius: 3 }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600, padding: 2 }}>
          Available Departments
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
          {departments && departments.length ? (
            <Grid container spacing={2}>
              {departments.map((dept) => (
                <Grid item xs={12} sm={6} lg={4} key={dept.name}>
                  <Card elevation={2} sx={{minHeight: 200}}>
                    <CardContent>
                      <Typography
                        sx={{ fontWeight: "bold", fontSize: "1.2rem" }}
                      >
                        {dept.name}
                      </Typography>
                      <Typography>
                        Total Students: {dept.students.length}
                      </Typography>
                      {dept.admin && (
                        <Typography>Admin: {dept.admin.adminName}</Typography>
                      )}
                      <Box sx={{ display: "flex", flexDirection: "row" }}>
                        <Typography sx={{ marginRight: "6px" }}>
                          Status: {dept.isActive ? "Active" : "Inactive"}
                        </Typography>
                        {!dept.isActive && (
                          <Tooltip title="Add admin to activate department">
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
                        onClick={()=> handleNavigate(dept)}
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
              Add Department
            </Button>
          </Box>
        </Box>
      </Paper>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Department:</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please Enter the name of the Department:
          </DialogContentText>
          <TextField
            autoFocus
            margin="normal"
            id="dept_name"
            label="Department Name"
            type="text"
            fullWidth
            variant="outlined"
            value={deptName}
            onChange={(e) => setDeptName(e.target.value)}
          />
            <Typography variant="body2" sx={{fontSize: '0.8rem'}}>
            (This department will get activated once a user creates admin profile for this department and gets approved by the system admin)
            </Typography>
            {
                error && (
                    <Typography variant="body2" sx={{fontSize: '0.8rem', color: 'red'}}>
                        {error}
                    </Typography>
                )
            }
            <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button variant="outlined" color="primary" onClick={handleDeptCreate}>Add</Button>
            </DialogActions>
        </DialogContent>
      </Dialog>
    </Grid>
  );
}

export default Departments;
