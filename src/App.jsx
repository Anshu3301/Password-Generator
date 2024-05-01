import { useCallback, useState, useEffect, useRef } from 'react'


function App() {

  const [length, setLength] = useState(6)
  const [numadded, setNumadded] = useState(false)
  const [charadded, setCharadded] = useState(false)
  const [upperadded, setupperadded] = useState(false)
  const [password,setPassword] = useState('')
  const [buttonText, setButtonText] = useState("Copy");


  let mypassword = '';
  let randoms = 'abcdefghijklmnopqrstuvwxyz';
  let passwordgenerator = useCallback(() => {         // useCallback(fn,dependencies)=>(()=>{},[d1,d2,...])
    mypassword = '';
    randoms = 'abcdefghijklmnopqrstuvwxyz';
    if(numadded){ randoms+='0123456789'}
    if(charadded){ randoms+='~!@#$%^&*()_+-'} 
    if(upperadded){ randoms+="ABCDEFGHIJKLMNOPQRSTUVWXYZ"}

    // console.log(length);
      for (let i=0; i<length; i++) {
        mypassword +=  randoms[Math.floor(Math.random()*randoms.length)]
      }

      setPassword(mypassword);
  },[length,numadded,charadded,upperadded,setPassword])


  useEffect(()=>{passwordgenerator(),setButtonText("Copy")},[length,numadded,charadded,upperadded,passwordgenerator]);

  let referenceofinput = useRef(null);

  const copypassword = ()=>{
    window.navigator.clipboard.writeText(password);
    // referenceofinput.current?.select();
    setButtonText("Copied");
  }

  return (
    <>
    <div className='h-screen w-screen grid place-items-center'>
    <div className='w-96 h-96 relative bg-cyan-500 grid place-items-center rounded-md'>
    <h1 className='text-blue-950 text-2xl text-center font-semibold flex-wrap tracking-wider text-pretty'>PASSWORD  GENERATOR</h1>
      <div className='h-80 w-96'>
        <div className='w-full flex justify-center mt-5 relative '>
           <input type="text" value={` ${password}`} readOnly ref={referenceofinput} className='inline w-[75%] h-10 rounded-s-md outline-none text-lg font-mono' onLoad={passwordgenerator}/>
           <button type='submit' className='py-1 w-16 text-center bg-blue-500 text-black rounded-e-md hover:bg-blue-700 hover:text-white' onClick={copypassword}>{buttonText}</button>
        </div>
        <div className='w-full flex flex-col justify-center mt-5'>
          <label className='w-[92.5%] h-10 flex items-center bg-lime-500 ml-4 my-2 rounded-md'>
            <span className='text-lg ml-1 text-black'> Length: {length} </span>
            <input type="range" name="" id="" min={6} max={20} value={length} className='cursor-pointer w-[58%] inline ml-14 accent-blue-500' onChange={(e)=>{setLength(e.target.value)}}/>
          </label>          
          <label className='w-[92.5%] h-10 flex items-center cursor-pointer bg-lime-500 ml-4 my-2 rounded-md'>
            <span className=' text-lg ml-1'>Include Uppercase (A-Z)</span>
            <input type="checkbox" name="" id="" className='h-6 w-6 ml-[37%] accent-blue-500' defaultChecked={upperadded} onChange={()=>{setupperadded((prev)=>!prev)}}/>
          </label>
          <label className='w-[92%] h-10 flex items-center cursor-pointer bg-lime-500 ml-4 my-2 rounded-md'>
            <span className=' text-lg ml-1'>Include Numbers (0-9) </span>
            <input type="checkbox" name="" id="" className='h-6 w-6 ml-36 accent-blue-500' defaultChecked={numadded} onChange={()=>{setNumadded((prev)=>!prev)}}/>
          </label>
          <label className='w-[92%] h-10 flex items-center cursor-pointer bg-lime-500 ml-4 my-2 rounded-md'>
            <span className=' text-lg ml-1'>Include Symbols (@-#)</span>
            <input type="checkbox" name="" id="" className='h-6 w-6 ml-[40.4%] accent-blue-500' defaultChecked={charadded} onChange={()=>{setCharadded((prev)=>!prev)}}/>
          </label>
        </div>
      </div>
    </div>
    </div>
    
     
    </>
  )
}

export default App;
