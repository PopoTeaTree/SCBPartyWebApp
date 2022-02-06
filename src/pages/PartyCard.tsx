/**
 *  PartyCard.tsx
 *
 *  Party card detail
 *
 *  Created by
 *  Thitiporn Sukpartcharoen 
 *
 *  6 Jan 2022
 */
import './main.css'
import 'antd/dist/antd.css'
import React, { useEffect, useState } from "react";
import { Card, Button, Row, Col } from 'antd';
import Meta from 'antd/lib/card/Meta';
import { PartyInterface } from '../interfaces/party.interface';
import EventAlert from './EventAlert';
import eventService from '../services/eventService';
import { useNavigate } from 'react-router';

interface cardInterface {
    /** party interface */
    party: PartyInterface;
    /** function for setting value to refreash page */
    setRefreash: Function;
}

const PartyCard: React.FC<cardInterface> = (props: cardInterface) => {
    /** validate form navigate for routing */
    let navigate = useNavigate();
    /** window screen width */
    const [width, setWidth] = React.useState(window.innerWidth);

    /** screen width watcher  */
    React.useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);
        return () => window.removeEventListener("resize", handleWindowResize);
    }, []);

    /**
     * Join party function which manage request for joinning
     * @param values 	input data from form field 
     */
    const onJoin = async() => {
        // console.log("Join: ", props.party)
        if(props.party.keyParty){
            let partyKey = props.party.keyParty;
            try {
                await eventService.joinAParty(partyKey)
                .then( (res) => {
                    if(res.data.result_code === "1"){
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