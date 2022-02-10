/**
 *  PartyList.tsx
 *
 *  Manage Party list page to show party card
 *
 *  Created by
 *  Thitiporn Sukpartcharoen 
 *
 *  6 Jan 2022
 */
import { PlusOutlined } from "@ant-design/icons";
import { Button, Col, Empty, PageHeader, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PartyInterface } from "../interfaces/party.interface";
import eventService from "../services/eventService";
import EventAlert from "./EventAlert";
import Logout from "./Logout";
import PartyCard from "./PartyCard";

const PartyList: React.FC = () => {
    /** Array of all party detail */
    const [partyData,setPartyData] = useState<Array<PartyInterface>>([]);
    /** refreash page sign */
    const [refreashWin, setRefreash] = useState<boolean>(false);
    /** validate form navigate for routing */
    let navigate = useNavigate();

    /** refreash watcher */
    useEffect(()=>{
        if(refreashWin){
            setTimeout(()=> {
                window.location.reload();
            }, 2000)
            setRefreash(false);
        }
    },[refreashWin]);

    /** get all party detail */
    useEffect(()=>{
        const getPartyList = async() =>{
            try {
                await eventService
                .getPartyList()
                .then( (res ) => {
                    // console.log(res);
                    if(res.data){
                        let addKey = res.data.party_list.map((x: any, i: number)=>({...x,id: i}));
                        setPartyData(addKey);
                    }else{
                        EventAlert.Error("กรุณาเพิ่มปาร์ตี้",res.data.msg);
                    }
                })
            } catch (error) {
                console.log(error);
                EventAlert.Error("กรุณาลองอีกครั้ง","");
                localStorage.setItem("RefreashLogin","true");
                navigate(`/login`);
            }
        }
        getPartyList();
    },[]);

    return (
        <React.Fragment>
            <PageHeader
                className="site-page-header"
                key="pageheader-partylist"
                title="ปาร์ตี้ทั้งหมด"
                extra={[ 
                    <Button 
                        key="button-create-party"
                        onClick={()=>{navigate(`/party/create`)}}
                        icon={<PlusOutlined />}
                    >
                        สร้างปาร์ตี้ใหม่
                    </Button>,
                    <Logout />
                ]}
            />
                <div className="content" >
                    {
                        partyData &&
                        <Empty
                            image={Empty.PRESENTED_IMAGE_SIMPLE}
                            description={
                            <span>
                                ไม่มีข้อมูลปาร์ตี้ กรุณาสร้างปาร์ตี้ใหม่
                            </span>
                            }
                        >
                        </Empty>
                    }
                    {/* Display card list by check if the party has more than one */}
                    {
                        partyData.length === 1 ?
                        // Only have one party in party list
                        <PartyCard 
                            party={partyData[0]} 
                            setRefreash={(value: boolean)=>setRefreash(value)} 
                        />
                    :
                        // More than one party case
                        <Row gutter={[8, 8]}>
                            {
                                partyData.map((party: PartyInterface)=>(
                                    <Col 
                                        span={12} 
                                        key={`col-${party.keyParty}`} 
                                    >
                                        <PartyCard 
                                            party={party} 
                                            setRefreash={(value: boolean)=>setRefreash(value)} 
                                        />
                                    </Col>
                                ))
                            }
                        </Row>
                    }           
                </div>
        </React.Fragment>
    );
}

export default PartyList;
