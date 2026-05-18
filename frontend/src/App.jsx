import { useState } from "react"
import axios from "axios"
function App() {
const [message,setmessage] = useState("")
  const getData = async ()=>{
  try{
      const res = await axios.get("http://localhost:8001/")
      setmessage(res.data)
  }
  catch(error){    
    console.log(`${error}`)
  }
  }
  return (
    <>
     <div className= 'text-white w-6'>hello </div>
     <button className="bg-slate-900 w-7 p-9" onClick={getData}>Test</button>
     <h2 className="text-white">{message}</h2>
    </>
  )
}

export default App
