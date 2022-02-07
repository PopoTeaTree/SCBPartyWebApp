/**
 *  CreateParty.tsx
 *
 *  Create party card management
 *
 *  Created by
 *  Thitiporn Sukpartcharoen 
 *
 *  6 Jan 2022
 */
import './main.css'
import { CaretLeftOutlined } from "@ant-design/icons";
import { Button, Form, Input, InputNumber, Layout, PageHeader } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import EventAlert from './EventAlert';
import eventService from '../services/eventService';

const CreateParty: React.FC = () => {
    /** validate form state */
    const [form] = Form.useForm();
    /** validate form navigate for routing */
    let navigate = useNavigate();
    /**
     * Save new party function which get data from input and manage request.
     * @param values 	input data from form field 
     */
    const onSave = async (values:any) => {
        if(values){
            let partyName = values.partyname;
            let amount = values.amount;
            if(partyName && amount ){
                // console.log(partyName,amount);
                try {
                    await eventService.createNewParty(partyName, amount).then( (res) => {
                        // console.log(res);
                        if(res.data.result_code === "1"){
                            // Alert success message
                            EventAlert.Suceess("เพิ่มปาร์ตี้ใหม่สำเร็จงานสำเร็จ");
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
        }
    }

    return (
        <React.Fragment>
            <PageHeader
                className="site-page-header"
                key="create-page-header"
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
                        <Form.Item 
                            label="ชื่อปาร์ตี้" 
                            name="partyname" 
                            rules={[{ required: true, message: 'กรุณากรอก ชื่อปาร์ตี้' }]}
                        >
                            <Input style={{width:"100%"}}/>
                        </Form.Item>
                        <Form.Item 
                            label="จำนวนคนที่ขาด" 
                            name="amount" 
                            rules={[{ required: true, message: 'กรุณากรอก จำนวนคนที่ขาด' }]}>
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