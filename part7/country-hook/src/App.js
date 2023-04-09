import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
    const [value, setValue] = useState('')

    const onChange = (event) => {
        setValue(event.target.value)
    }

    return {
        type,
        value,
        onChange
    }
}

const useCountry = (name) => {
    const [country, setCountry] = useState(null)
    const baseUrl = `https://restcountries.com/v3.1/name/`;
    // format for api query
    // https://restcountries.com/v3.1/name/{name}?fullText=true


    useEffect(() => {

        const fetchCountries = async () => {
            try {
                const result = await axios.get(`${baseUrl}/${name}?fullText=true`)
                if (result.data[0].name.common.toLowerCase() === name.toLowerCase()) {
                    setCountry(result)
                }
            } catch (error) {
                console.error(error.message)
            }
        }

        if (name !== '') {
            fetchCountries();
        }

    }, [name])

    return country
}

const Country = ({ country }) => {
    if (!country) {
        return null
    }

    if (country.status !== 200) {
        return (
            <div>
                not found...
            </div>
        )
    }
    const _country = country.data[0];
    console.log('country component: ', _country)

    return (
        <div>
            <h3>{_country.name.common} </h3>
            <div>capital {_country.capital} </div>
            <div>population {_country.population}</div>
            <img src={_country.flags.png} height='100' alt={`flag of ${_country.name.common}`} />
        </div>
    )
}

const App = () => {
    const nameInput = useField('text')
    const [name, setName] = useState('')
    const country = useCountry(name)

    const fetch = (e) => {
        e.preventDefault()
        setName(nameInput.value)
    }

    return (
        <div>
            <form onSubmit={fetch}>
                <input {...nameInput} />
                <button>find</button>
            </form>

            <Country country={country} />
        </div>
    )
}

export default App
