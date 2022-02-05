import './main.css'
import 'antd/dist/antd.css'
import React, { useState } from "react";
import { Button, Modal, notification, Space } from 'antd';
import { title } from 'process';

interface eventAlertInterface {
    type: string;
    content: string;
}
  
const Suceess = (content: string) => {
    const modal = Modal.success({
        content: content,
        okButtonProps: {
            hidden: true
        }
    });
    setTimeout(()=> {
        modal.destroy();
    }, 2000)
}
const Error = (title: string, content: string) => {
    Modal.error({
        title: title,
        content: content,
    });
}

const EventAlert = {
    Suceess: Suceess,
    Error: Error
}

export default EventAlert;