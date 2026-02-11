import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Call from "./pages/Call"
import Chat from "./pages/Chat"
import Login from "./pages/Login"
import Notification from "./pages/Notification"
import Onboarding from "./pages/Onboarding"
import Signup from "./pages/Signup"


import toast, { Toaster } from "react-hot-toast"



function App() {


  return (
    <div className="h-screen" data-theme="night">
      <Routes >
        <Route path="/" element={<Home />} />
        <Route path="/call" element={<Call />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/login" element={<Login />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <Toaster/>
    </div>
  )
}

export default App
