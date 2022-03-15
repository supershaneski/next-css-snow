import { useState, useEffect, useRef } from 'react'

export default () => {

    const mainDiv = useRef()

    const [backgroundStr, setBackgroundStr] = useState('')

    useEffect(() => {

        const width = mainDiv.current.offsetWidth
        const height = mainDiv.current.offsetHeight

        let maxCount = 500
        let particles = []
        let frameCount = -1
        let animId

        const render = () => {

            frameCount = (frameCount + 1) % 30
            
            particles = particles.map(p => {

                p.t = (p.t + 1) % 30

                p.x = p.x + (0.5 * Math.sin(Math.PI * p.t / 15))
                    
                p.y += p.speed

                p.y = p.y >= height ? 0 : p.y

                return p
            })

            if(particles.length < maxCount) {

                if(frameCount === 0) {
                
                    const size = 1 + Math.round(2 * Math.random())
                    const baseSpeed = size === 1 ? 7 : size === 2 ? 4 : 2
                    const range = size === 1 ? 3 : 2
                    const speed = baseSpeed + (range * Math.random())

                    const newp = {
                        size: size,
                        x: 10 + Math.round((width - 20) * Math.random()),
                        y: 0,
                        color: '#fff',
                        speed: speed,
                        t: 0
                    }

                    particles = particles.concat(newp)
                }

            }

            let tmpStr = ''
            particles.forEach((p, i) => {
                tmpStr += (i === particles.length - 1) ? `radial-gradient(circle ${p.size}px at ${p.x}px ${p.y}px, ${p.color}, transparent)` : `radial-gradient(circle ${p.size}px at ${p.x}px ${p.y}px, ${p.color}, transparent),`
            })

            setBackgroundStr(tmpStr)

            animId = window.requestAnimationFrame(render)

        }

        render()

        return () => {
            window.cancelAnimationFrame(render)
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
                /*background: #333 url('/sapporo-clock-tower.jpeg') no-repeat center;
                background-size: cover;*/
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