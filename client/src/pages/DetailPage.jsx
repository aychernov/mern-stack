import {useParams} from "react-router-dom";
import {useCallback, useContext, useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hook.jsx";
import {AuthContext} from "../context/AuthContext.jsx";
import {Loader} from "../components/Loader.jsx";
import {LinkCard} from "../components/LinkCard.jsx";

export const DetailPage = () => {
    const linkId = useParams().id
    const {token} = useContext(AuthContext)
    const {request, loading} = useHttp()
    const [link, setLink] = useState(null)

    const getLink = useCallback(async () => {
        try {
            const fetched = await request(`/api/link/${linkId}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setLink(fetched)
        } catch (e) {
            {}
        }
    }, [token, request, linkId])

    useEffect(() => {
        getLink()
    }, [getLink])

    if(loading) {
        return <Loader />
    }

    return (
        <>
            {!loading && link && <LinkCard link={link}/>}
        </>
    )
}
