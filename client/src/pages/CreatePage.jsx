import {useContext, useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hook.jsx";
import {AuthContext} from "../context/AuthContext.jsx";
import {useNavigate} from "react-router-dom";

export const CreatePage = () => {

    const navigate = useNavigate()
    const auth = useContext(AuthContext)
    const [link, setLink] = useState('')
    const {request} = useHttp()

    const pressHandler = async e => {
        if(e.key === 'Enter') {
            try {
                const data = await request('/api/link/generate', 'POST', {from: link}, {
                    Authorization: `Bearer ${auth.token}`
                })
                navigate(`/detail/${data.link._id}`)
            } catch (e) {
                {}
            }
        }
    }

    useEffect(() => {
        window.M.updateTextFields()
    },[])

    return(
        <div className={'row'}>
            <div className="col s8 offset-s2">
                <div className="input-field">
                    <input
                        id="link"
                        type="text"
                        placeholder="Вставьте ссылку"
                        value={link}
                        onChange={e => setLink(e.target.value)}
                        onKeyPress={pressHandler}
                    />
                    <label htmlFor="link">Enter link</label>
                </div>
            </div>
        </div>
    )
}
