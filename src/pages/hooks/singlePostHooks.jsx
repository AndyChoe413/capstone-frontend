import { useState } from "react";

function CustomHook(initialState) {
    const [value, setValue] = useState(initialState)
    // const [shouldToggle, setShouldToggle] = useState(false)
    // const [shouldSubmit, setShouldSubmit] = useState('')

    function onChange(e) {
        setValue(e.target.value)
        // checkInputs(e.target.value)
    }

    return [value, onChange]
}

export default CustomHook