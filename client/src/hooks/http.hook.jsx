import {useCallback, useState} from "react";

export const useHttp = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const request = useCallback(async (url, method = "GET", body = null, headers = {}) => {
            setLoading(true)
            try {
                // Stringify
                if(body){
                    body = JSON.stringify(body)
                    headers['Content-Type'] = 'application/json'
                }
                const response = await fetch(url, {method, body, headers})
                console.log("RESPONSE:", response)
                const data = await response.json()
                console.log("DATA:", data)
                if(!response.ok) {
                    throw new Error(data.message || 'Error fetch')
                }
                console.log(data)
                setLoading(false)
                return data
            } catch (e) {
                setLoading(false)
                setError(e.message)
                throw e
            }
        }
        , [])

    const clearError = useCallback(() => setError(null), [])

    return {loading, error, request, clearError}
}
