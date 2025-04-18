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
                console.log(parsed);
                
              
              if( !parsed["First name"] || !parsed["Last name"] || !parsed.Username ){
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
    const nextButton = () => setStep(step + 1)
    const backButton = () => setStep(step - 1);

     return (
        <div className={`${inter.className} flex w-[480px] h-[655px] bg-white p-8 rounded-lg`}  >
          <AnimatePresence mode="wait" >
          { step === 1 &&
            <motion.div
              key={1}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 999, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 1 }}
            >
                 <Step1 next={nextButton} a={cc} fdata={formdata}  /> 
            </motion.div>}
            { step === 2 &&
             <motion.div
              key={2}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 999, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 1 }}

            >
                   <Step2 a={nextButton} b={backButton} c={cc} fdata={formdata} /> 
            </motion.div>}
            { step === 3 && 
             <motion.div
              key={3}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 999, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 1 }}

            >
                   <Step3 a={nextButton} b={backButton} fdata={formdata} c={cc} />
            </motion.div>}
            { step === 4 &&
             <motion.div
              key={4}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 999, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 1 }}

            >
                <Step4 /> 

            </motion.div>}
          </AnimatePresence>
        </div>
     )
}