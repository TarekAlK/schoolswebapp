import axios from 'axios'
import { useState, useEffect } from 'react'

//const useAxios = () => {
export default function useAxios() {
    const BASE_URL = 'http://localhost:5000/api'
    const [response, setResponse] = useState([])
    const [duplicatedResponse, setDuplicatedResponse] = useState([])
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [controller, setController] = useState()

    const axiosInstance = axios.create({
        withCredentials: true,
        baseURL: BASE_URL,
        //timeout: 1000,
        headers: {
            //'Accept': 'application/vnd.GitHub.v3+json',
            //'Authorization': 'token <your-token-here> -- https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token'
            'Content-Type': 'application/json'
          },
    })

    const fetchData = async ({url, method, data = {}, params = {}}) => {
        try {
            setLoading(true);
            const ctrl = new AbortController();
            setController(ctrl);
            const res = await axiosInstance[method.toLowerCase()](url, {
                //...requestConfig,
                ...data,
                //...params,
                signal: ctrl.signal
            }, {
                withCredentials: true
            });
            setResponse(res.data);
            setDuplicatedResponse(res.data);
        } catch (error) {
            console.log(error.message)
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        //console.log(controller)

        // useEffect cleanup function
        return () => controller && controller.abort();

    }, [controller]);

    return[response, duplicatedResponse, loading, error, fetchData, setResponse, setDuplicatedResponse]
}

//export default useAxios