import {Navigate, Route, Routes} from "react-router-dom";
import {LinksPage} from "./pages/LinksPage.jsx";
import {CreatePage} from "./pages/CreatePage.jsx";
import {DetailPage} from "./pages/DetailPage.jsx";
import {AuthPage} from "./pages/AuthPage.jsx";

export const useRoutes = (isAuthenticated) => {
    if (isAuthenticated) {
        return (
            <Routes>
                <Route path='/links' element={<LinksPage/>} exact/>
                <Route path='/create' element={<CreatePage/>} exact/>
                <Route path='/detail/:id' element={<DetailPage/>}/>
                <Route path='/*' element={<CreatePage/>}/>
            </Routes>
        )
    }

    return (
        <Routes>
            <Route path='/' element={<AuthPage/>} exact/>
            <Route path="*" element={<Navigate to="/" replace/>}/>
        </Routes>
    )
}
