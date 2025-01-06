import {createBrowserRouter} from "react-router-dom";
import Levels from "../pages/levels/Levels.jsx";
import LoginPage from "../pages/auth/LoginPage.jsx";
import Lessons from "../components/lessons/Lessons.jsx";
import Tests from "../pages/tests/Tests.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";


export const router = createBrowserRouter(
    [
        {
            path: "/login",
            element: <LoginPage/>
        },
        {
            element: <ProtectedRoute />, // Оборачиваем в ProtectedRoute
            children: [
                {
                    path: "/levels",
                    element: <Levels/>
                },
                {
                    path: "/levels/:ieltsLevel",
                    element: <Lessons/>
                },
                {
                    path: "/levels/:ieltsLevel/lessons/:lessonId",
                    element: <Tests/>
                }
            ]
        }
    ]
)