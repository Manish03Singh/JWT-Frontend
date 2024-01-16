import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { expireAge, mainPage, } from "../links";

const SecretPage = () => {
    console.log('scretpage component is called')
    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies([]);
    const [timeRemaining, setTimeRemaining] = useState(-1);

    // const changeTime = async () => {
    //     setInterval(() => {
    //         // if(timeRemaining <= 0)
    //         //     clearInterval();
    //         //console.log(timeRemaining)
    //         let value = timeRemaining;
    //         setTimeRemaining(value-1);
    //     }, 1000);
    // }

    const verifyUser = async () => {
        if(timeRemaining !== -1)
            return;
        if (!cookies.jwt) {
            navigate("/login");
        } else {
            const { data } = await axios.post(
                mainPage,
                {},
                {
                    withCredentials: true,
                }
            );
            if (!data.status) {
                removeCookie("jwt");
                navigate("/login");
            } else {
                // var loginDate = new Date(data.time);
                // loginDate = loginDate.getTime()
                // setTimeRemaining(Math.floor((loginDate + expireAge - Date.now())/1000))
                console.log(timeRemaining)
                toast(`Hi ${data.user} 😎`, {
                    theme: "dark",
                });
            }
        }
    };

    useEffect(() => {
        verifyUser();
        //changeTime();
    }, [cookies, navigate, removeCookie]);

    const logOut = () => {
        removeCookie("jwt");
        navigate("/login");
    };
    return (
        <>
        <div className="private">
            {<span>Time remaining to logout {timeRemaining}s</span>}
            <h4>JWT authentication</h4>
            <button onClick={logOut}>Log out</button>
        </div>
        <ToastContainer />
        </>
    );
    }

    export default SecretPage