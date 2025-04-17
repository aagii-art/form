import { useEffect, useState } from "react"
import { Step1 } from "./form";
import { Step2 } from "./step2";
import { Step3 } from "./step3";
import { Step4 } from "./step4";
import { Inter } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion"
const inter = Inter( { subsets: ["latin"], weight: "variable" } )

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
        console.log("final data is ", formdata);
        localStorage.removeItem("formdata")
      }
      setStep(nextStep);
    }
    const backButton = () => setStep(step - 1);

     return (
        <div className={`${inter.className} flex  w-[480px] h-[655px] bg-white p-8 rounded-lg`}  >
          <AnimatePresence mode="wait" >
            <motion.div
              key={step}
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute w-full h-full"
            >
            { step === 1 && <Step1 next={nextButton} a={cc} fdata={formdata}  /> }
            { step === 2 && <Step2 a={nextButton} b={backButton} c={cc} fdata={formdata} /> }
            { step === 3 &&  <Step3 a={nextButton} b={backButton} fdata={formdata} c={cc} />}
            </motion.div>
            { step === 4 && <Step4 /> } 
          </AnimatePresence>
        </div>
     )
}