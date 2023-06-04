import {useCallback, useContext, useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hook.jsx";
import {AuthContext} from "../context/AuthContext.jsx";
import {Loader} from "../components/Loader.jsx";
import LinksList from "../components/LinksList.jsx";

export const LinksPage = () => {

    const [links, setLinks] = useState([])
    const {loading, request} = useHttp()
    const {token} = useContext(AuthContext)

    const fetchLinks = useCallback(async () => {
        try {
            const fetched = await request('/api/link', 'GET', null, {
                Authorization: `Bearer ${token}`
            })

            setLinks(fetched)
        } catch (e) {
            console.log(e)
        }
    }, [token, request])

    useEffect(()=>{
        fetchLinks()
    },[fetchLinks])

    if(loading){
        return <Loader/>
    }

    return (
        <div>
            {!loading && <LinksList links={links}/>}
        </div>
    )
}
