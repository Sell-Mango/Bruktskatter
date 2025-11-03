import {useState} from "react";
import {ZodType} from "zod";

export default function useHandleForms<T>(
    schema: ZodType<T>,
    submitAction: (dataToSubmit:T)=>void,
) {
    const [formData, setFormData] = useState<Partial<T>>({})

    function handleChange<K extends keyof T>(name: K, value: keyof T[K]): void{
        setFormData((prevData:Partial<T>) => ({
            ...prevData, [name]: value
        }))
    }

    const handleSubmit = () => {
        //TODO: make this activate the formhandling functions for triggering api calls.
        const validatedResult = schema.safeParse(formData)
        console.log(formData)
        if (validatedResult.success) {
            try {
                submitAction(formData)
            }
            catch (error) {
                console.log(error)
            }

        }
        return
    }

    return {handleChange, handleSubmit}
}