import { useState } from "react"
import { Step1 } from "./form";
import { Step2 } from "./step2";

 export const Control = () => {
    const [formdata, setformdata] = useState({})
    const [step, setStep ] = useState(1);
    
    const cc = (n,v) => {
      setformdata( {...formdata , [n]: v } )
    } 
    const nextButton = () => {
        setStep(step + 1);
    }
    const backButton = () => {
        setStep(step - 1);
    }

     return (
        <div className="w-[480px] h-[694px] bg-white" >
            { step === 1 && 
               <Step1 next={nextButton} a={cc} fdata={formdata}  />
            }{ step === 2 &&
               <Step2 a={nextButton} b={backButton} c={cc} fdata={formdata} />
            }
        </div>
     )
}