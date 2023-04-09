import axios from 'axios'
import { useState, useEffect } from 'react'

const useResource = (baseUrl) => {
    const [resources, setResources] = useState([])

    useEffect(() => {
        const getResources = async () => {
            const results = await axios.get(baseUrl)
            setResources(results.data)
        }
        getResources();
    }, [setResources, baseUrl])

    const create = async newObject => {

        const res = await axios.post(baseUrl, newObject)
        setResources(resources.concat(res.data))
    }

    const service = { create }

    return [resources, service]
}

export default useResource;

