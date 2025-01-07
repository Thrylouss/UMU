import {createBrowserRouter, Navigate } from "react-router-dom";
import Levels from "../pages/levels/Levels.jsx";
import LoginPage from "../pages/auth/LoginPage.jsx";
import Lessons from "../components/lessons/Lessons.jsx";
import Tests from "../pages/tests/Tests.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import NotFoundPage from "./NotFoundPage.jsx";


export const router = createBrowserRouter([
    {
        // Главная "/" редиректит сразу на "/login"
        path: "/",
        element: <Navigate to="/login" replace />,
    },
    {
        path: "/login",
        element: <LoginPage />
    },
    {
        // Для закрытых страниц — ваш ProtectedRoute
        element: <ProtectedRoute />,
        children: [
            {
                path: "/levels",
                element: <Levels />
            },
            {
                path: "/levels/:ieltsLevel",
                element: <Lessons />
            },
            {
                path: "/levels/:ieltsLevel/lessons/:lessonId",
                element: <Tests />
            },
            // 404 для «вложенных» страниц
            {
                path: "*",
                element: <NotFoundPage />
            }
        ]
    },
    // 404 для всех остальных вариантов
    {
        path: "*",
        element: <NotFoundPage />
    }
]);