import { useEffect, useState } from "react"
import { Step1 } from "./form";
import { Step2 } from "./step2";
import { Step3 } from "./step3";
import { Step4 } from "./step4";

 export const Control = () => {
    const [formdata, setformdata] = useState({})
    const [step, setStep ] = useState(1);
    
    useEffect( () => {
        if( typeof window !== "undefined" ){
         const savedformData = localStorage.getItem("formdata");
            if( savedformData ){
                const parsed = JSON.parse(savedformData);
                setformdata(parsed);
                if( !parsed["first name"] || !parsed["last name"] || !parsed.username ){
                  setStep(1)
                }else if( !parsed.Email || !parsed["Phone number"] || !parsed.Password || !parsed["Confirm password"] ){
                  setStep(2)
                }else if( !parsed.birthdata  ){
                  setStep(3)
                }
              }
    } }, [] )
    const cc = (n,v) => {
      const updated = {...formdata , [n]: v };
      setformdata( updated );
      if( typeof window !== "undefined" ){
        localStorage.setItem("formdata", JSON.stringify(updated));
      }
    } 
    const nextButton = () => {
      const nextStep = step + 1;
      if( nextStep === 4 ){
        console.log(formdata);
        localStorage.removeItem(formdata)
      }
      setStep(nextStep);
    }
    const backButton = () => setStep(step - 1);

     return (
        <div className="w-[480px] h-[694px] bg-white" >
            { step === 1 && <Step1 next={nextButton} a={cc} fdata={formdata}  /> }
            { step === 2 && <Step2 a={nextButton} b={backButton} c={cc} fdata={formdata} /> }
            { step === 3 &&  <Step3 a={nextButton} b={backButton} fdata={formdata} c={cc} />}
            { step === 4 && <Step4 /> } 
        </div>
     )
}