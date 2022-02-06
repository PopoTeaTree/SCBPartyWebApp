/**
 *  Logout.tsx
 *
 *  Manage log out and clear user local storage
 *
 *  Created by
 *  Thitiporn Sukpartcharoen 
 *
 *  6 Jan 2022
 */
import './main.css'
import 'antd/dist/antd.css';
import React from "react";
import { Form, Input, Button, Checkbox, Layout, Breadcrumb } from 'antd';
import { useNavigate } from "react-router-dom";

const Logout: React.FC = () => {
     /** validate form state */
    const [loginForm] = Form.useForm();
    /** validate form navigate for routing */
    let navigate = useNavigate();
    /** clear local storage function */
    const onLogOut = (values: any) => {
        console.log(values)
        if(values){
            localStorage.setItem("Authorization","");
            localStorage.setItem("userId","");
            localStorage.setItem("auth","false");
            localStorage.setItem("isLogIn","false");
            navigate(`/login`)
        }else{
            console.log('Error');
        }
    };

    return (
        <React.Fragment>    
            <Button 
                key="button-logout-party"
                onClick={()=>{navigate(`/login`)}}
            >
                Log out
            </Button>                  
        </React.Fragment>
    );
}

export default Logout;