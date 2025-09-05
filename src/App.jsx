import { useEffect, useState } from "react"

const App = () => {
  const [results,setResults] = useState([])
  const [isVisible,setIsVisible] = useState(false)
  const [input,setInput] = useState('')
  const FROM = 0;
  const TO = 7;

  const fetchData = async () => {
    const data = await fetch("https://dummyjson.com/recipes/search?q=" + input)
    const json = await data.json()
    setResults(json.recipes)
  }

  useEffect(()=>{
    const timer = setTimeout(input && fetchData,200)
    return ()=>{
      clearTimeout(timer)
    }
  },[input])


  return (
    <main>
      <div className="container">
        <input placeholder="Search something..." type="text" value={input} onChange={(e)=>setInput(e.target.value)} onFocus={()=>setIsVisible(true)} onBlur={()=>setIsVisible(false)} />
        {input &&
          <ul style={{display:`${isVisible ? "block" : "none"}`}}>
          {
          results.slice(FROM,TO).map((r,i)=>(
            <li key={i}>{r.name}</li>
          ))
          }
        </ul>
        }
      </div>
    </main>
  )
}

export default App
