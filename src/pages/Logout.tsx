import './main.css'
import 'antd/dist/antd.css';
import React from "react";
import { Form, Input, Button, Checkbox, Layout, Breadcrumb } from 'antd';
import { useNavigate } from "react-router-dom";

const Logout: React.FC = () => {
    const [loginForm] = Form.useForm();
    let navigate = useNavigate();
    const onLogOut = (values: any) => {
        console.log(values)
        if(values){
            localStorage.setItem("acessToken", "");
            localStorage.setItem("userId","");
            localStorage.setItem("auth","false");
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