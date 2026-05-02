import Scene from "../Scene"
import Navbar from "../Navbar"
import Footer from "../Footer"
import { useEffect } from "react"
import { startLenis } from "../../utils/lenis"

export default function Landing() {
  useEffect(() => {
    startLenis()
  }, [])

  return (
    <div id="main-container" className="relative bg-[#050505] text-white">
      <Navbar />

      <div className="fixed inset-0 w-full h-screen pointer-events-none z-0">
        <Scene />
      </div>

      <section className="relative h-screen flex items-center px-6 md:px-16 z-10">
        <div className="max-w-2xl">
          <span className="text-white/60 uppercase tracking-[0.3em] text-xs font-bold mb-4 block">Future of Audio</span>
          <h1 className="text-6xl md:text-8xl font-extrabold mb-6 leading-tight">
            Sonic <br /> <span className="text-gradient">Immersion.</span>
          </h1>
          <p className="text-lg text-white/50 mb-8 max-w-md">
            Experience sound like never before with ShopVerse's premium wireless acoustics.
          </p>
          <button className="px-8 py-4 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform active:scale-95">
            Pre-order Now
          </button>
        </div>
      </section>

      <section className="relative h-screen flex items-center justify-end px-6 md:px-16 z-10">
        <div className="max-w-xl text-right">
          <span className="text-white/60 uppercase tracking-[0.3em] text-xs font-bold mb-4 block">Time Reimagined</span>
          <h1 className="text-6xl md:text-8xl font-extrabold mb-6 leading-tight">
            Precision <br /> <span className="text-gradient">Craft.</span>
          </h1>
          <p className="text-lg text-white/50 mb-8 ml-auto max-w-md">
            Every second counts. Elevate your style with our limited edition titanium series.
          </p>
          <button className="px-8 py-4 bg-white/10 backdrop-blur-md text-white border border-white/20 font-bold rounded-full hover:bg-white/20 transition-all">
            Explore Series
          </button>
        </div>
      </section>
      <section className="relative h-screen flex items-center px-6 md:px-16 z-10">
        <div className="max-w-xl">
          <span className="text-white/60 uppercase tracking-[0.3em] text-xs font-bold mb-4 block">Performance First</span>
          <h1 className="text-6xl md:text-8xl font-extrabold mb-6 leading-tight">
            Urban <br /> <span className="text-gradient">Velocity.</span>
          </h1>
          <p className="text-lg text-white/50 mb-8 max-w-md">
            Engineered for comfort. Designed for the streets. The new ShopVerse Runners.
          </p>
          <div className="flex gap-4">
            <button className="px-8 py-4 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform">
              Buy Now
            </button>
            <button className="px-8 py-4 glass text-white font-bold rounded-full">
              View Colors
            </button>
          </div>
        </div>
      </section>
      <section className="relative h-screen flex flex-col items-center justify-center text-center px-6 z-10">
        <div className="max-w-3xl">
          <span className="text-white/60 uppercase tracking-[0.3em] text-xs font-bold mb-4 block">The Ultimate Tool</span>
          <h1 className="text-6xl md:text-9xl font-extrabold mb-8 leading-none">
            Simply <br /> <span className="text-gradient">Powerful.</span>
          </h1>
          <p className="text-xl text-white/60 mb-12 max-w-lg mx-auto">
            The most advanced ShopVerse phone yet. AI-driven, design-focused, and incredibly fast.
          </p>
          <button className="px-12 py-5 bg-white text-black text-lg font-bold rounded-full hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all">
            Get Yours
          </button>
        </div>
      </section>

      <Footer />
    </div>
  )
}