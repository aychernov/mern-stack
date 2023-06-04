import './App.css'
import 'materialize-css'

import {useRoutes} from "./routes.jsx";
import {useAuth} from "./hooks/auth.hook.jsx";
import {BrowserRouter as Router} from "react-router-dom";
import {AuthContext} from "./context/AuthContext.jsx";
import {NavBar} from "./components/NavBar.jsx";
import {Loader} from "./components/Loader.jsx";


function App() {
    const { token, login, logout, userId, ready } = useAuth()
    const isAuthenticated = Boolean(token)
    const routes = useRoutes(isAuthenticated)

    if(!ready) {
        return <Loader/>
    }

    return (
        <AuthContext.Provider value={{
            token, login, logout, userId, isAuthenticated
        }}>
            <Router>
                {isAuthenticated && <NavBar/>}
                <div className="container">
                    {routes}
                </div>
            </Router>
        </AuthContext.Provider>
    )
}

export default App
