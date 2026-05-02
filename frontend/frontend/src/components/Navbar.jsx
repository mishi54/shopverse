import { Link } from "react-router-dom"
import { useState, useEffect } from "react"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 w-full flex justify-between items-center px-6 md:px-16 py-5 z-[100] transition-all duration-500 ${scrolled ? "bg-black/60 backdrop-blur-xl py-4 border-b border-white/5" : "bg-transparent"}`}>
      
      <Link to="/" className="flex items-center gap-2">
        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
          <div className="w-4 h-4 bg-black rotate-45"></div>
        </div>
        <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white">
          ShopVerse
        </h1>
      </Link>

      <div className="hidden md:flex items-center gap-8">
        <Link to="/" className="text-sm font-medium hover:text-white text-gray-400 transition-colors">Products</Link>
        <Link to="/" className="text-sm font-medium hover:text-white text-gray-400 transition-colors">Categories</Link>
        <Link to="/" className="text-sm font-medium hover:text-white text-gray-400 transition-colors">About</Link>
      </div>

      <div className="flex items-center gap-4">
        <Link to="/login" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Login</Link>
        <Link to="/signup" className="px-6 py-2.5 bg-white text-black text-sm font-bold rounded-full hover:bg-gray-200 transition-all active:scale-95">
          Join Now
        </Link>
      </div>

    </nav>
  )
}