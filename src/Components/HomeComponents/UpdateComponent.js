import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, TextField, Typography, Grid, Button } from "@mui/material";
import "./home.css";

const UpdateComponent = () => {

    const navigate = useNavigate();
    const params = useParams();
    const dataID = params.dataID.toString();
    const [updateData, setUpdateData] = useState({
        urlName: "",
        urlLink: "",
    });

    useEffect(() => {
        axios.get(`https://node-task5-backend.onrender.com/url/getone/${dataID}`, {
            headers: {
                accesstoken: localStorage.getItem("token"),
            },
        }).then((response) => {
            setUpdateData(response.data);
        }).catch(error => {
            console.log("Error:", error);
        })
    }, [dataID]);

    const handleInput = (value) => {
        return setUpdateData(data => {
            return {
                ...data, ...value
            }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`https://node-task5-backend.onrender.com/url/update/${dataID}`, updateData, {
                headers: {
                    accesstoken: localStorage.getItem("token"),
                },
            });
            if (response) {
                setUpdateData({
                    urlName: "",
                    urlLink: "",
                });
                navigate("/home");
            }
        } catch (error) {
            console.log("Error:", error);
        }
    }

    const handleCancel = () => {
        navigate("/home")
    }

    return (
        <>
            <div id="UpdatePage">
                <Grid container>
                    <Card id="cardUpdate">
                        <CardContent>
                            <form onSubmit={handleSubmit}>
                                <Typography id="updateTypo" variant="h4" component="div"> Update Url </Typography> <br />
                                <div>
                                    < TextField id="updateUrlNameTextField" type="text" name="urlName" label="Url Name"
                                        value={updateData.urlName}
                                        onChange={(e) => handleInput({ urlName: e.target.value })}
                                    />
                                </div>
                                <br />
                                <div>
                                    < TextField id="updateUrlLinkTextField" type="text" name="urlLink" label="Url Link"
                                        value={updateData.urlLink}
                                        onChange={(e) => handleInput({ urlLink: e.target.value })}
                                    />
                                </div>
                                <br />
                                <Button variant="outlined" id="updateButton" type="submit" onClick={handleCancel}> Cancel </Button> &nbsp;
                                <Button variant="outlined" id="updateButton" type="submit"> Update </Button> <br /> <br />
                            </form>
                        </CardContent>
                    </Card>
                </Grid>
            </div>
        </>
    )
}

export default UpdateComponent;
