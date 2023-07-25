import React, { useEffect, useState } from 'react'
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Container, Row, Col, InputGroup, Form, Button } from 'react-bootstrap'
import { useForm, useFieldArray } from 'react-hook-form';
import { AiOutlineConsoleSql, AiOutlineMinus } from 'react-icons/ai';
import axios from 'axios';
import img1 from '../images/Chiropractics.png'
import NestedArray from './NestedArray';
import ProcedureFieldArray from './ProcedureFieldArray';
import GetServerUrl from '../GetServerUrl';


const Document = ({ site, side, proceduresArr, allBenefits, allRisks }) => {

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    handlePrint();

    // async function printFunction(){
    //     const ans = await allBenefits

    // }

    console.log("ALL BENEFIT ARRAY PRINT : ", allBenefits)

    return (
        <div className='d-none'>
            <div ref={componentRef}>
                <div className='bg-light'>
                    <Row className='px-4 pt-4'>
                        <Col>
                            <Row>
                                <Col>
                                    <img src={img1} width="220px" alt="logo" />
                                </Col>
                                <Col>
                                    {console.log("PDF Document Component : : : : ")}
                                    {console.log("PDF Document Component : : : : ")}
                                    {console.log("PDF Document Component : : : : ")}
                                    {console.log("PDF Document Component : : : : ")}
                                    {console.log("PDF Document Component : : : : ")}
                                    {console.log("PDF Document Component : : : : ")}
                                    {console.log("PDF Document Component : : : : ")}
                                    {console.log("PDF Document Component : : : : ")}
                                    {console.log("PDF Document Component : : : : ")}
                                    {console.log("PDF Document Component : : : : ")}
                                    {console.log("PDF Document Component : : : : ")}
                                    {console.log("PDF Document Component : : : : ")}
                                    {console.log("PDF Document Component : : : : ")}
                                    {console.log("PDF Document Component : : : : ")}
                                    {console.log("PDF Document Component : : : : ")}
                                    {console.log("PDF Document Component : : : : ")}
                                    {console.log("PDF Document Component : : : : ")}
                                    {console.log("PDF Document Component : : : : ")}
                                    {console.log("PDF Document Component : : : : ")}
                                    {console.log("PDF Document Component : : : : ")}
                                    {console.log("PDF Document Component : : : : ")}
                                    {console.log("PDF Document Component : : : : ")}
                                    {console.log("PDF Document Component : : : : ")}
                                    {console.log("PDF Document Component : : : : ")}
                                    {console.log("PDF Document Component : : : : ")}
                                    {console.log("PDF Document Component : : : : ")}
                                    {console.log("PDF Document Component : : : : ")}
                                    {console.log("PDF Document Component : : : : ")}
                                    <h5>Dr. Important Surgeon</h5>
                                    <h5>Big City Orthopaedic Group</h5>
                                    <h6>“Professional letterhead goes here</h6>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
                <Row>
                    <Col sm={12} className='bg-info py-2 px-5'><b>Phone: <b className='ms-1 me-2' style={{ fontWeight: 'lighter' }}>0402345677</b></b> <b>Gmail: <b className='ms-1 me-2' style={{ fontWeight: 'lighter' }}> reception@bigcityortho.com</b></b> <b>Addess: <b className='ms-1 me-2' style={{ fontWeight: 'lighter' }}>Bic City, Australia</b></b></Col>
                </Row>
                <Row>
                    <Col sm="12">
                        <h1 className='text-center'>Consent for surgical procedure</h1>
                        <div className='p-2' style={{ width: '60%', marginLeft: '20%', border: '1px solid black' }}>
                            <table style={{ width: '100%' }}>
                                <tbody className='p-3'>
                                    <tr className='py-2 px-2'>
                                        <th>Hospital Number:</th>
                                        <td></td>
                                    </tr>
                                    <tr className='py-2 px-2'>
                                        <th>Surname:</th>
                                        <td></td>
                                    </tr>
                                    <tr className='py-2 px-2'>
                                        <th>Given Name:</th>
                                        <td></td>
                                    </tr>
                                    <tr className='py-2 px-2'>
                                        <th>Address:</th>
                                        <td></td>
                                    </tr>
                                    <tr className='py-2 px-2'>
                                        <th>Date Of Birth:</th>
                                        <td></td>
                                    </tr>
                                    <tr className='py-2 px-2'>
                                        <th>Phone Number:</th>
                                        <td></td>
                                    </tr>
                                    <tr className='py-2 px-2'>
                                        <th>Gender:</th>
                                        <td>Male (  ), Female (  ), Other (  )</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </Col>

                </Row>
                <Row className="py-2 px-5 my-3">
                    <Col className=''>
                        <h4 className='d-inline-block'>Site : </h4>
                        <p className='ms-4 d-inline-block'>{site && site}</p>
                    </Col>
                    <Col className='px-4'>
                        <h4 className='d-inline-block'>Side : </h4>
                        <p className="ms-4 d-inline-block">{side && side}</p>
                    </Col>
                </Row>
                <Row className='px-5'>
                    <Col>
                        <h4>Procedure : </h4>
                        <p className='text-center'>
                            {proceduresArr && proceduresArr.map((item, index) => (
                                <h4 className='text-center' key={index}><b className='mx-2'>{index + 1} - </b>{item.name?.label === 'Add New Procedure' ? item.newname : item.name?.label}</h4>
                            ))}
                        </p>
                        <p className='py-3'>
                            Medicolegal blurb about Dr. Important Surgeon has discussed the benefits, risks, outcomes and side-effects of the procedure above.  I, the patient, give my consent for the above procedure:
                        </p>
                        <div style={{ width: '80%', marginLeft: '10%' }}>
                            <p><b>Name Of Patient : ______________________________</b></p>
                            <p><b>Signature Of Patient : ____________________________</b></p>
                            <p><b className='ps-5 ms-5'>Date : ______/______/_________________</b></p>
                        </div>
                        <p className='py-3'>
                            Medicolegal blurb about “I, Dr. Important Surgeon have discussed the benefits, risks and outcomes of the above procedure with the above-named patient and accept their consent for surgery.
                        </p>
                        <div style={{ width: '80%', marginLeft: '10%' }}>
                            <p><b>Name Of Doctor : ______________________________</b></p>
                            <p><b>Signature Of Doctor : ____________________________</b></p>
                            <p><b className='ps-5 ms-5'>Date : ______/______/_________________</b></p>
                        </div>
                        <h4 className='py-2 pt-4'>Benefits</h4>
                        <table className='table-benefits'>
                            <thead>
                                <tr>
                                    {console.log("Print document check point")}
                                    {console.log("Print document check point")}
                                    {console.log("Print document check point")}
                                    <th>#</th>
                                    <th>Benefit</th>
                                    <th>Explaination</th>
                                    <th>Statistics</th>
                                    <th>Procedure</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allBenefits && allBenefits.map((pro1, index) => (
                                    <tr key={index + 1}>
                                        {console.log("Benefit print in document : ", pro1)}
                                        <th>{index + 1}</th>
                                        <td>{pro1.name}</td>
                                        <td>{pro1.detail}</td>
                                        <td>{pro1.statistics}</td>
                                        <td>{pro1.pro.map((item, i) => {
                                            if (i === 0) {
                                                return item
                                            }
                                            else {
                                                const comma = ",  " + item;
                                                return comma
                                            }
                                        })}</td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                        <h4 className='py-2 pt-4'>Risks</h4>
                        <table className='table-benefits'>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Risk</th>
                                    <th>Explaination</th>
                                    <th>Statistics</th>
                                    <th>Procedure</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allRisks && allRisks.map((pro1, index) => (
                                    <tr key={index + 1}>
                                        {console.log("Benefit print in document : ", pro1)}
                                        <th>{index + 1}</th>
                                        <td>{pro1.name}</td>
                                        <td>{pro1.detail}</td>
                                        <td>{pro1.statistics}</td>
                                        <td>{pro1.pro.map((item, i) => {
                                            if (i === 0) {
                                                return item
                                            }
                                            else {
                                                const comma = ",  " + item;
                                                return comma
                                            }
                                        })}</td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                    </Col>
                </Row>
            </div>

        </div>
    )
}


const Home = () => {
    const { register, handleSubmit, control, watch, reset } = useForm();
    const [check, setCheck] = useState(0)
    const [numCheck, setNumCheck] = useState(0);
    const [data, setData] = useState([]);
    const [site, setSite] = useState(null);
    const [side, setSide] = useState(null);
    const [data2, setData2] = useState([]);
    const [benPoints, setBenPoints] = useState([])
    const [risPoints, setRisPoints] = useState([])
    const [ids, setIds] = useState([])
    const [benefits, setBenefits] = useState([])
    const [risks, setRisks] = useState([])
    const [printData, setPrintData] = useState();
    const { append, fields, remove } = useFieldArray({ control, name: "procedure" })

    const additonalPoints = () => {
        // alert("clicked")
        let genProcedure = {}
        proceduresArr.map((pro1, index) => {
            if (pro1.name.label === 'Add New Procedure') {
                benPoints.splice(index, 0, 1000)
                risPoints.splice(index, 0, 1000)
                console.log("Pro 1 Benefits : ", pro1.benefits)
                console.log("Pro 1 Risk : ", pro1.risks);
                genProcedure = {
                    name: pro1.newname,
                    benefits: [...pro1.benefits.map(item => item.newbenefit.value)],
                    risks: [...pro1.risks.map(item => item.newrisk.value)]
                }
                // proceduresArr[index] = genProcedure;
                axios.post(`${GetServerUrl()}/admin/procedures`, genProcedure).then((response) => {
                    // alert("Procedure Created Successfully");
                    console.log("Genral Procedure response : ", response)

                    axios.get(`${GetServerUrl()}/admin/procedures`).then((response) => {
                        console.log("response : ", response);
                        const resu = response.data.procedures;
                        const siz = resu.length;
                        const getid = resu[siz - 1]._id;
                        if (pro1.nbenefits.length > 0) {
                            // alert("Greater")
                            axios.patch(`${GetServerUrl()}/doctor/procedure/${getid}`, { benefit: pro1.nbenefits }).then((response) => {
                                console.log("Addtional generic Benefits Added SuccessFully");
                                console.log("response : ", response)
                            }).catch((err) => {
                                console.log("Addtional Benefits error");
                                console.log("Error : ", err)
                            })
                        }

                        if (pro1.nrisks.length > 0) {
                            axios.put(`${GetServerUrl()}/doctor/procedure/${getid}`, { risk: pro1.nrisks }).then((response) => {
                                console.log("Addtional generic Risks Added SuccessFully");
                                console.log("response : ", response)
                            }).catch((err) => {
                                console.log("Addtional Risks error");
                                console.log("Error : ", err)
                            })
                        }
                        console.log("get id id id : : : ", getid)


                    }).catch((err) => {
                        console.log("error is : ", err)
                    })
                }).catch((err) => {
                    alert("Error")
                    console.log("Error : ", err)
                })

            }
        });

        const proLeng = proceduresArr.length;
        for (let i = 0; i < proLeng; i++) {

            console.log("Current index proc : ", proceduresArr[i])

            const currBenLen = proceduresArr[i].benefits.length
            console.log("Curr Ben Length : ", currBenLen)
            if (currBenLen > benPoints[i]) {
                console.log("ben Length", benPoints[i])
                //   alert("greater ben")
                console.log("greater ben")
                const benArr = proceduresArr[i].benefits
                const split = -(currBenLen - benPoints[i])
                const addtionalBen = benArr.splice(split)
                const iid = ids[i]
                console.log("Addtional benfit has been added to arrray is : ", addtionalBen)

                axios.patch(`${GetServerUrl()}/doctor/procedure/${iid}`, { benefit: addtionalBen }).then((response) => {
                    console.log("Addtional Benefits Added SuccessFully");
                    console.log("response : ", response)
                }).catch((err) => {
                    console.log("Addtional Benefits error");
                    console.log("Error : ", err)
                })
            }
            // const risLeng = risksArr.length
            const currRisLen = proceduresArr[i].risks.length
            console.log("Curr Risk Leng : ", currRisLen);
            if (currRisLen > risPoints[i]) {
                console.log("risk length", risPoints[i])
                alert("risk greater")
                console.log("risk greater")
                const risArr = proceduresArr[i].risks
                const split = -(currRisLen - risPoints[i])
                const additionalRis = risArr.splice(split)
                const iid = ids[i]
                console.log("Addtional Risk has been added to arrray is : ", additionalRis)

                axios.put(`${GetServerUrl()}/doctor/procedure/${iid}`, { risk: additionalRis }).then((response) => {
                    console.log("Addtional Risks Added SuccessFully");
                    console.log("response : ", response)
                }).catch((err) => {
                    console.log("Addtional Risks error");
                    console.log("Error : ", err)
                })
            }
        }
        console.log("Genral Procedure : ", genProcedure)
        console.log("____________________________________________________")
        console.log("Data : ", data)
        // handlePrint();    
    }

    const onSubmit = (data1) => {
        // alert("Alert Submit")
        if (check === 0) {
            additonalPoints();
            setCheck(check + 1);
        }
        console.log("data data data data data data data data data ")
        console.log("DAta one : ", data1);
        console.log("data data data data data data data data data ")
        let benARR = [];
        let risARR = [];
        let nbenARR = [];
        let nrisARR = [];
        data1 && data1.Procedure.map((item, index) => {
            item.benefits && item.benefits.map((single, ind) => {
                console.log("singl ben at ", ind, " :: : :: ", single)
                if (item.name.label === 'Add New Procedure') {
                    const ab = single.newbenefit.value;
                    if (benARR.length === 0) {
                        benARR.push({ code: ab.code, name: ab.name, detail: ab.detail, statistics: ab.statistics, pro: [index + 1] })
                    }
                    else {
                        let flag = 0;
                        benARR.map((double, i) => {

                            if (double.code === ab.code) {
                                flag = flag + 1;
                                benARR[i].pro = [...benARR[i].pro, index + 1]
                            }
                        })
                        if (flag === 0) {
                            benARR.push({ code: ab.code, name: ab.name, detail: ab.detail, statistics: ab.statistics, pro: [index + 1] })
                        }
                    }
                }
                else {
                    if (benARR.length === 0) {
                        benARR.push({ code: single.code, name: single.name, detail: single.detail, statistics: single.statistics, pro: [index + 1] })
                    }
                    else {
                        let flag = 0;
                        benARR.map((double, i) => {
                            if (double.code === single.code) {
                                flag = flag + 1;
                                benARR[i].pro = [...benARR[i].pro, index + 1]
                            }
                        })
                        if (flag === 0) {
                            benARR.push({ code: single.code, name: single.name, detail: single.detail, statistics: single.statistics, pro: [index + 1] })
                        }
                    }
                }
            })
            if (item?.name?.label === "Add New Procedure") {
                item.nbenefits && item.nbenefits.map((sin, ind) => {
                    nbenARR.push({ name: sin.name, statistics: sin.statistics, detail: sin.detail, pro: [index + 1] })
                })
                item.nrisks && item.nrisks.map((sin) => {
                    nrisARR.push({ name: sin.name, statistics: sin.statistics, detail: sin.statistics, pro: [index + 1] })
                })
            }
        })

        data1 && data1.Procedure.map((item, index) => {
            item.risks && item.risks.map((single, ind) => {
                console.log("singl ben at ", ind, " :: : :: ", single)
                if (item.name.label === 'Add New Procedure') {
                    const ab = single.newrisk.value;
                    if (risARR.length === 0) {
                        risARR.push({ code: ab.code, name: ab.name, detail: ab.detail, statistics: ab.statistics, pro: [index + 1] })
                    }
                    else {
                        let flag = 0;
                        risARR.map((double, i) => {

                            if (double.code === ab.code) {
                                flag = flag + 1;
                                risARR[i].pro = [...risARR[i].pro, index + 1]
                            }
                        })
                        if (flag === 0) {
                            risARR.push({ code: ab.code, name: ab.name, detail: ab.detail, statistics: ab.statistics, pro: [index + 1] })
                        }
                    }
                }
                else {
                    if (risARR.length === 0) {
                        risARR.push({ code: single.code, name: single.name, detail: single.detail, statistics: single.statistics, pro: [index + 1] })
                    }
                    else {
                        let flag = 0;
                        risARR.map((double, i) => {
                            if (double.code === single.code) {
                                flag = flag + 1;
                                risARR[i].pro = [...risARR[i].pro, index + 1]
                            }
                        })
                        if (flag === 0) {
                            risARR.push({ code: single.code, name: single.name, detail: single.detail, statistics: single.statistics, pro: [index + 1] })
                        }
                    }
                }
            })
        })

        benARR = [...benARR, ...nbenARR];
        risARR = [...risARR, ...nrisARR];

        setData(benARR)
        setData2(risARR)
        setNumCheck(1);
        const lab = [...data1.Procedure];
        console.log("LAB : : : : : ", lab);
        console.log("_____________________________");
        console.log("data : ", data)
        console.log("Print data : ", printData);
        // handlePrint();
        // if(check < 2){
        //     onSubmit(data);
        //     handlePrint();
        // }
    }

    useEffect(() => {
        axios.get(`${GetServerUrl()}/admin/benefits`)
            .then((response) => {
                setBenefits(response.data.benefits)
            }).catch((err) => {
                console.log("Error : ", err)
            })
    }, [])

    useEffect(() => {
        axios.get(`${GetServerUrl()}/admin/risks`)
            .then((response) => {
                setRisks(response.data.risks)
            }).catch((err) => {
                console.log("Error : ", err)
            })
    }, [])


    let proceduresArr = []
    if (watch('Procedure')) {
        proceduresArr = watch('Procedure');
    }

    console.log("Data data Procedure : ", proceduresArr)

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    // handlePrint()



    let rno = 1;
    let bno = 1;
    console.log("DATA : DAta : ", data)
    const heading = {
        textAlign: "center",
     fontWeight:"bold"
    }
    return (
        <>

            <Container className='mt-5'>


                <Row>
                    <Col md={{ span: 9, offset: 2 }}>
                        <div className="px-md-5 px-8 mt-3 py-3">
                            <h4 style={heading} className='px-md-5 mt-5 px-6  py-3 align-centre' >
                                Consent for surgical procedure
                            </h4>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <Form.Group as={Row} className="mb-2 pt-4" controlId="formPlaintextEmail">

                                    <Col sm='3'>
                                        <Form.Label>
                                            <h6>Side</h6>
                                        </Form.Label>
                                        <Form.Control style={{ borderColor: "black" }} type="text" onChange={(e) => setSide(e.target.value)} placeholder='Enter Side' />
                                    </Col>
                                    <Col sm="3">
                                        <Form.Label >
                                            <h6>Site</h6>
                                        </Form.Label>
                                        <Form.Control style={{ borderColor: "black" }} type="text" onChange={(e) => setSite(e.target.value)} placeholder='Enter Site' />
                                    </Col>

                                    <Col sm="4" >
                                        <Form.Label>
                                            <h6>Procedure</h6>
                                        </Form.Label>
                                        <Form.Control style={{ borderColor: "black" }} type="text" placeholder='Enter Procedure' />

                                    </Col>
                                </Form.Group>
                                {/* <button type='submit' className='btn btn-info'>Submit</button> */}
                                {/* <button onClick={() => append()} className='btn btn-success'>Add Procedure</button> */}
                                <ProcedureFieldArray {...{ register, control, watch, reset, benPoints, setBenPoints, risPoints, setRisPoints, ids, setIds }} />

                                <div>
                                    <button onClick={() => handlePrint()} className='btn btn-success mb-5' >Print Document</button>
                                </div>
                            </form>
                        </div>
                    </Col>
                </Row>
            </Container>


            <Container className='mt-3'>
                <Row className='py-2 px-5 my-3'>

                    <Col md={{ span: 9, offset: 2 }} >


                        <h4 className='py-2 pt-4'>Benefits</h4>
                        <table className='table-benefits'>
                            <thead>
                                <tr>
                                    {console.log("Print document check point")}
                                    {console.log("Print document check point")}
                                    {console.log("Print document check point")}
                                    <th>#</th>
                                    <th>Benefit</th>
                                    <th>Explaination</th>
                                    <th>Statistics</th>
                                    <th>Procedure</th>
                                </tr>
                            </thead>
                            <tbody>
                                {benefits && benefits.map((pro1, index) => (
                                    <tr key={index + 1}>
                                        {console.log("Benefit print in document : ", pro1)}
                                        <th>{index + 1}</th>
                                        <td>{pro1?.name}</td>
                                        <td>{pro1?.detail}</td>
                                        <td>{pro1?.statistics}</td>
                                        <td>{pro1?.pro?.map((item, i) => {
                                            if (i === 0) {
                                                return item
                                            }
                                            else {
                                                const comma = ",  " + item;
                                                return comma
                                            }
                                        })}</td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                        <h4 className='py-2 pt-4'>Risks</h4>
                        <table className='table-benefits'>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Risk</th>
                                    <th>Explaination</th>
                                    <th>Statistics</th>
                                    <th>Procedure</th>
                                </tr>
                            </thead>
                            <tbody>
                                {risks && risks.map((pro1, index) => (
                                    <tr key={index + 1}>
                                        {console.log("Benefit print in document : ", pro1)}
                                        <th>{index + 1}</th>
                                        <td>{pro1?.name}</td>
                                        <td>{pro1?.detail}</td>
                                        <td>{pro1?.statistics}</td>
                                        <td>{pro1?.pro?.map((item, i) => {
                                            if (i === 0) {
                                                return item
                                            }
                                            else {
                                                const comma = ",  " + item;
                                                return comma
                                            }
                                        })}</td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>

                    </Col>
                </Row>

            </Container>


            {numCheck === 1 && (
                <Document site={site} side={side} proceduresArr={proceduresArr} allBenefits={data} allRisks={data2} componentRef={componentRef} />
            )}

            {/* Footer  */}

            <div className=' mb-2 ' style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}>

                <button type='submit' onClick={handlePrint()} className='btn btn-success ' >Submit</button>
            </div>
        </>
    )
}


export default Home

