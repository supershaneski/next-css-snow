import { useState, useEffect, useRef } from 'react'
import workerJS from '../lib/worker'

export default () => {

    const mainDiv = useRef()

    const [backgroundStr, setBackgroundStr] = useState('')

    useEffect(() => {

        const width = mainDiv.current.offsetWidth
        const height = mainDiv.current.offsetHeight

        function createBlob(parts, properties) {
            
            parts = parts || []
            properties = properties || {}

            try {
                return new Blob(parts, properties)
            } catch(e) {
                throw e;
            }

        }

        let workerBlob = createBlob([`(${workerJS})()`], { type: 'text/javascript', })

        let worker = new Worker(URL.createObjectURL(workerBlob), {type: 'module'})
        worker.onmessage = (e) => setBackgroundStr(e.data)
        worker.onerror = (err) => console.log(err)

        worker.postMessage(JSON.stringify({width, height}))

        return () => {
            worker.terminate()
        }

    }, [])

    return (
        <>
            <div className="container">
                <div ref={mainDiv} className="main">
                    <div className="snow"></div>
                </div>
            </div>
            <style jsx>{`
            .container {
                position: relative;
                height: 100vh;
            }
            .main {
                background: #333 url('/sapporo-clock-tower.jpeg') no-repeat center;
                background-size: cover;
                position: relative;
                height: 100%;
            }
            .snow {
                background-image: ${backgroundStr};
                position: relative;
                height: 100%;
            }
            `}</style>
        </>
    )
}