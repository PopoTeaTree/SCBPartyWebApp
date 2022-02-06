import { PlusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Col, Layout, PageHeader, Row } from "antd";
import { Content } from "antd/lib/layout/layout";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PartyInterface } from "../interfaces/party.interface";
import eventService from "../services/eventService";
import EventAlert from "./EventAlert";
import PartyCard from "./PartyCard";

const useViewport = () => {
    const [width, setWidth] = React.useState(window.innerWidth);
  
    React.useEffect(() => {
      const handleWindowResize = () => setWidth(window.innerWidth);
      window.addEventListener("resize", handleWindowResize);
      return () => window.removeEventListener("resize", handleWindowResize);
    }, []);
  
    // Return the width so we can use it in our components
    return { width };
}

const PartyList: React.FC = () => {
    const [partyData,setPartyData] = useState<Array<PartyInterface>>([]);
    const [refreashWin, setRefreach] = useState<boolean>(false);
    const { width } = useViewport();
    const breakpoint = 700;

    let navigate = useNavigate();

    useEffect(()=>{
        if(refreashWin){
            window.location.reload();
            setRefreach(false);
        }
    },[refreashWin]);

    useEffect(()=>{
        const getPartyList = async() =>{
            try {
                await eventService
                .getPartyList()
                .then( (res ) => {
                    console.log(res);
                    if(res.data){
                        let addKey = res.data.party_list.map((x: any, i: number)=>({...x,id: i}));
                        setPartyData(addKey);
                    }else{
                        EventAlert.Error("กรุณาลองอีกครั้ง",res.data.msg);
                        // navigate(`/login`);
                    }
                })
            } catch (error) {
                console.log(error);
                EventAlert.Error("กรุณาลองอีกครั้ง","");
                // navigate(`/login`);
            }
        }
        getPartyList();
    },[]);

    return (
        <React.Fragment>
            <PageHeader
                className="site-page-header"
                title="ปาร์ตี้ทั้งหมด"
                extra={[ 
                    <Button 
                        key="button-create-party"
                        onClick={()=>{navigate(`/party/create`)}}
                        icon={<PlusOutlined />}
                    >
                        สร้างปาร์ตี้ใหม่
                    </Button>,
                    <Button 
                        key="button-logout-party"
                        onClick={()=>{navigate(`/login`)}}
                    >
                        Log out
                    </Button>
                ]}
            />
                <div className="content" >
                    <Row gutter={[8, 8]}>
                        {
                            partyData.map((party: PartyInterface)=>(
                                <Col 
                                    span={12} 
                                    key={`col-${party.keyParty}`} 
                                >
                                    <PartyCard 
                                        party={party} 
                                        setRefreash={()=>setRefreach} 
                                    />
                                </Col>
                            ))
                        }
                    </Row>
                </div>
        </React.Fragment>
    );
}

export default PartyList;
