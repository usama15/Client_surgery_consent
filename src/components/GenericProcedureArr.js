import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Controller, useFieldArray } from "react-hook-form";
import { AiOutlineMinus } from 'react-icons/ai';
import Select from 'react-select';
import GetServerUrl from '../GetServerUrl';
import { FiMinus } from 'react-icons/fi';


const GenericProcedureArr = ({ nestIndex, control, register, watch, reset, setBenPoints, setRisPoints, benPoints, risPoints, ids, setIds }) => {
  const [count, setCount] = useState(0)
  const [count2, setCount2] = useState(0)
  const [num, setNum] = useState(0)
  const [benefitsOp, setBenefitsOp] = useState([])
  const [benefits, setBenefits] = useState([])
  const [risksOp, setRisksOp] = useState([])
  const [risks, setRisks] = useState([])
  
  const {
      fields: benefitFields,
      remove: benefitRemove,
      append: benefitAppend 
    } = useFieldArray({ control, name: `Procedure[${nestIndex}].benefits` }) 
    
  const {
      fields: ngenbenefitFields,
      remove: ngenbenefitRemove,
      append: ngenbenefitAppend 
    } = useFieldArray({ control, name: `Procedure[${nestIndex}].nbenefits` }) 
    
    
    const {
        append: riskAppend,
        fields: riskFields,
        remove: riskRemove
    } = useFieldArray({control, name: `Procedure[${nestIndex}].risks`})
    
    const {
        append: ngenriskAppend,
        fields: ngenriskFields,
        remove: ngenriskRemove
    } = useFieldArray({control, name: `Procedure[${nestIndex}].nrisks`})

    let proceduresArr = []

    if(watch('Procedure')) {
        proceduresArr = watch('Procedure');
    }

    useEffect(() => {
        axios.get(`${GetServerUrl()}/admin/benefits`)
        .then((response) => {
            // const dummy = response.data.benefits;
            let beneArray = []
            response.data.benefits && response.data.benefits.map((item, index) => (
                beneArray.push({label: `${item.name} - ${item.detail} - ${item.statistics}`, value: {code: item.code, name: item.name, detail: item.detail, statistics: item.statistics}})
            ))
            console.log("response data benefits : ", response.data)
            console.log("benefits Option Array : ", beneArray)
            setBenefitsOp(beneArray)
            setBenefits(response.data.benefits)
        }).catch((err) => {
            console.log("Error ", err)
        })
    }, [])


    useEffect(() => {
        axios.get(`${GetServerUrl()}/admin/risks`)
        .then((response) => {
            // const dummy = response.data.benefits;
            let risArray = []
            response.data.risks && response.data.risks.map((item, index) => (
                risArray.push({label: `${item.name} - ${item.detail} - ${item.statistics}`, value: {code: item.code, name: item.name, detail: item.detail, statistics: item.statistics}})
            ))
            console.log("response data benefits : ", response.data)
            console.log("benefits Option Array : ", risArray)
            setRisksOp(risArray)
            setRisks(response.data.benefits)
        }).catch((err) => {
            console.log("Error ", err)
        })
    }, [])
    
//     useEffect(() => {
//         if(watch(`Procedure[${nestIndex}.name]`)) {
//         console.log("watch Select Procedure : ", watch(`Procedure[${nestIndex}.name]`))
//         const search = watch(`Procedure[${nestIndex}.name]`);
//         axios.get(`${GetServerUrl()}/admin/search?query=${search.value}`).then((response) => {
//             // setProcedure(response.data.procedure)
//             // setPid(procedure._id)
//             alert("ADFdf")
//             // const dummy = response.data.procedure
//             // console.log(" dummy one ", dummy)
//             // setBen(dummy.benefits.length)
//             // setRisk(dummy.risks.length)
//             console.log(response.data)
//             // setBen(response.data.procedure.benefits.length)
//             // console.log(data)
//             // reset(resetObj)

//             let uniBenifts = [] 
//             let uniRisks = [] 
            
//             if (proceduresArr.length > 1) {
//                 alert("contains : ", proceduresArr.length);
//                 let allBens = [...proceduresArr.map(pro => pro.benefits)]
//                 let sepBens = []
//                 for(let i=0; i < allBens.length; i++) {
//                     sepBens = [...sepBens, ...allBens[i]]
//                 }
//                 console.log("All to all benefits : ", allBens);
//                 console.log("All single benefits : ", sepBens);
//                 console.log("Response data benefits : ", response.data.procedure.benefits);
//                 response.data.procedure.benefits.map((item) => {
//                     // console.log("item.code : ", item.code)
//                     let flag = false;
//                     for(let a = 0; a < sepBens.length; a++){
//                         // console.log("sepbens[index]", sep)
//                         if(item.code === sepBens[a].code){
//                             flag =true;
//                         }
//                     }
//                     if(flag === false){
//                         uniBenifts = [...uniBenifts, item]
//                     }
//                 })
                
//                 let allRis = [...proceduresArr.map(pro => pro.risks)]
//                 let sepRis = []
//                 for(let i=0; i < allRis.length; i++) {
//                     sepRis = [...sepRis, ...allRis[i]]
//                 }
                
//                 response.data.procedure.risks.map((item) => {
//                     // console.log("item.code : ", item.code)
//                     let flag = false;
//                     for(let a = 0; a < sepRis.length; a++){
//                         // console.log("sepRis[index]", sep)
//                         if(item.code === sepRis[a].code){
//                             flag =true;
//                         }
//                     }
//                     if(flag === false){
//                         uniRisks = [...uniRisks, item]
//                     }
//                 })

//                 console.log("Uni unique Benefit : ", uniBenifts)
                
//                 console.log("+++++++++++++++++++++++++++++")
//                 console.log("+++++++++++++++++++++++++++++")
//                 console.log("+++++++++++++++++++++++++++++")
//                 console.log("Unique benefits : ", uniBenifts)
//             } else {
//                 alert("empty");
//                 uniBenifts = response.data.procedure.benefits; 
//                 uniRisks = response.data.procedure.risks; 
//             }
//             const bens = response.data.procedure.benefits

//             // benefitAppend(benObj)
//             setIds([...ids, response.data.procedure._id])
//             benefitAppend(uniBenifts)
//             // benefitAppend(response.data.procedure.benefits)
//             if(uniBenifts){
//                 setBenPoints([...benPoints, uniBenifts.length])
//             } else {
//                 setBenPoints([...benPoints, 0])
//             }
//             const rises = response.data.procedure.risks
//             if (uniRisks) {
//                 setRisPoints([...risPoints, uniRisks.length])
//             } else {
//                 setRisPoints([...risPoints, 0])
//             }
//             riskAppend(uniRisks)
//             setNum(num+1);
//             setCount(count+1);
//             setCount2(count2+1);
//         }).catch((err) => {
//             console.log("Error : ", err)
//         })

//     }        
//   }, [watch(`Procedure[${nestIndex}.name]`)?.value])
  
    let benefitsArr = [];
    
    if(watch(`Procedure[${nestIndex}].benefits`)){
        benefitsArr[nestIndex] = watch(`Procedure[${nestIndex}].benefits`);
        console.log("Benefit arrays at index : ", watch(`Procedure[${nestIndex}].benefits`))
    }
    console.log("Watcg pro ", watch(`Procedure`))
    console.log("Benfit array", benefitsArr[nestIndex]);
    // console.log(" length of array : ",firstname.length)
    
    let arrlength = [];
    if(benefitsArr[nestIndex]){
        console.log("length error : ", benefitsArr[nestIndex])
        arrlength[nestIndex] =  benefitsArr[nestIndex].length;
    }
    console.log(`length ${nestIndex} : `,arrlength[nestIndex]);
    
    let risksArr =[];
    if(watch(`Procedure[${nestIndex}].risks`)){
        risksArr[nestIndex] = watch(`Procedure[${nestIndex}].risks`);
    }
    console.log(risksArr);

    let arrlength2 = [];
    if(risksArr[nestIndex]){
        arrlength2[nestIndex] = risksArr[nestIndex].length;
    }
    console.log("length : ",arrlength2);

  return (
    <div>
        <h3 className='py-2'>Add Benefits & Risks From Database</h3>
        {/* {num > 0 && ( */}
            <h4>Benefits Of Procedure</h4>
        {/* ) } */}
        {benefitFields.map((item, k) => {
            return (
                <div key={k}>
                    <div className="col my-2">
                        <div className='lft-div'>
                            <Controller
                                name={`Procedure[${nestIndex}].benefits[${k}].newbenefit`}
                                control={control}
                                render={({field}) => <Select 
                                    {...field}
                                    options={benefitsOp}
                                />}
                            />
                        </div>
                        <div className='button-div'>
                            <button type="button" className="btn my-2" onClick={() => benefitRemove(k)}> <FiMinus color='green' size="29" /></button>
                        </div>
                    </div>                    
                    {/* {k + 1 >= arrlength[nestIndex] || count === 0  ? (
                        <>
                            <div className="row">
                               // <div className='col-6'>
                               //     <input type="text" placeholder='Enter Benefit Name' className="form-control" defaultValue={item.name} {...register(`Procedure[${nestIndex}].benefits[${k}].name`)} />
                               // </div>
                               // <div className='col-6'>
                                 //   <input type="text" placeholder='Enter Benefit Statics' className="form-control" defaultValue={item.statistics} {...register(`Procedure[${nestIndex}].benefits[${k}].statistics`)} />
                                //</div>      
                                <div className="col my-2">
                                    <div className='lft-div'>
                                        //<input type="text" defaultValue={item.detail} {...register(`Procedure[${nestIndex}].benefits[${k}].detail`)} className="form-control" placeholder="Add Benefit" />
                                        <Controller
                                            name={`Procedure[${nestIndex}].benefits[${k}].newbenefit`}
                                            control={control}
                                            render={({field}) => <Select 
                                                {...field}
                                                options={benefitsOp}
                                            />}
                                        />
                                    </div>
                                    <div className='button-div'>
                                        <button type="button" className="btn btn-danger my-2" onClick={() => benefitRemove(k)}><AiOutlineMinus /></button>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                        <table className="table">
                            {k < 1 && (
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
                                    <th style={{width: '4%'}} scope="row">{k + 1}</th>
                                    <td style={{width: '18%'}} >{benefitsArr[nestIndex] && benefitsArr[nestIndex][k].name}</td>
                                    <td style={{width: '44%'}}>{benefitsArr[nestIndex] && benefitsArr[nestIndex][k].detail}</td>
                                    <td style={{width: '18%'}}>{benefitsArr[nestIndex] && benefitsArr[nestIndex][k].statistics}</td>
                                    <td style={{width: '7%'}}><button className='btn btn-info px-1' onClick={() => benefitRemove(k)}>Remove</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </>
                    )} */}
                </div>
            )
        })}
        {/* {num > 0 && (
            <> */}
                <button type="button" className='btn btn-success mb-3' onClick={() => {
                    benefitAppend({newbenefit: ""});
                    if(arrlength[nestIndex] > 0) {
                    setCount(1)
                    }
                    }}>Add Benefit</button>
                <h4>Risks Of Procedure</h4>
            {/* </>
        )} */}
        {riskFields.map((item, k) => {
            return (
                <div key={k}>
                    <div className="row">
                        <div className="col my-2">
                                <div className='lft-div'>
                                    {/* <input type="text" defaultValue={item.detail} {...register(`Procedure[${nestIndex}].risks.${k}.detail`)} className="form-control" placeholder="Add Risk" /> */}
                                    <Controller
                                        name={`Procedure[${nestIndex}].risks[${k}].newrisk`}
                                        control={control}
                                        render={({field}) => <Select 
                                            {...field}
                                            options={risksOp}
                                        />}
                                    />
                                </div>
                                <div className='button-div'>
                                    <button type="button" className="btn  my-2"  onClick={() => riskRemove(k)}><FiMinus color='green' size="29" /></button>
                                </div>
                            </div>
                    </div>
                    {/* {k + 1 >= arrlength2[nestIndex] || count2 === 0 ? (
                        <>
                            <div className="row">
                                <div className='col-6'>
                                    <input type="text" placeholder='Enter Risks Name' className="form-control" defaultValue={item.name} {...register(`Procedure[${nestIndex}].risks.${k}.name`)} />
                                </div>
                                <div className='col-6'>
                                    <input type="text" placeholder='Enter Risks Statics' className="form-control" defaultValue={item.statistics} {...register(`Procedure[${nestIndex}].risks.${k}.statistics`)} />
                                </div>
                            </div>
                            <div className="col my-2">
                                <div className='lft-div'>
                                    <input type="text" defaultValue={item.detail} {...register(`Procedure[${nestIndex}].risks.${k}.detail`)} className="form-control" placeholder="Add Risk" />
                                    <Controller
                                        name={`Procedure[${nestIndex}].benefits[${k}].newbenefit`}
                                        control={control}
                                        render={({field}) => <Select 
                                            {...field}
                                            options={benefitsOp}
                                        />}
                                    />
                                </div>
                                <div className='button-div'>
                                    <button className="btn btn-danger my-2"  onClick={() => riskRemove(k)}><AiOutlineMinus /></button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <table className="table">
                                {k < 1 && (
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
                                        <th style={{width: '4%'}} scope="row">{k + 1}</th>
                                        <td style={{width: '18%'}} >{risksArr[nestIndex] && risksArr[nestIndex][k].name}</td>
                                        <td style={{width: '44%'}}>{risksArr[nestIndex] && risksArr[nestIndex][k].detail}</td>
                                        <td style={{width: '18%'}}>{risksArr[nestIndex] &&risksArr[nestIndex][k].statistics}</td>
                                        <td style={{width: '7%'}}><button type="button" className='btn btn-info px-1' onClick={() => riskRemove(k)}>Remove</button></td>
                                    </tr>
                                </tbody>
                            </table>
                        </>
                    )} */}
                </div>
            )
        })}
        {/* {num > 0 && ( */} 
            <button type="button" onClick={() => {
                riskAppend({newrisk: ""});
                if(arrlength2[nestIndex] > 0) {
                setCount2(1);
                }
            }} className='btn btn-success mb-3'>Add Risk</button>
        {/* )} */}

    <div>
        <h3 className='py-2'>Add New Benefits and Risks</h3>
        <h4 className='py-1'>Benefits of Procedure</h4>
        {ngenbenefitFields.map((item, k) => (
            <>
                <div className="row">
                    <div className='col-6'>
                        <input type="text" placeholder='Enter Bneefit Name' className="form-control" defaultValue={item.name} {...register(`Procedure[${nestIndex}].nbenefits.${k}.name`)} />
                    </div>
                    <div className='col-6'>
                        <input type="text" placeholder='Enter Benefit Statics' className="form-control" defaultValue={item.statistics} {...register(`Procedure[${nestIndex}].nbenefits.${k}.statistics`)} />
                    </div>
                </div>
                <div className="col my-2">
                    <div className='lft-div'>
                        <input type="text" defaultValue={item.detail} {...register(`Procedure[${nestIndex}].nbenefits.${k}.detail`)} className="form-control" placeholder="Add Benefit Detail" />
                        {/* <Controller
                            name={`Procedure[${nestIndex}].benefits[${k}].newbenefit`}
                            control={control}
                            render={({field}) => <Select 
                                {...field}
                                options={benefitsOp}
                            />}
                        /> */}
                    </div>
                    <div className='button-div'>
                        <button className="btn my-2"  onClick={() => ngenbenefitRemove(k)}><FiMinus color='green' size="29" /></button>
                    </div>
                </div>
            </>
        ))}
        <button type="button" onClick={() => {
            ngenbenefitAppend({name: "", statistics: "", detail: ""});
            // if(arrlength2[nestIndex] > 0) {
            // setCount2(1);
            // }
        }} className='btn btn-success mb-3'>Add New Benefit</button>
        <h4 className='mt-3 py-1'>Risks of Procedure</h4>
        {ngenriskFields.map((item, k) => (
            <>
                <div className="row">
                    <div className='col-6'>
                        <input type="text" placeholder='Enter Risks Name' className="form-control" defaultValue={item.name} {...register(`Procedure[${nestIndex}].nrisks.${k}.name`)} />
                    </div>
                    <div className='col-6'>
                        <input type="text" placeholder='Enter Risks Statics' className="form-control" defaultValue={item.statistics} {...register(`Procedure[${nestIndex}].nrisks.${k}.statistics`)} />
                    </div>
                </div>
                <div className="col my-2">
                    <div className='lft-div'>
                        <input type="text" defaultValue={item.detail} {...register(`Procedure[${nestIndex}].nrisks.${k}.detail`)} className="form-control" placeholder="Add Risk Detail" />
                        {/* <Controller
                            name={`Procedure[${nestIndex}].benefits[${k}].newbenefit`}
                            control={control}
                            render={({field}) => <Select 
                                {...field}
                                options={benefitsOp}
                            />}
                        /> */}
                    </div>
                    <div className='button-div'>
                        <button className="btn  my-2"  onClick={() => ngenriskRemove(k)}><FiMinus color='green' size="29" /></button>
                    </div>
                </div>
            </>
        ))}
        <button type="button" onClick={() => {
            ngenriskAppend({name: "", statistics: "", detail: ""});
            // if(arrlength2[nestIndex] > 0) {
            // setCount2(1);
            // }
        }} className='btn btn-success mb-3'>Add New Risks</button>
    </div>
    </div>
  )
}

export default GenericProcedureArr