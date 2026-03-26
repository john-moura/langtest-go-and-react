import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { CSpinner } from '@coreui/react'

const ProtectedRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null)

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'
                const res = await fetch(`${baseUrl}/api/v1/me`, {
                    credentials: 'include',
                })
                if (res.ok) {
                    setIsAuthenticated(true)
                } else {
                    setIsAuthenticated(false)
                }
            } catch (error) {
                console.error('Auth check failed', error)
                setIsAuthenticated(false)
            }
        }

        checkAuth()
    }, [])

    if (isAuthenticated === null) {
        return (
            <div className="pt-3 text-center">
                <CSpinner color="primary" variant="grow" />
            </div>
        )
    }

    if (!isAuthenticated) {
        return <Navigate to="/landing" replace />
    }

    return children
}

export default ProtectedRoute
