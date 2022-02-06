/**
 *  EventAlert.tsx
 *
 *  Alert modal
 *
 *  Created by
 *  Thitiporn Sukpartcharoen 
 *
 *  6 Jan 2022
 */
import './main.css'
import 'antd/dist/antd.css'
import { Modal } from 'antd';

/**
* Success alert model
* @param content message to show 
*/
const Suceess = (content: string) => {
    // iinit modal
    const modal = Modal.success({
        content: content,
        okButtonProps: {
            hidden: true
        }
    });
    // set time appearence
    setTimeout(()=> {
        modal.destroy();
    }, 2000)
}

/**
* Error alert model
* @param title     title of error message
* @param content   message to show
*/
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