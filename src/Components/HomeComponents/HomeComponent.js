import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt from "jsonwebtoken";
import { useNavigate, Link } from "react-router-dom";
import { AppBar, Box, Toolbar, IconButton, Typography, Button, Card, CardContent, Grid } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ModeIcon from "@mui/icons-material/Mode";
import LogoutIcon from '@mui/icons-material/Logout';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import "./home.css";
import { red } from "@mui/material/colors";

const HomeComponent = () => {

    const navigate = useNavigate();
    const [url, setUrl] = useState({
        urlName: "",
        urlLink: "",
    });

    useEffect(() => {
        getUrl();
    }, []);

    const getUrl = async () => {
        const decodedToken = jwt.decode(localStorage.getItem("token"));
        if (decodedToken.exp * 1000 < Date.now()) {
            navigate("/")
        } else {
            const response = await axios.get("https://node-task5-backend.onrender.com/url/get", {
                headers: {
                    accesstoken: localStorage.getItem("token"),
                },
            });
            setUrl(response.data);
        }
    }

    const handleDelete = async (dataID) => {
        try {
            const response = await axios.delete(`https://node-task5-backend.onrender.com/url/delete/${dataID}`, {
                headers: {
                    accesstoken: localStorage.getItem("token"),
                },
            });
            if (response) {
                getUrl();
            }
        } catch (error) {
            console.log("Error:", error);
        }
    }

    const handleAdd = () => {
        navigate("/url");
    }

    const handleLogout = () => {
        navigate("/");
    }

    return (
        <>
        <div id="homeDiv">
        <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" id="myUrlTypo" component="div" sx={{ flexGrow: 1 }}>
                            My Url Shortener
                        </Typography>
                        <Button color="inherit" onClick={handleAdd} id="urlButton"><AddIcon />Add Url</Button>
                        <Button color="inherit" onClick={handleLogout} id="urlButton"><LogoutIcon />Logout</Button>
                    </Toolbar>
                </AppBar>
            </Box>
            <Grid>
                <Grid container spacing={2} id="gridUrl">
                    {url.length && url.map((row, index) => (
                        <Grid item key={index}>
                            <Card id="cardUrl">
                                <CardContent>
                                    <Typography gutterBottom variant="h6" component="div" id="urlTypography">
                                        {row.urlName}
                                    </Typography>
                                    <a href={row.urlLink} target="_blank"> {row.urlLink} </a> <br /> <br />
                                    <Link className="btn btn-link" id="editLink" to={`/update/${row._id}`}><ModeIcon sx={{ fontSize: "14px" }}/>Edit</Link> &nbsp;
                                    <button className="btn btn-link" id="deleteButton" onClick={() => handleDelete(row._id)}><DeleteIcon sx={{ fontSize: "16px", color: red[500] }}/>Delete</button>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </div>
        </>
    )
}

export default HomeComponent;