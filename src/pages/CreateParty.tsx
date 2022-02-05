import './main.css'
import { CaretLeftOutlined } from "@ant-design/icons";
import { Button, Form, Input, InputNumber, Layout, PageHeader } from "antd";
import { Content } from "antd/lib/layout/layout";
import { format } from "path/posix";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PartyCard from "./PartyCard";

const CreateParty: React.FC = () => {
    const [isCreate,setIsCreate] = useState<Boolean>(false);
    const [form] = Form.useForm();
    let navigate = useNavigate();

    const onSave = (values:any) => {
        console.log(values);
    }

    return (
        <React.Fragment>
            <PageHeader
                className="site-page-header"
                title="สร้างปาร์ตี้ใหม่"
                extra={[ 
                    <Button 
                        key="button-create-party"
                        onClick={()=>{navigate(`/partylist`)}} 
                        icon={<CaretLeftOutlined />}
                    >
                        Back
                    </Button>
                ]}
            />
                <div className="content">
                <div className="main">
                    <Form
                        name="wrap"
                        labelAlign="left"
                        labelWrap
                        colon={false}
                        onFinish={onSave}
                        form={form}
                        layout="vertical"
                    >
                        <Form.Item label="ชื่อปาร์ตี้" name="username" rules={[{ required: true }]}>
                            <Input style={{width:"100%"}}/>
                        </Form.Item>
                        <Form.Item label="จำนวนคนที่ขาด" name="password" rules={[{ required: true }]}>
                            <InputNumber min={1} max={99}  style={{width:"100%"}}/>
                        </Form.Item>
                        <Form.Item label=" ">
                            <Button 
                            type="primary" 
                            htmlType="submit" 
                            className="btn-submit"
                        >
                                Save
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
                </div>
        </React.Fragment>
    );
}

export default CreateParty;