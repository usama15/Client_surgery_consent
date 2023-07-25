import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {Container, Row, Col, InputGroup, Form, Button} from 'react-bootstrap'
import { useForm, useFieldArray, Controller } from 'react-hook-form'
import {AiOutlineMinus} from 'react-icons/ai';
import { useNavigate, useParams } from 'react-router-dom';
import Select from 'react-select';
import GetServerUrl from '../GetServerUrl';

const EditProcedure = ({editData}) => {
  const {register, handleSubmit, control, watch, reset, formState: {errors}} = useForm()
  const [procedures, setProcedures] = useState(null)
  const [procedure, setProcedure] = useState(null)
  const [benefitsOp, setBenefitsOp] = useState(null)
  const [benefits, setBenefits] = useState(null)
  const [risksOp, setRisksOp] = useState(null)
  const [risks, setRisks] = useState(null)
  const { id } = useParams()
  console.log("id id id : ", id)
  const navigate = useNavigate();


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
      const getProcedures = async () => {
        await axios.get(`${GetServerUrl()}/admin/procedurenames`)
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
      }

      getProcedures();
    }, [])

    


    useEffect(() => {
      const getBenefits = async () => {  
        const response = await axios.get(`${GetServerUrl()}/admin/benefits`)
        // .then((response) => {
        if(response){
          const resData = response.data.benefits;
          let benOptions = []
          resData && resData.map((item, index) => (
            benOptions.push({
              label: item.name,
              value: item
            })
          ))
          setBenefitsOp(benOptions);
          setBenefits(response.data.benefits);        
        // }).catch((err) => {
        //   console.log("Error : ", err)
        // }) 
          }
      }
      getBenefits();
    }, [])

    useEffect(() => {
      const getBenefits = async () => {
        await axios.get(`${GetServerUrl()}/admin/risks`)
        .then((response) => {
          const resData = response.data.risks; 
          let benOptions = []
          resData && resData.map((item, index) => (
            benOptions.push({
              label: item.name,
              value: item
            })
          ))
          setRisksOp(benOptions);
          setRisks(response.data.risks);        
        }).catch((err) => {
          console.log("Error : ", err)
        })
      }
      getBenefits();
    }, [])

    useEffect(() => {
      const getProcedureById = async () => {  
        const response = await axios.get(`${GetServerUrl()}/admin/procedures/${id}`)
          // .then((response) => { 
            if(response){  
              // for(let i = 0; i < 500; i++){
              //   console.log("funtion", i)
              // }
              // console.log("response data 1: ", response.data)
              // // setProcedure(response.data.procedure)
              // const editPro1 = response.data.procedure;
              // let benOptions = []
              // editPro1.benefits && editPro1.benefits.map((item, index) => {
              //   benefits && benefits.map((ben, ind) => {
              //     if(item.name === ben.name){
              //       benOptions.push({name: {label: item.name, value: item}})
              //     }
              //   }) 
              // })
              console.log("Edit data Edit Data Edit Data  : ", editData)

              let benOptions = []
              editData.benefits && editData.benefits.map((item, index) => {
                benOptions.push({name: {label: item.name, value: item}}) 
              })

              // let risOptions = []
              // editPro1.risks && editPro1.risks.map((item) => { 
              //   risks && risks.map((ris, ind) => {
              //     if(item.name === ris.name) {
              //       risOptions.push({name: {label: item.name, value: item}})
              //     }
              //   })
              // })
              let risOptions = []
              editData.risks && editData.risks.map((item) => { 
                risOptions.push({name: {label: item.name, value: item}})
              })

              // const obj = { 
              //   name: {label: editPro1.name, value: editPro1.name},
              //   benefits: benOptions,
              //   risks: risOptions 
              // }
              const obj = { 
                name: {label: editData.name, value: editData.name},
                benefits: benOptions,
                risks: risOptions 
              }
              console.log("Object reset : ", obj)
              reset(obj)
              setProcedure(obj)
            }
          // }).catch((err) => {
          //     console.log(err)
          // })
        }
        getProcedureById();
        // result: { firstName: 'test', lastName: 'test2' }
    }, [id])

    // useEffect(() => {  
    //     reset(procedure)
    // }, [reset, procedure])



  const onSubmit = (data) => { 
    console.log("data1", data)
      let benefitsSend = []  

      data.benefits && data.benefits.map((item) => (
        // benefitsSend.push(benefits[item.name.value])
        benefitsSend.push(item.name.value)
      ))
      // console.log("Benefits : ", benefits)
      // console.log("Benefit we will send to server : ", benefitsSend)

      let risksSend = []
 
      data.risks && data.risks.map((item) => (
        risksSend.push(item.name.value)
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

      axios.patch(`${GetServerUrl()}/admin/procedures/${id}`, finalData).then((response) => {
      // axios.post(`${GetServerUrl()}/admin/procedures`, data).then((response) => {
      alert("Procedure Updated Successfully");
      console.log("response : ", response)
      navigate('/admin/procedures');
      // reset("");
    }).catch((err) => {
      alert("Error")
      console.log("Error : ", err)
    })
  }

  return (
    <div className="home-content width-100" style={{width: '100%'}}>
      <div className="sales-boxes width-100 " style={{width: '100%'}}>
        <div className="recent-sales box width-100" style={{width: '100%', minHeight: 'calc(100vh - 130px)'}}>
          <div className="title text-center">Edit Procedure</div>
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

export default EditProcedure

















// import axios from 'axios'
// import React, { useEffect, useState } from 'react'
// import {Container, Row, Col, InputGroup, Form, Button} from 'react-bootstrap'
// import { useForm, useFieldArray } from 'react-hook-form'
// import {AiOutlineMinus} from 'react-icons/ai';
// import { useParams } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';


// const EditProcedure = () => {
//     const navigate = useNavigate()
//   const [procedure, setProcedure] = useState(null);
//   const {register, handleSubmit, control, watch, reset, formState: {errors}} = useForm()
//   const { id } = useParams()
//   console.log("id id id : ", id)

//     useEffect(() => {
//         axios.get(`${GetServerUrl()}/admin/procedures/${id}`)
//             .then((response) => { 
//                 console.log(response.data)
//                 setProcedure(response.data.procedure)
//             }).catch((err) => {
//                 console.log(err)
//             }) // result: { firstName: 'test', lastName: 'test2' }
//     }, [id])

//     useEffect(() => {
//         reset(procedure)
//     }, [reset, procedure])

//   const {
//         append: benefitAppend, 
//         fields: benefitFields, 
//         remove: benefitRemove
//     } = useFieldArray({ control, name: "benefits" }) 
    
    
//     const {
//         append: riskAppend,
//         fields: riskFields,
//         remove: riskRemove
//     } = useFieldArray({control, name: "risks"})

//     //benefits array

//     let benefitsArr =[];
//     if(watch('benefits')){
//         benefitsArr = watch('benefits');
//     }
//     console.log(benefitsArr);
    
//     let arrlength = 0;
//     if(benefitsArr !== null){
//         arrlength = benefitsArr.length;
//     }
//     console.log("length : ",arrlength);

//     //risks array

//     let risksArr =[];
//     if(watch('risks')){
//         risksArr = watch('risks');
//     }
//     console.log(risksArr);
//     let arrlength2 = 0;
//     if(risksArr !== null){
//         arrlength2 = risksArr.length;
//     }
//     console.log("length : ",arrlength2);


//   const onSubmit = async (data) => {
//     console.log("data1", data)
//       await axios.patch(`${GetServerUrl()}/admin/procedures/${id}`, data).then((response) => {
//       alert("Procedure Updated Successfully");
//       console.log("response : ", response)
//       reset("");
//       navigate('../admin/procedures');

      
//     }).catch((err) => {
//       alert("Error")
//       console.log("Error : ", err)
//     })
//   }

//   return (
//     <div className="home-content width-100" style={{width: '100%'}}>
//       <div className="sales-boxes width-100 " style={{width: '100%'}}>
//         <div className="recent-sales box width-100" style={{width: '100%', minHeight: 'calc(100vh - 130px)'}}>
//           <div className="title text-center">Edit Procedure</div>
//           <div className="form-div">
//             <form onSubmit={handleSubmit(onSubmit)}>
//               <div className="mb-3">
//                 <label className="form-label">Procedure Name</label>
//                 <input type="text" name="fname" {...register("name", {required: true})} className="form-control"  placeholder="write text here" />
//                 {errors.name && <span className='text-danger'>Procedure Name is required</span>}
//               </div>
//               <h4>Benefits of Procedure</h4>
//               {benefitFields.map((item, index)=>(
//                 <>
//                     <div key={index}>
//                     <div className="row">
//                         <div className="col-md-2">
//                             <div className="mb-3">
//                                 <label className="form-label">Code</label>
//                                 <input type="text" name="code" defaultValue={item.code} {...register(`benefits.${index}.code`, {required: true})} className="form-control"  placeholder="write text here" />
//                             </div>
//                         </div>
//                         <div className="col-md-6">
//                             <div className="mb-3">
//                                 <label className="form-label">Benefit Name</label>
//                                 <input type="text" name="lname" defaultValue={item.name} {...register(`benefits.${index}.name`, {required: true})} className="form-control"  placeholder="write text here" />
//                             </div>
//                         </div>
//                         <div className="col-md-4">
//                             <div className="mb-3">
//                                 <label className="form-label">Statistics</label>
//                                 <input type="text" name="key1" className="form-control" defaultValue={item.statistics} {...register(`benefits.${index}.statistics`, {required: true})}  placeholder="write text here" />
//                             </div>
//                         </div>
//                     </div>
//                     <div className="mb-3">
//                        <div className="row">
//                         <div className="col-md-11 col-10">
//                             <label className="form-label">Explaination</label>
//                             <input type="text" name="key1"defaultValue={item.detail} {...register(`benefits.${index}.detail`, {required: true})}  className="form-control"  placeholder="write text here" />
//                         </div>
//                         <div className="col-md-1 col-2">
//                             <button className="btn btn-danger" style={{marginTop: '32px'}} onClick={() => benefitRemove(index)}><AiOutlineMinus /></button>
//                         </div>
//                        </div>
//                     </div>
//                     </div>
//                 </>              
//               ))}
//               <button onClick={() => benefitAppend({code: "", name: "", detail: "", statistics: ""})} className="btn btn-info mb-3">Add Benefit</button>
              
//               <h4>Risks of Procedure</h4>
//               {riskFields.map((item, index)=>(
//                 <>
//                     <div key={index}>
//                     <div className="row">
//                         <div className="col-md-2">
//                             <div className="mb-3">
//                                 <label className="form-label">Code</label>
//                                 <input type="text" name="code" defaultValue={item.code} {...register(`risks.${index}.code`, {required: true})} className="form-control"  placeholder="write text here" />
//                             </div>
//                         </div>
//                         <div className="col-md-6">
//                             <div className="mb-3">
//                                 <label className="form-label">Benefit Name</label>
//                                 <input type="text" name="lname" defaultValue={item.name} {...register(`risks.${index}.name`, {required: true})} className="form-control"  placeholder="write text here" />
//                             </div>
//                         </div>
//                         <div className="col-md-4">
//                             <div className="mb-3">
//                                 <label className="form-label">Statistics</label>
//                                 <input type="text" name="key1" className="form-control" defaultValue={item.statistics} {...register(`risks.${index}.statistics`, {required: true})}  placeholder="write text here" />
//                             </div>
//                         </div>
//                     </div>
//                     <div className="mb-3">
//                        <div className="row">
//                         <div className="col-md-11 col-10">
//                             <label className="form-label">Explaination</label>
//                             <input type="text" name="key1"defaultValue={item.detail} {...register(`risks.${index}.detail`, {required: true})}  className="form-control"  placeholder="write text here" />
//                         </div>
//                         <div className="col-md-1 col-2">
//                             <button className="btn btn-danger" style={{marginTop: '32px'}} onClick={() => riskRemove(index)}><AiOutlineMinus /></button>
//                         </div>
//                        </div>
//                     </div>
//                     </div>
//                 </>              
//               ))}
//               <button onClick={() => riskAppend({code: "", name: "", detail: "", statistics: ""})} className="btn btn-info mb-3">Add Risk</button>
              
//               <br />


              
//               <button className="btn btn-primary" name="submit">Submit</button>
//             </form>
//           </div>
//           {/* <!-- <div className="button">
//             <a href="#">See All</a>
//           </div> --> */}
//         </div>
        
//       </div>
//     </div>
//   )
// }

// export default EditProcedure