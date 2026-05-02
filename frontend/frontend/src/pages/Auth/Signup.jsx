export default function Signup() {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-black text-white">
      <div className="glass p-12 rounded-3xl w-full max-w-md text-center">
        <h1 className="text-4xl font-bold mb-8 text-gradient">Join ShopVerse</h1>
        <form className="space-y-6">
          <input type="text" placeholder="Full Name" className="w-full bg-white/5 border border-white/10 px-6 py-4 rounded-2xl focus:outline-none focus:border-white/20" />
          <input type="email" placeholder="Email" className="w-full bg-white/5 border border-white/10 px-6 py-4 rounded-2xl focus:outline-none focus:border-white/20" />
          <input type="password" placeholder="Password" className="w-full bg-white/5 border border-white/10 px-6 py-4 rounded-2xl focus:outline-none focus:border-white/20" />
          <button className="w-full bg-white text-black font-bold py-4 rounded-2xl hover:bg-gray-200 transition-colors">Create Account</button>
        </form>
        <p className="mt-8 text-gray-500 text-sm">Already a member? <span className="text-white cursor-pointer">Login</span></p>
      </div>
    </div>
  )
}
