import { useEffect, useRef, useState } from "react"

const useImageLoaded = () => {
    const [loaded, setLoaded] = useState(false)
    const ref = useRef()
  
    const onLoad = () => {
      setLoaded(true)
    }
  
    useEffect(() => {
      if (ref.current && ref.current.complete) {
        onLoad()
      }
    })
  
    return [ref, loaded, onLoad]
  }
  export default useImageLoaded;