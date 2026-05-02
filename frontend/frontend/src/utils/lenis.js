import Lenis from "@studio-freight/lenis"

export const lenis = new Lenis({
  duration: 1.2,
  smooth: true,
})

export const startLenis = () => {
  function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }
  requestAnimationFrame(raf)
}