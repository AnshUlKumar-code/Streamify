import { Navigate, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Call from "./pages/Call"
import Friends from "./pages/Friends.jsx"
import Login from "./pages/Login"
import Notification from "./pages/Notification"
import Onboarding from "./pages/Onboarding"
import Signup from "./pages/Signup"
import PageLoader from "./components/PageLoader"
import { Toaster } from "react-hot-toast"
import useAuthUser from "./hooks/useAuthUser"
import Layout from "./components/Layout"
import { useThemeStore } from "./store/useThemeStore.js";
import ChatPage from "./pages/Chat"





function App() {
  const { isLoading, authUser } = useAuthUser();
  const { theme } = useThemeStore();




  const isAuthenticated = Boolean(authUser);
  const isOnboarded = authUser?.isOnboarded;

  if (isLoading) return <PageLoader />


  return (
    <div className="h-screen" data-theme={theme}>
      <Routes >
        <Route path="/" element={isAuthenticated && isOnboarded ?
          (<Layout showSidebar={true}>
            <Home />
          </Layout>) : (<Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />)} />
           <Route
          path="/call/:id"
          element={
            isAuthenticated && isOnboarded ? (
              <Call />
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />
        <Route
          path="/chat/:id"
          element={
            isAuthenticated && isOnboarded ? (
              <Layout showSidebar={false}>
                <ChatPage />
              </Layout>
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />
        <Route
          path="/login"
          element={
            !isAuthenticated ? <Login /> : <Navigate to={isOnboarded ? "/" : "/onboarding"} />
          }
        />
        <Route
          path="/notification"
          element={
            isAuthenticated && isOnboarded ? (
              <Layout showSidebar={true}>
                <Notification />
              </Layout>
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />
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
        <Route 
  path="/friends" 
  element={
    isAuthenticated ? (
      <Layout showSidebar={true}>
        <Friends />
      </Layout>
    ) : (
      <Navigate to="/login" />
    )
  } 
/>
      </Routes>
      <Toaster />
    </div>
  )
}

export default App
