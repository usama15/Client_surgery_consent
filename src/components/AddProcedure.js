import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {Container, Row, Col, InputGroup, Form, Button} from 'react-bootstrap'
import { useForm, useFieldArray, Controller } from 'react-hook-form'
import {AiOutlineMinus} from 'react-icons/ai';
import Select from 'react-select';
import GetServerUrl from '../GetServerUrl';

const AddProcedure = () => {
  const {register, handleSubmit, control, watch, reset, formState: {errors}} = useForm()
  const [procedures, setProcedures] = useState(null)
  const [benefitsOp, setBenefitsOp] = useState(null)
  const [benefits, setBenefits] = useState(null)
  const [risksOp, setRisksOp] = useState(null)
  const [risks, setRisks] = useState(null)
  const {
        append: benefitAppend, 
        fields: benefitFields, 
        remove: benefitRemove
    } = useFieldArray({ control, name: "benefits" }) 
    
    
    const {
        append: riskAppend,
        fields: riskFields,
        remove: riskRemove
    } = useFieldArray({control, name: "risks"})


    useEffect(() => {
      axios.get(`${GetServerUrl()}/admin/procedurenames`)
      .then((response) => {
        const resData = response.data.pronames;
        let procedureOptions = []
        resData && resData.map((item) => (
          procedureOptions.push({
            label: item.name,
            value: item.name
          })
        ))
        setProcedures(procedureOptions);        
      }).catch((err) => {
        console.log("Error : ", err)
      })
    }, [])

    


    useEffect(() => {
      axios.get(`${GetServerUrl()}/admin/benefits`)
      .then((response) => {
        const resData = response.data.benefits;
        let benOptions = []
        resData && resData.map((item, index) => (
          benOptions.push({
            label: item.name,
            value: index
          })
        ))
        setBenefitsOp(benOptions);
        setBenefits(response.data.benefits);        
      }).catch((err) => {
        console.log("Error : ", err)
      })
    }, [])

    useEffect(() => {
      axios.get(`${GetServerUrl()}/admin/risks`)
      .then((response) => {
        const resData = response.data.risks;
        let benOptions = []
        resData && resData.map((item, index) => (
          benOptions.push({
            label: item.name,
            value: index
          })
        ))
        setRisksOp(benOptions);
        setRisks(response.data.risks);        
      }).catch((err) => {
        console.log("Error : ", err)
      })
    }, [])




  const onSubmit = (data) => {
    console.log("data1 :  : : ", data)
      let benefitsSend = []

      data.benefits && data.benefits.map((item) => (
        benefitsSend.push(benefits[item.name.value])
      ))
      // console.log("Benefits : ", benefits)
      // console.log("Benefit we will send to server : ", benefitsSend)

      let risksSend = []

      data.risks && data.risks.map((item) => (
        risksSend.push(risks[item.name.value])
      ))
      // console.log("risks : ", risks)
      // console.log("Risk we will send to backend", risksSend)
      const finalData = {
        name: data.name.value,
        benefits: benefitsSend,
        risks: risksSend,
        status: 'Approved'
      }
      console.log("Final Form of data : ", finalData)

      axios.post(`${GetServerUrl()}/admin/procedures`, finalData).then((response) => {
      // axios.post('${GetServerUrl()}/admin/procedures', data).then((response) => {
      alert("Procedure Created Successfully");
      console.log("response : ", response)
      reset("");
    }).catch((err) => {
      alert("Error")
      console.log("Error : ", err)
    })
  }

  return (
    <div className="home-content width-100" style={{width: '100%'}}>
      <div className="sales-boxes width-100 " style={{width: '100%'}}>
        <div className="recent-sales box width-100" style={{width: '100%', minHeight: 'calc(100vh - 130px)'}}>
          <div className="title text-center">Add Procedure</div>
          <div className="form-div">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="row">
                <div className="col-12">
                  <div className="mb-3">
                    <label className='form-label'>Procedure Name</label>
                    <Controller
                      name={'name'}
                      control={control}
                      render={({field}) => <Select 
                          {...field}
                          options={procedures}
                      />}
                    />  
                  </div>
                  <h4>Benefits of Procedure</h4>
                  {benefitFields.map((item, index) => (
                    <div className="mb-3" key={index}>
                      <div className="row">
                        <div className="col-md-11 col-11">
                          <label className='form-label'>Benefit Name</label>
                          <Controller
                            name={`benefits.${index}.name`}
                            control={control}
                            defaultValue={item.name}
                            render={({field}) => <Select 
                                {...field}
                                options={benefitsOp}
                            />}
                            />
                        </div>
                        <div className="col-md-1 col-2">
                              <button type='button' className="btn btn-danger" style={{marginTop: '32px'}} onClick={() => benefitRemove(index)}><AiOutlineMinus /></button>
                        </div>
                      </div>
                    </div>
                  ))}
                <button type='button' onClick={() => benefitAppend({name: ""})} className="btn btn-info mb-3">Add Benefit</button>
                  <h4>Risks of Procedure</h4>
                  {riskFields.map((item, index) => (
                    <div className="mb-3" key={index}>
                      <div className="row">
                        <div className="col-md-11 col-11">
                          <label className='form-label'>Risk Name</label>
                          <Controller
                            name={`risks.${index}.name`}
                            control={control}
                            defaultValue={item.name}
                            render={({field}) => <Select 
                                {...field}
                                options={risksOp}
                            />}
                            />
                        </div>
                        <div className="col-md-1 col-2">
                              <button type='button' className="btn btn-danger" style={{marginTop: '32px'}} onClick={() => riskRemove(index)}><AiOutlineMinus /></button>
                        </div>
                      </div>
                    </div>
                  ))}
                <button type='button' onClick={() => riskAppend({name: ""})} className="btn btn-info mb-3">Add Risk</button>
                <br />
              <button className="btn btn-primary" name="submit">Submit</button>

                </div>
              </div>
            </form>

            {/* <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3">
                <label className="form-label">Procedure Name</label>
                <input type="text" name="fname" {...register("name", {required: true})} className="form-control"  placeholder="write text here" />
                <Controller
                  name={'name'}
                  control={control}
                  render={({field}) => <Select 
                      {...field}
                      options={procedures}
                  />}
                />
                {errors.name && <span className='text-danger'>Procedure Name is required</span>}
              </div>
              <h4>Benefits of Procedure</h4>
              {benefitFields.map((item, index)=>(
                <>
                  <div key={index}>
                    <div className="mb-3">
                       <div className="row">
                        <div className="col-md-11 col-10">
                            <label className="form-label">Benefit Name</label>
                                <Controller
                                    name={`benefits.${index}.name`}
                                    control={control}
                                    defaultValue={item.name}
                                    render={({field}) => <Select 
                                        {...field}
                                        options={benefitsOp}
                                    />}
                                    />
                                    {errors.benefits && <span>Benefit Name is REq</span>}
                        </div>
                        <div className="col-md-1 col-2">
                            <button type='button' className="btn btn-danger" style={{marginTop: '32px'}} onClick={() => benefitRemove(index)}><AiOutlineMinus /></button>
                        </div>
                       </div>
                    </div>
                    </div>
                </>              
              ))}
              <button onClick={() => benefitAppend({name: ""})} className="btn btn-info mb-3">Add Benefit</button>
              
              <h4>Risks of Procedure</h4>
              {riskFields.map((item, index)=>(
                <>
                    <div key={index}>
                    <div className="mb-3">
                       <div className="row">
                        <div className="col-md-11 col-10">
                          <label className="form-label">Risk Name</label>
                            <Controller
                                name={`risks.${index}.name`}
                                control={control}
                                render={({field}) => <Select 
                                    {...field}
                                    options={[{label: 'Pro A', value: '1'}, {label: 'Pro B', value: '2'}, {label: 'Pro C', value: '3'}]}
                                />}
                                />
                        </div>
                        <div className="col-md-1 col-2">
                            <button className="btn btn-danger" type='button' style={{marginTop: '32px'}} onClick={() => riskRemove(index)}><AiOutlineMinus /></button>
                        </div>
                       </div>
                    </div>
                    </div>
                </>              
              ))}
              <button onClick={() => riskAppend({name: ""})} className="btn btn-info mb-3">Add Risk</button>
              
              <br />


              
              <button className="btn btn-primary" name="submit">Submit</button>
            </form> */}
          </div>
          {/* <!-- <div className="button">
            <a href="#">See All</a>
          </div> --> */}
        </div>
        
      </div>
    </div>
  )
}

export default AddProcedure