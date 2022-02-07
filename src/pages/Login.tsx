/**
 *  Login.tsx
 *
 *  Manage log in and collect user id, and authtication
 *
 *  Created by
 *  Thitiporn Sukpartcharoen 
 *
 *  6 Jan 2022
 */
import './main.css'
import 'antd/dist/antd.css';
import React, { useEffect, useState } from "react";
import { Form, Input, Button, Checkbox, Layout, Breadcrumb, Modal } from 'antd';
import { useNavigate } from "react-router-dom";

import logo from'../images/2397338.png';
import EventAlert from './EventAlert';
import authService from '../services/authService';

const Login: React.FC = () => {
    /** validate form state */
    const [loginForm] = Form.useForm();
    /** refreash page sign */
    const [refreashWin, setRefreash] = useState<boolean>();
    /** validate form navigate for routing */
    let navigate = useNavigate();

    /** refreash watcher */
    useEffect(()=>{
        let refreash = localStorage.getItem("RefreashLogin");
        // check is there any refreash sign
        if(refreash === "true"){
            window.location.reload();
            localStorage.setItem("RefreashLogin","false");
        } 
    },[]);

    /**
     * Managment log in function which request, manage, and collect response
     * @param values 	input data from form field 
     */
    const onFinish = async (values: any) => {
        if(values){
            /** get uemail and password */
            let username = values.email ? values.email : "";
            let password = values.password ? values.password : "";
            if(username && password ){
                try {
                    await authService
                    .login(username,password)
                    .then( (res) => {
                        // console.log("res: ",res);
                        if(res.data.result_code === "1"){
                            /** set user detail to local storage */
                            localStorage.setItem("Authorization",res.data.token);
                            localStorage.setItem("userId",res.data.userKey);
                            localStorage.setItem("auth","true");
                            localStorage.setItem("isLogIn","true");
                            // Alert success message
                            EventAlert.Suceess("การเข้าใช้งานสำเร็จ");
                            // route to other page
                            navigate(`/partylist`);
                        }else{
                            EventAlert.Error("กรุณาลองอีกครั้ง",res.data.msg);
                        }
                    })
                } catch (error) {
                    console.log(error);
                    EventAlert.Error("กรุณาลองอีกครั้ง","");
                }
            }
        }else{
            localStorage.setItem("Authorization","");
            localStorage.setItem("userId","");
            localStorage.setItem("auth","false");
            localStorage.setItem("isLogIn","false");
        }
    };

    return (
        <React.Fragment>
            <div className="container">
                <div className="content">
                    <header>
                        <img src={logo} alt="Logo" className="Login-logo"/>
                    </header>
                    <div style={{paddingTop:"5px", paddingBottom:"10px"}}>
                        <h3>Let's Join Party</h3>
                    </div>
                    <div className="main">
                        <Form
                            name="basic"
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            autoComplete="off"
                            form={loginForm}
                            className="login-form"
                            layout="vertical"
                        >
                            <Form.Item
                                label="อีเมล"
                                name="email"
                                rules={[
                                    { required: true, message: 'กรุณากรอก อีเมล' },
                                    { type: 'email', warningOnly: true, message: 'รูปแบบ อีเมล ไม่ถูกต้อง' }
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="รหัสผ่าน"
                                name="password"
                                rules={[{ required: true, message: 'กรุณากรอก รหัสผ่าน' }]}
                            >
                                <Input.Password  />
                            </Form.Item>
                            <div style={{justifyContent: "center", alignItems: 'center'}}>
                                <Form.Item style={{paddingTop: "20px"}}>
                                    <Button 
                                        type="primary" 
                                        htmlType="submit" 
                                        className="btn-submit"
                                    >
                                        เข้าสู่ระบบ
                                    </Button>
                                </Form.Item>
                                <Form.Item >
                                    <Button
                                        type="primary" 
                                        onClick={()=>navigate(`/register`)} 
                                        className="btn-submit"
                                    >
                                        สร้างบัญชีผู้ใช้
                                    </Button>
                                </Form.Item>
                            </div>
                        </Form> 
                    </div>
                </div>
            </div>              
        </React.Fragment>
    );
}

export default Login;