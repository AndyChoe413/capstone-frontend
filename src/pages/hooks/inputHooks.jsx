import { useState } from "react";
import { isEmail, isAlphanumeric, isStrongPassword } from 'validator';

function CustomHook(initialState) {
    const [value, setValue] = useState(initialState)
    const [isThereAnError, setIsThereAnError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    function onChange(e) {
        setValue(e.target.value)
        checkInputs(e.target.value)
    }

    function checkInputs(value) {
       
        if (value.length === 0) {
            setIsThereAnError(true)
            setErrorMessage(`${initialState} is required`)
          
        } else {
            setIsThereAnError(false)
            setErrorMessage('')
        }
    }

    // const handleUsernameInput = (value) => {
    //     if (value === 'username' && value.length === 0) {
    //         setIsThereAnError(true);
	// 		setErrorMessage(`${initialState} is required`);
    //     } else {
    //         if (isAlphanumeric(value)) {
    //             setErrorMessage('');
    //         } else {
    //              setErrorMessage('username must be alphanumeric');
    //         }
    //     }
    // }

    function clearInput() {
        setValue('')
    }
    return [value, onChange, isThereAnError, errorMessage, clearInput]
}

export default CustomHook