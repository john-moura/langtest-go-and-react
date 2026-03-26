import React, { Suspense, useEffect } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { GoogleOAuthProvider } from '@react-oauth/google'

import { CSpinner, useColorModes } from '@coreui/react'
import '@/scss/style.scss'

// Containers
const DefaultLayout = React.lazy(() => import('@/coreui-components/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('@/views/pages/login/Login'))
const Register = React.lazy(() => import('@/views/pages/register/Register'))
const Page404 = React.lazy(() => import('@/views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('@/views/pages/page500/Page500'))
const ProtectedRoute = React.lazy(() => import('@/components/ProtectedRoute'))
const HomePage = React.lazy(() => import('@/components/LandingV2/HomePage'))

const App = () => {
  const { isColorModeSet, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')
  const storedTheme = useSelector((state) => state.theme)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.href.split('?')[1])
    const theme = urlParams.get('theme') && urlParams.get('theme').match(/^[A-Za-z0-9\s]+/)[0]
    if (theme) {
      setColorMode(theme)
    }

    if (isColorModeSet()) {
      return
    }

    setColorMode(storedTheme)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
      <HashRouter>
        <Suspense
          fallback={
            <div className="pt-3 text-center">
              <CSpinner color="primary" variant="grow" />
            </div>
          }
        >
          <Routes>
            <Route exact path="/landing" name="Landing Page" element={<HomePage />} />
            <Route exact path="/login" name="Login Page" element={<Login />} />
            <Route exact path="/register" name="Register Page" element={<Register />} />
            <Route exact path="/404" name="Page 404" element={<Page404 />} />
            <Route exact path="/500" name="Page 500" element={<Page500 />} />
            <Route path="*" name="Home" element={
              <ProtectedRoute>
                <DefaultLayout />
              </ProtectedRoute>
            } />
          </Routes>
        </Suspense>
      </HashRouter>
    </GoogleOAuthProvider>
  )
}

export default App
