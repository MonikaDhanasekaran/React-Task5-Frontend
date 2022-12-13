import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { Typography, TextField, Button, Card, CardContent, Grid } from '@mui/material';
import "./Auth.css";
import LoginRoundedIcon from '@mui/icons-material/Login';

const LoginComponent = () => {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleSubmit = async (e) => {
        if (formData.email === "" && formData.password === "") {
            alert("Please fill all Values!!!")
        }
        else {
            e.preventDefault();
            try {
                const response = await axios.post("https://node-task5-backend.onrender.com/urlShortener/signin", {
                    ...formData,
                });
                if (response) {
                    localStorage.setItem("token", response.data.Token);
                    navigate("/home");
                }
                console.log(response);
            }
            catch (err) {
                console.log(err);
            }
        }
    }

    return (
        <div id="loginPage">
            <Grid container>
                <Card id="cardLogin">
                    <CardContent>
                        <LoginRoundedIcon sx={{ fontSize: 50 }} color="success" />
                        <Typography id="loginTypo" variant="h4" component="div"> Login </Typography> <br /> <br />
                        <div>
                            < TextField type="text" name="email" label="Email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                        </div>
                        <br />
                        <div>
                            <TextField label="Password" type="password" name="password" value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                        </div>
                        <br />
                        <Button variant="contained" id="loginButton" type="submit" onClick={handleSubmit}> Sign in </Button> <br /><br />
                        Don't have an account? <Link to="/signup">Sign Up</Link> <br /><br />
                        <Link to="/forgotpassword">forgot password?</Link>
                    </CardContent>
                </Card>
            </Grid>
        </div>
    )
}

export default LoginComponent;