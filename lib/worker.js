
// eslint-disable-next-line import/no-anonymous-default-export
export default () => {

    // eslint-disable-next-line no-restricted-globals
    self.onmessage = (msg) => {
        
        let maxCount = 500
        let particles = []

        const { width, height } = JSON.parse(msg.data)

        let frameCount = -1

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

            let backgroundStr = ''
            particles.forEach((p, i) => {
                backgroundStr += (i === particles.length - 1) ? `radial-gradient(circle ${p.size}px at ${p.x}px ${p.y}px, ${p.color}, transparent)` : `radial-gradient(circle ${p.size}px at ${p.x}px ${p.y}px, ${p.color}, transparent),`
            })

            postMessage(backgroundStr)

            setTimeout(render, 30)
            
        }

        render()

    }

}