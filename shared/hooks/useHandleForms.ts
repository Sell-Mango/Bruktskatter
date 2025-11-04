import {useState} from "react";
import {ZodType} from "zod";

export default function useHandleForms<T>(
    schema: ZodType<T>,
    submitAction: (dataToSubmit:T)=>void,
)   {
    const [formData, setFormData] = useState<T>({} as T)

    function handleChange<K extends keyof T>(name: K, value: keyof T[K]): void{
        setFormData((prevData:T) => ({
            ...prevData, [name]: value
        }))
    }

    const handleSubmit = () => {
        const validatedResult = schema.safeParse(formData)
        console.log(formData)
        if (validatedResult.success) {
            const validatedData = validatedResult.data as T
            try {
                submitAction(validatedData)
            }
            catch (error) {
                console.log(error)
            }
        }
        return
    }

    return {handleChange, handleSubmit}
}