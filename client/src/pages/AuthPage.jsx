// переделать на useHookForm!!!!
import {useContext, useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hook.jsx";
import {useMessage} from "../hooks/message.hook.jsx";
import {AuthContext} from "../context/AuthContext.jsx";

export const AuthPage = () => {
    const auth = useContext(AuthContext)
    const message = useMessage()
    const {loading, error, request, clearError} = useHttp()

    const [form, setForm] = useState({
        email: '',
        password: ''
    })
    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    useEffect(() => {
       window.M.updateTextFields()
    },[])

    const handleChangeForm = e => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form})
            message(data.message)
            console.log('DATA_REG: ', data)
        } catch (e) {
            console.log(e)
        }
    }

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form})
            auth.login(data.token, data.userId)
        } catch (e) {}
    }
    return (
        <div className="row">
            <div className="col s6 offset-s3">

                <div className="card grey darken-4">
                    <div className="card-content white-text">
                        <span className="card-title">Авторизация</span>
                        <div>

                            <div className="input-field">
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="Your email"
                                    value={form.email}
                                    className="yellow-input white-text"
                                    onChange={handleChangeForm}
                                />
                                <label htmlFor="email">Email</label>
                            </div>

                            <div className="input-field">
                                <input
                                    id="password"
                                    type="password"
                                    name="password"
                                    placeholder="Your password"
                                    value={form.password}
                                    className="yellow-input white-text"
                                    onChange={handleChangeForm}
                                />
                                <label htmlFor="password">Password</label>
                            </div>

                        </div>
                    </div>
                    <div className="card-action">
                        <button
                            className={"btn yellow darken-4"}
                            onClick={loginHandler}
                            disabled={loading}
                        >
                            Login
                        </button>

                        <button
                            className={"btn grey lighten-1 black-text"}
                            onClick={registerHandler}
                            disabled={loading}
                        >
                            Register
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
