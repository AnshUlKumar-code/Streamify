import { Navigate, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Call from "./pages/Call"
import Chat from "./pages/Chat"
import Login from "./pages/Login"
import Notification from "./pages/Notification"
import Onboarding from "./pages/Onboarding"
import Signup from "./pages/Signup"
import PageLoader from "./components/PageLoader"
import { Toaster } from "react-hot-toast"
import useAuthUser from "./hooks/useAuthUser"




function App() {
  const { isLoading, authUser } = useAuthUser();

  if (isLoading) return <PageLoader />
  const isAuthenticated = Boolean(authUser);
  const isOnboarded = authUser?.isOnboarded;



  return (
    <div className="h-screen" data-theme="night">
      <Routes >
        <Route path="/"element={isAuthenticated && isOnboarded ? (<Home />) : (<Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />)}/>
        <Route path="/call" element={isAuthenticated ? <Call /> : <Navigate to="/" />} />
        <Route path="/chat" element={isAuthenticated ? <Chat /> : <Navigate to="/" />} />
           <Route
          path="/login"
          element={
            !isAuthenticated ? <Login /> : <Navigate to={isOnboarded ? "/" : "/onboarding"} />
          }
        />
        <Route path="/notification" element={isAuthenticated ? <Notification /> : <Navigate to="/" />} />
             <Route
          path="/onboarding"
          element={
            isAuthenticated ? (
              !isOnboarded ? (
                <Onboarding />
              ) : (
                <Navigate to="/" />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/signup" element={!isAuthenticated ? <Signup /> : <Navigate to="/" />} />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App
