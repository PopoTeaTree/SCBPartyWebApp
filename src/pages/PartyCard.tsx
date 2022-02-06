import './main.css'
import 'antd/dist/antd.css'
import React, { useEffect, useState } from "react";
import { Card, Avatar, Button, Row, Col } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Content } from 'antd/lib/layout/layout';
import Meta from 'antd/lib/card/Meta';
import { PartyInterface } from '../interfaces/party.interface';
import EventAlert from './EventAlert';
import eventService from '../services/eventService';
import { useNavigate } from 'react-router';

interface cardInterface {
    party: PartyInterface;
    setRefreash: Function;
}

const PartyCard: React.FC<cardInterface> = (props: cardInterface) => {
    let navigate = useNavigate();
    const breakpoint = 550;
    const [width, setWidth] = React.useState(window.innerWidth);
    const [member, setMember] =  useState<Number>();

    React.useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);
        return () => window.removeEventListener("resize", handleWindowResize);
    }, []);

    useEffect(()=>{
        let buffer = props.party.member ? Number(props.party.member) : 0;
        setMember(buffer);
    },[props]);

    const onJoin = async() => {
        console.log("Join: ", props.party)
        if(props.party.keyParty){
            let partyKey = props.party.keyParty;
            try {
                await eventService.joinAParty(partyKey)
                .then( (res) => {
                    if(res.data.result_code === "1"){
                        localStorage.setItem("acessToken",res.data.token);
                        localStorage.setItem("userId",res.data.userKey);
                        localStorage.setItem("auth","true");
                        EventAlert.Suceess("เข้าร่วมปาร์ตี้สำเร็จ");
                        navigate(`/partylist`);
                    }else{
                        EventAlert.Error("กรุณาลองอีกครั้ง",res.data.msg);
                    }
                    props.setRefreash(true);
                })
            } catch (error) {
                console.log(error);
                EventAlert.Error("กรุณาลองอีกครั้ง","");
            }
        }
    }
    return (
        <React.Fragment>
            <div style={{paddingTop: "20px"}}/>
            <Card
                className="content-list"
                cover={
                    <img
                        alt="example"
                        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                    />
                }
                onTabChange={(key) => {console.log(key)}}
                id={`party-card-${props.party.id}`}
            >
                <Meta
                    title={props.party.partyName}
                />
                <div className="additional" style={{ marginTop: "20px"}}>
                    {width < 550 ?
                        <Col key={`col-550-window`} span={24}>
                            <div style={{textAlign: "center"}}>{props.party.member ? props.party.member : 0}/{props.party.maxAmount}</div>
                            <div style={{marginTop: "5px"}}/>
                            <Button 
                                type="primary"
                                className="btn-join-max"
                                onClick={()=>onJoin()}
                            >
                                Join
                            </Button>
                        </Col>
                    :
                        <Row>
                            <Col key={`col-12-2`} span={12}>
                                <div style={{textAlign: "center"}}>{props.party.member ? props.party.member : 0}/{props.party.maxAmount}</div>
                            </Col>
                            <Col span={12}>
                                <Button 
                                    type="primary"
                                    className="btn-join"
                                    onClick={()=>onJoin()}
                                >
                                    Join
                                </Button>
                            </Col>
                        </Row>
                    }
                </div>
        </Card>
        </React.Fragment>
    );
}

export default PartyCard;