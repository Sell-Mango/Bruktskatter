import {useState} from "react";

export default function useHandleForms<T>() {
    const [formData, setFormData] = useState<T|{}>({})

    function handleChange<T, K extends keyof T>(name: K, value: T[K]): void{
        setFormData((prevData:T|{}) => ({
            ...prevData, [name]: value
        }))
    }

    const handleSubmit = () => {
        //TODO: make this activate the formhandling functions for triggering api calls.
        console.log(formData)
    }

    return {handleChange, handleSubmit}
}