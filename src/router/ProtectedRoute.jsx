import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

export default function ProtectedRoute() {
    // Проверяем, есть ли в localStorage "user"
    const isAuth = !!localStorage.getItem('user')

    // Если авторизации нет, делаем редирект на /login
    return isAuth ? <Outlet /> : <Navigate to="/login" replace />
}
