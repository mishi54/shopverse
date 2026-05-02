import { Link } from "react-router-dom"

export default function Footer() {
  return (
    <footer className="relative bg-black border-t border-white/5 px-6 md:px-16 py-20 z-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-1 md:col-span-1">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-6 h-6 bg-white rounded flex items-center justify-center">
              <div className="w-3 h-3 bg-black rotate-45"></div>
            </div>
            <h1 className="text-xl font-bold tracking-tight text-white">
              ShopVerse
            </h1>
          </div>
          <p className="text-gray-500 text-sm leading-relaxed">
            Revolutionizing the way you shop with immersive 3D technology and premium product curation.
          </p>
        </div>

        <div>
          <h3 className="text-white font-bold mb-6 uppercase tracking-wider text-xs">Products</h3>
          <ul className="space-y-4">
            <li><Link to="/" className="text-gray-500 hover:text-white text-sm transition-colors">Audio Series</Link></li>
            <li><Link to="/" className="text-gray-500 hover:text-white text-sm transition-colors">Wearables</Link></li>
            <li><Link to="/" className="text-gray-500 hover:text-white text-sm transition-colors">Footwear</Link></li>
            <li><Link to="/" className="text-gray-500 hover:text-white text-sm transition-colors">Mobile</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-bold mb-6 uppercase tracking-wider text-xs">Company</h3>
          <ul className="space-y-4">
            <li><Link to="/" className="text-gray-500 hover:text-white text-sm transition-colors">About Us</Link></li>
            <li><Link to="/" className="text-gray-500 hover:text-white text-sm transition-colors">Careers</Link></li>
            <li><Link to="/" className="text-gray-500 hover:text-white text-sm transition-colors">Sustainability</Link></li>
            <li><Link to="/" className="text-gray-500 hover:text-white text-sm transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-bold mb-6 uppercase tracking-wider text-xs">Subscribe</h3>
          <p className="text-gray-500 text-sm mb-4">Join our newsletter for exclusive drops and tech news.</p>
          <div className="flex gap-2">
            <input 
              type="email" 
              placeholder="Email address" 
              className="bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-white/20 w-full"
            />
            <button className="bg-white text-black px-4 py-2 rounded-full text-sm font-bold">
              →
            </button>
          </div>
        </div>
      </div>

      <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-gray-600 text-xs">
          © 2026 ShopVerse Inc. All rights reserved.
        </p>
        <div className="flex gap-8">
          <Link to="/" className="text-gray-600 hover:text-white text-xs transition-colors">Privacy Policy</Link>
          <Link to="/" className="text-gray-600 hover:text-white text-xs transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  )
}
