import './main.css'
import 'antd/dist/antd.css'
import React from "react";
import { Card, Avatar, Button, Row, Col } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Content } from 'antd/lib/layout/layout';
import Meta from 'antd/lib/card/Meta';
import { PartyInterface } from '../interfaces/party.interface';

interface cardInterface {
    party: PartyInterface
}

const PartyCard: React.FC<cardInterface> = (props: cardInterface) => {
    
    const breakpoint = 550;
    const [width, setWidth] = React.useState(window.innerWidth);

    React.useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);
        return () => window.removeEventListener("resize", handleWindowResize);
    }, []);

    const onJoin = () => {
        console.log("Join: ", props.party)
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
                        <Col span={24}>
                            <div style={{textAlign: "center"}}>{props.party.member}/{props.party.amount}</div>
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
                            <Col span={12}>
                                <div style={{textAlign: "center"}}>{props.party.member}/{props.party.amount}</div>
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