import React, { useEffect, useState } from 'react'
import {Container, Row, Col, InputGroup, Form, Button} from 'react-bootstrap'
import { useForm, useFieldArray } from 'react-hook-form';
import {AiOutlineMinus} from 'react-icons/ai';
import axios from 'axios';
import GetServerUrl from '../GetServerUrl';

const NestedArray = ({nestIndex, register, control, watch, reset}) => {
    const [editId, setEditId] = useState();
    const [data, setData] = useState();
    const [search, setSearch] = useState(null);
    const [site, setSite] = useState(null);
    const [side, setSide] = useState(null);
    const [searchbtn, setSearchbtn] = useState(null);
    const [procedure, setProcedure] = useState();
    const [pid, setPid] = useState(null)
    const [ben, setBen] = useState(null)
    const [risk, setRisk] = useState(null)

    useEffect(() => {
        axios.get(`${GetServerUrl()}/admin/search?query=${searchbtn}`).then((response) => {
            setProcedure(response.data.procedure)
            setPid(procedure._id)
            alert("ADFdf")
            const dummy = response.data.procedure
            console.log(" dummy one ", dummy)
            setBen(dummy.benefits.length)
            setRisk(dummy.risks.length)
            console.log(response.data)
            setBen(response.data.procedure.benefits.length)
            console.log(data)
        }).catch((err) => {
            console.log("Error : ", err)
        })
    }, [searchbtn])

    useEffect(() => {
        reset(procedure)
    }, [reset, procedure])

    console.log("pid id id : ", procedure)
    console.log("pid id id : ", procedure && procedure._id)
    console.log("ben ben ben : ", ben && ben)
    console.log("ben ben ben : ", risk && risk)
    console.log("benefits nuber : ", procedure && procedure.benefits.length)


    function filterSearch() {
        setSearchbtn(search)
        // console.log("searchc", search)
        // const singlepro = data && data.filter(pro => pro.name === search).map((filteredPro) => (
        //     console.log(filteredPro)
        //     // setProcedure(filteredPro)
        // ))
        // axios.get(`${GetServerUrl()}/admin/search?query=${search}`).then((response) => {
        //     setData(response.data.procedure)
        //     console.log("response data : ",response.data)
        //     setProcedure(response.data.procedure)
        //     console.log("procedure ::: ", procedure)
        // }).catch((err) => {
        //     console.log("Error : ", err)
        // })
        // console.log(singlepro)
        console.log(procedure)
    }

    const defaultbenefits = [{bname: "First One", benefit: "default benefit one ", bstat: "statics 70%"}, {bname: "Second One", benefit: "default benefit two", bstat: "statics 20%"}, {bname: "Third One", benefit: "default benefit three", bstat: "statics 90%"}]

    const {
        append: benefitAppend, 
        fields: benefitFields, 
        remove: benefitRemove
    } = useFieldArray({ control, name: `procedure[${nestIndex}]benefits` }) 
    
    
    const {
        append: riskAppend,
        fields: riskFields,
        remove: riskRemove
    } = useFieldArray({control, name: `procedure[${nestIndex}]risks`})
    
    const onSubmit = (data) => {        
        console.log("data : ", data)
    }

    let benefitsArr =[];
    if(watch('benefits')){
        benefitsArr = watch('benefits');
    }
    console.log(benefitsArr);
    // console.log(" length of array : ",firstname.length)
    
    let arrlength = 0;
    if(benefitsArr !== null){
        arrlength = benefitsArr.length;
    }
    console.log("length : ",arrlength);
    
    useEffect(() => {
        if (procedure){
            // reset("benefit", ...procedure.benefits)
            // benefitAppend({"benefit": ...})
        }
        // alert("zero")
    }, [reset, procedure])
    
    let risksArr =[];
    if(watch('risks')){
        risksArr = watch('risks');
    }
    console.log(risksArr);
    // console.log(" length of array : ",firstname.length)
    let arrlength2 = 0;
    if(risksArr !== null){
        arrlength2 = risksArr.length;
    }
    console.log("length : ",arrlength2);


  return (
    <div>
        <h6>Search Procedure</h6>
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
        <Col sm="8">
        <Form.Control type="text" onChange={(e) => setSearch(e.target.value)} name="search" value={search} placeholder="Procedure Name" />
        </Col>
        <Col sm="4">
            <Button variant='info' onClick={filterSearch}  className="me-2">Search</Button>
            <Button variant='success' style={{backgroundColor: '#9ACD32'}}>Add Procedure</Button>
        </Col>                            
        </Form.Group>
        {procedure && (<form>
            <input type="hidden" {...register("name")} />
            <h4>Benefits of Procedure</h4>
            {benefitFields.map((item, index)=>(
                <div className="form-row form-group" key={index}>
                    {index + 1 >= arrlength?(
                    <>
                        <div className="row">
                            <div className='col-6'>
                                <input type="text" placeholder='Enter Benefit Name' className="form-control" defaultValue={item.name} {...register(`benefits.${index}.name`)} />
                            </div>
                            <div className='col-6'>
                                <input type="text" placeholder='Enter Benefit Statics' className="form-control" defaultValue={item.statistics} {...register(`benefits.${index}.statistics`)} />
                            </div>
                        </div>
                        <div className="col my-2">
                            <div className='lft-div'>
                                <input type="text" defaultValue={item.detail} {...register(`benefits.${index}.detail`)} className="form-control" placeholder="Add Benefit" />
                            </div>
                            <div className='button-div'>
                                <button className="btn btn-danger my-2" onClick={() => benefitRemove(index)}><AiOutlineMinus /></button>
                            </div>
                        </div>
                    </>
                    ):index === editId? (
                    <>
                        <div className="col my-2">
                            <input type="text" defaultValue={`item.${editId}.detail`} {...register(`benefits.${index}.detail`)} className="form-control" placeholder="Enter Your First name" />
                        </div>
                        
                        <button className="btn btn-danger my-2" onClick={() => benefitRemove(index)}>Remove</button>
                        {/* <button className="btn ml-3 btn-danger my-2" onClick={() => setEditId(null)}>Update</button> */}
                    </>
                    ):(
                    <>
                        <table className="table">
                            {index < 1 && (
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Benefit</th>
                                        <th scope="col">Description</th>
                                        <th scope="col">Statics</th>
                                        <th scope="col">Remove</th>
                                    </tr>
                                </thead>
                            ) }
                            <tbody>
                                <tr>
                                    <th style={{width: '4%'}} scope="row">{index + 1}</th>
                                    <td style={{width: '18%'}} >{benefitsArr[index].name}</td>
                                    <td style={{width: '44%'}}>{benefitsArr[index].detail}</td>
                                    <td style={{width: '18%'}}>{benefitsArr[index].statistics}</td>
                                    <td style={{width: '7%'}}><button className='btn btn-info px-1' onClick={() => benefitRemove(index)}>Remove</button></td>
                                </tr>
                            </tbody>
                        </table>
                    {/* <ul className='mb-0'>
                        <li><b>{benefitsArr[index].benefit} <button className="btn btn-danger my-2 min-btn" onClick={() => benefitRemove(index)}><AiOutlineMinus /></button></b></li>
                    </ul> */}
                    {/* <table key={index} style={{border: '1px solid black', width: '100%'}}>
                        <tbody>
                        <tr>
                            <td className="px-2 py-2">{firstname[index].fname}</td>
                            <td><button className="btn btn-danger my-2" onClick={() => remove(index)}><AiOutlineMinus /></button></td>
                            <td><button className="btn btn-danger my-2" onClick={() => setEditId(index)}>Edit</button></td>
                        </tr>
                        </tbody>
                    </table> */}
                    </>
                    )}                
                    </div>
                ))}    
                <button className="btn my-4 btn-primary"  style={{backgroundColor: '#9ACD32'}} onClick={() => benefitAppend({name: "", detail: "", statistics: ""})}>Add Benefits</button>          
                <h4>Risk of Procedure</h4> 
                {riskFields.map((item, index)=>(
                    <div className="form-row form-group" key={index}>
                    {/* <h3>index : {index}</h3>
                    <h3>length: {arrlength}</h3> */}
                        {index + 1 >= arrlength2?(
                        <>
                            <div className="row">
                                <div className='col-6'>
                                    <input type="text" placeholder='Enter Risks Name' className="form-control" defaultValue={item.name} {...register(`risks.${index}.name`)} />
                                </div>
                                <div className='col-6'>
                                    <input type="text" placeholder='Enter Risks Statics' className="form-control" defaultValue={item.statistics} {...register(`risks.${index}.statistics`)} />
                                </div>
                            </div>
                            <div className="col my-2">
                                <div className='lft-div'>
                                    <input type="text" defaultValue={item.detail} {...register(`risks.${index}.detail`)} className="form-control" placeholder="Add Risk" />
                                </div>
                                <div className='button-div'>
                                    <button className="btn btn-danger my-2"  onClick={() => riskRemove(index)}><AiOutlineMinus /></button>
                                </div>
                            </div>
                        </>
                        ):index === editId? (
                        <>
                            <div className="col my-2">
                                <input type="text" defaultValue={`item.${editId}.detail`} {...register(`risks.${index}.detail`)} className="form-control" placeholder="Enter Your First name" />
                            </div>
                            
                            <button className="btn btn-danger my-2" onClick={() => riskRemove(index)}>Remove</button>
                            {/* <button className="btn ml-3 btn-danger my-2" onClick={() => setEditId(null)}>Update</button> */}
                        </>
                        ):(
                        <>
                            <table className="table">
                            {index < 1 && (
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Risk</th>
                                        <th scope="col">Description</th>
                                        <th scope="col">Statics</th>
                                        <th scope="col">Remove</th>
                                    </tr>
                                </thead>
                            ) }
                            <tbody>
                                <tr>
                                    <th style={{width: '4%'}} scope="row">{index + 1}</th>
                                    <td style={{width: '18%'}} >{risksArr[index].name}</td>
                                    <td style={{width: '44%'}}>{risksArr[index].detail}</td>
                                    <td style={{width: '18%'}}>{risksArr[index].statistics}</td>
                                    <td style={{width: '7%'}}><button className='btn btn-info px-1' onClick={() => riskRemove(index)}>Remove</button></td>
                                </tr>
                            </tbody>
                        </table>
                        {/* <ul className='mb-0'>
                            <li><b>{risksArr[index].risk} <button className="btn btn-danger my-2 min-btn" onClick={() => riskRemove(index)}><AiOutlineMinus /></button></b></li>
                        </ul> */}
                        {/* <table key={index} style={{border: '1px solid black', width: '100%'}}>
                            <tbody>
                            <tr>
                                <td className="px-2 py-2">{firstname[index].fname}</td>
                                <td><button className="btn btn-danger my-2" onClick={() => remove(index)}><AiOutlineMinus /></button></td>
                                <td><button className="btn btn-danger my-2" onClick={() => setEditId(index)}>Edit</button></td>
                            </tr>
                            </tbody>
                        </table> */}
                        </>
                        )}                
                        </div>
                    ))}    
                    <button className="btn my-4 btn-primary" style={{backgroundColor: '#9ACD32'}} onClick={() => riskAppend({name: "", detail: "", statistics: ""})}>Add Risk</button>          
        {/* <br /><button className='btn btn-success mb-3' onClick={() => additonalPoints()} type='submit'>Submit</button> */}
        </form>)}
    </div>
  )
}

export default NestedArray