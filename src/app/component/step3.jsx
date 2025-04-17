import { useRef, useState } from "react";

export const Step3 = ({a,b,fdata, c}) => {
    const [zurag, setzurag] = useState(null)
    const inputrefee = useRef(null)
    const [err, seterr] = useState({});
    const handleImage = (e) => {
        const file = e.target.files[0]
        if(file){
            const url = URL.createObjectURL(file);
            setzurag(url)
            seterr({...err, zurag : null } )
        }
    }

    const handleClick = () => {
        inputrefee.current.click();
    }
    const remove = () => {
        setzurag(null)
        inputrefee.current.value = null;
    }
    const testAge = (v) => {
        const born = new Date(v);
        const today = new Date();
        const age = today.getFullYear() - born.getFullYear();
        const month = today.getMonth() - born.getMonth();
        return age > 18 || (age === 18 && month >= 0 )
    }
    const next = () => {
        const error = {};
        console.log(error);
        
        if(!fdata.birthdata){
           error.birthdata = "tursun udruu oruul";
        }else if( !testAge(fdata.birthdata) ){
            error.birthdata = "ta nasand hureegui bn bandia";
        }
        if(!zurag){
            error.zurag = "zuragaa oruulna uu";
        }
        seterr(error);
        if( Object.keys(error).length === 0 ){
            console.log("final data", fdata );
            
            a();
        }
    }
    return (
        <div>
            <input type="date" 
              value={ fdata.birthdata || "" }
              className="border"
              onChange={ (e) =>{ 
                c("birthdata", e.target.value);
                seterr( { ...err, birthdata: null } )
              }}
            /> 
             { err.birthdata && 
                <p className="text-red-300" > {err.birthdata} </p>
             }
         
            <div onClick={handleClick} className="w-[200px] h-[200px] bg-amber-300" >
               <input type="file" onChange={handleImage} ref={inputrefee} className="hidden" />

                { zurag ? (
                    <img src={zurag} alt="" />
                ) : (
                    <p> zurag songoh</p>
                )
                }
                { zurag && 
                   <button onClick={ (e) => { e.stopPropagation(); remove(); } } > remove </button>
                }
             </div>
                { err.zurag && 
                    <p className="text-red-500" > {err.zurag} </p>
                }
            <button onClick={next} >next</button>
            <button onClick={b} >back</button>
          
        </div>
    )
}