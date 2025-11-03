import {useState} from "react";

export default function useHandleForms<T extends Record<string, any>>() {
    const [formData, setFormData] = useState<Partial<T>>({})

    function handleChange<K extends keyof T>(name: K, value: keyof T[K]): void{
        setFormData((prevData:Partial<T>) => ({
            ...prevData, [name]: value
        }))
    }

    const handleSubmit = () => {
        //TODO: make this activate the formhandling functions for triggering api calls.
        console.log(formData)
    }

    return {handleChange, handleSubmit}
}