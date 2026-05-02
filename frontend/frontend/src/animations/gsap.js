import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function createProductStory(camera) {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#main-container",
      start: "top top",
      end: "bottom bottom",
      scrub: 2,
    },
  })
  tl.to(camera.position, { x: 0, y: 0, z: 6, duration: 1 }, 0)
  tl.to(camera.rotation, { x: 0, y: 0, z: 0, duration: 1 }, 0)
  tl.to(camera.position, { x: 6, y: 1, z: -4, duration: 1 }, 1)
  tl.to(camera.rotation, { y: 0.5, duration: 1 }, 1)
  tl.to(camera.position, { x: -6, y: -1, z: -14, duration: 1 }, 2)
  tl.to(camera.rotation, { y: -0.5, duration: 1 }, 2)
  tl.to(camera.position, { x: 0, y: 0, z: -32, duration: 1 }, 3)
  tl.to(camera.rotation, { y: 0, x: 0.1, duration: 1 }, 3)

  return tl
}