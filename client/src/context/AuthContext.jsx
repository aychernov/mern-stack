import {createContext} from "react";

// Пустая функция
function noop() {}

export const AuthContext = createContext({
    token: null,
    userId: null,
    login: noop,
    logout: noop,
    isAuthenticated: false
})
