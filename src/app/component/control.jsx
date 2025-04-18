import { Step1 } from "./form";
import { Step2 } from "./step2";
import { Step3 } from "./step3";
import { Step4 } from "./step4";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
const inter = Inter( { subsets: ["latin"], weight: "variable" } )

 export const Control = () => {
    const [formdata, setformdata] = useState({})
    const [step, setStep ] = useState(1);
    const nextButton = () => setStep(step + 1);
    const backButton = () => setStep(step - 1);
    
    const cc = (n,v) => {
      const updated = {...formdata , [n]: v };
      setformdata( updated );
      if( typeof window !== "undefined" ){
        localStorage.setItem("formdata", JSON.stringify(updated));
      }
    } 
    const handleStep = () => {
      switch( step ) {
        case 1 : return <Step1 next={nextButton} a={cc} fdata={formdata}  /> ;
        case 2 : return <Step2 a={nextButton} b={backButton} c={cc} fdata={formdata} /> ;
        case 3 : return <Step3 a={nextButton} b={backButton} fdata={formdata} c={cc} /> ;
        case 4 : return <Step4 /> ;
        default : return;
      }
     }
    useEffect( () => {
        if( typeof window !== "undefined" ){
            const savedformData = localStorage.getItem("formdata");
            if( savedformData ){
              const parsed = JSON.parse(savedformData);
              setformdata(parsed);
              if( !parsed["First name"] || !parsed["Last name"] || !parsed.Username ) return setStep(1);
              if( !parsed.Email || !parsed["Phone number"] || !parsed.Password || !parsed["Confirm password"] ) return setStep(2);
              if( !parsed.birthdata ) return setStep(3);
            }
        }
    }, [] )

     return (
        <div className={`${inter.className} ${ step === 4 ? " h-[207px] " : "w-[480px] h-[655px]" } flex bg-white p-8 rounded-lg`} >

          <AnimatePresence mode="wait" >
            <motion.div
              key={1}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 999, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 1 }}
            >
              { handleStep() }
            </motion.div>
          </AnimatePresence>

        </div>
     )
}