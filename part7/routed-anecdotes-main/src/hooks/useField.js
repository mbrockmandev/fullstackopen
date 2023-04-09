const { useState } = require("react")

export const useField = (type) => {
    const [value, setValue] = useState('')

    const onChange = (e) => {
        setValue(e.target.value)
    }

    const reset = () => {
        setValue('')
    }

    return {
        props: { type, value, onChange },
        reset

    }
}
