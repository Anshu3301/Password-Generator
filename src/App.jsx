import { useCallback, useState, useEffect, useRef } from 'react'


function App() {

  const [length, setLength] = useState(6)
  const [numadded, setNumadded] = useState(false)
  const [charadded, setCharadded] = useState(false)
  const [password,setPassword] = useState('')
  const [buttonText, setButtonText] = useState("Copy");


  let mypassword = '';
  let randoms = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let passwordgenerator = useCallback(() => {         // useCallback(fn,dependencies)=>(()=>{},[d1,d2,...])
    mypassword = '';
    randoms = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    if(numadded){ randoms+='0123456789'}
    if(charadded){ randoms+='~!@#$%^&*()_+-'}


      for (let i=0; i<length; i++) {
        mypassword +=  randoms[Math.floor(Math.random()*randoms.length)]
      }

      setPassword(mypassword);
  },[length,numadded,charadded,setPassword])


  useEffect(()=>{passwordgenerator(),setButtonText("Copy")},[length,numadded,charadded,passwordgenerator]);

  let referenceofinput = useRef(null);

  const copypassword = ()=>{
    window.navigator.clipboard.writeText(password);
    // referenceofinput.current?.select();
    setButtonText("Copied");
  }

  return (
    <>
      <h1 className='text-white text-2xl text-center font-semibold '>Password Generator</h1>
      <div className='bg-orange-500 h-20 w-screen grid place-items-center'>
        <div className='w-96 flex justify-center '>
           <input type="text" value={password} readOnly ref={referenceofinput} className='inline w-[84%] h-8 rounded-s-md outline-none text-lg font-mono' onLoad={passwordgenerator}/>
           <button type='submit' className='py-1 w-16 text-center bg-blue-500 text-white rounded-e-md hover:bg-blue-700' onClick={copypassword}>{buttonText}</button>
        </div>
        <div> 
          <input type="range" name="" id="" min={6} max={15} value={length} className='cursor-pointer' onChange={(e)=>{setLength(e.target.value)}}/>
          <span> Length:{length} </span>
          <label>
            <input type="checkbox" name="" id="" className='cursor-pointer' defaultChecked={numadded} onChange={()=>{setNumadded((prev)=>!prev)}}/>
            <span> Numbers </span>
          </label>
          <label>
            <input type="checkbox" name="" id="" className='cursor-pointer' defaultChecked={charadded} onChange={()=>{setCharadded((prev)=>!prev)}}/>
            <span> Characters</span>
          </label>
        </div>
      </div>
     
    </>
  )
}

export default App;
