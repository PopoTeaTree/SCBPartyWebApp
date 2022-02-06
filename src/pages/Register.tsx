import './main.css'
import 'antd/dist/antd.css';
import React from "react";
import { Form, Input, Button, Checkbox, Layout, Breadcrumb, PageHeader } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import { useNavigate } from 'react-router-dom';
import { CaretLeftOutlined } from '@ant-design/icons';
import authService from '../services/authService';
import eventService from '../services/eventService';
import EventAlert from './EventAlert';

const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };

  
const Register: React.FC = () => {
    const [registerForm] = Form.useForm();
    let navigate = useNavigate();
    
    const onFinish = async (values: any) => {
        console.log(values)
        if(values){
            let username = values.email ? values.email : "";
            let password = values.password ? values.password : "";
            if(username && password ){
                try {
                    await authService
                    .register(username,password)
                    .then( (res) => {
                        if(res.data.result_code === "1"){
                            localStorage.setItem("acessToken",res.data.token);
                            localStorage.setItem("userId",res.data.userKey);
                            localStorage.setItem("auth","true");
                            EventAlert.Suceess("ลงทะเบียนเพื่อใช้งานสำเร็จ");
                            navigate(`/login`);
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
            localStorage.setItem("acessToken", "");
            localStorage.setItem("userId","");
            localStorage.setItem("auth","false");
        }
    };
    
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <React.Fragment>
            <PageHeader
                className="site-page-header"
                title=""
                extra={[ 
                    <Button 
                        key="button-create-party"
                        onClick={()=>{navigate(`/login`)}} 
                        icon={<CaretLeftOutlined />}
                    >
                        Back
                    </Button>
                ]}
            />
                <div className="content">
                    <div>สร้างบัญชีผู้ใช้</div>
                    <div style={{ paddingTop: "20px" }}/>
                    <div className="main">
                        <Form
                            name="basic"
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                            form={registerForm}
                            className="input-form"
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
                            <Form.Item
                                name="confirm"
                                label="ยืนยันรหัสผ่าน"
                                dependencies={['password']}
                                hasFeedback
                                rules={[
                                    { required: true, message: 'กรุณากรอก รหัสผ่าน' },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('ยืนยันรหัสผ่านไม่ตรงกับรหัสผ่าน'));
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password />
                            </Form.Item>
                            <Form.Item
                                name="agreement"
                                valuePropName="checked"
                                rules={[
                                {
                                    validator: (_, value) =>
                                    value ? Promise.resolve() : Promise.reject(new Error('กรุณายอมรับยอมรับเงื่อนไขและข้อตกลงก่อนเข้าใช้งาน')),
                                },
                                ]}
                            >
                                <Checkbox>
                                    ฉันยอมรับ<a href="">เงื่อนไขและข้อตกลง</a>เกี่ยวกับการใช้งาน
                                    {/* I have read the <a href="">agreement</a> */}
                                </Checkbox>
                            </Form.Item>
                            <Form.Item style={{paddingTop: "20px"}}>
                                <Button 
                                    type="primary" 
                                    htmlType="submit" 
                                    className="btn-submit"
                                >
                                    ยืนยัน
                                </Button>
                            </Form.Item>
                        </Form> 
                    </div>
                </div>             
        </React.Fragment>
    );
}

export default Register;