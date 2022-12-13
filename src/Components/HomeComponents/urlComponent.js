import React, { useState } from "react";
import axios from "axios";
import jwt from "jsonwebtoken";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, TextField, Typography, Grid, Button, Box, AppBar, Toolbar, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import "./home.css";

const UrlComponent = () => {

    const navigate = useNavigate();
    const [addData, setAddData] = useState({
        urlName: "",
        urlLink: "",
    });

    const handleInput = (value) => {
        return setAddData(data => {
            return { ...data, ...value }
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const decodedToken = jwt.decode(localStorage.getItem("token"));
        if (decodedToken.exp * 1000 < Date.now()) {
            navigate("/")
        } else {
            const response = await axios.post("https://node-task5-backend.onrender.com/url/create", addData, {
                headers: {
                    accesstoken: localStorage.getItem("token"),
                },
            });
            if (response) {
                setAddData({
                    urlName: "",
                    urlLink: "",
                });
                navigate("/home");
            }
            setAddData(response.data);
        }
    }

    const handleCancel = () => {
        navigate("/home");
    }

    return (
        <>
            <div id="createUrl">
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
                            <Typography variant="h6" component="div" id="createUrlTypo" sx={{ flexGrow: 1 }}>
                                Add Url
                            </Typography>
                        </Toolbar>
                    </AppBar>
                </Box>
                <Grid container>
                    <Card id="cardCreate">
                        <CardContent>
                            <form onSubmit={handleSubmit}>
                                <Typography id="cardTypo" variant="h4" component="div"> Add Url </Typography> <br />
                                <div>
                                    < TextField id="createUrlNameTextField" type="text" name="email" label="Url Name" placeholder="Enter Url Name"
                                        value={addData.urlName}
                                        onChange={(e) => handleInput({ urlName: e.target.value })}
                                    />
                                </div>
                                <br />
                                <div>
                                    < TextField id="createUrlLinkTextField" type="text" name="time" label="Url Link" placeholder="Paste Url Link"
                                        value={addData.urlLink}
                                        onChange={(e) => handleInput({ urlLink: e.target.value })}
                                    />
                                </div>
                                <br />
                                <Button variant="outlined" id="updateButton" type="submit" onClick={handleCancel}> Cancel </Button> &nbsp;
                                <Button variant="contained" id="createButton" type="submit" onClick={handleSubmit}> Add Url </Button> <br /><br />
                            </form>
                        </CardContent>
                    </Card>
                </Grid>
            </div>
        </>
    )
}

export default UrlComponent;