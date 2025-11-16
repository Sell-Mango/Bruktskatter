import {useEffect, useState} from "react";
import {ZodType} from "zod";
import {registerError} from "@/features/authentication/model/registerData";

export default function useHandleForms<T, U>(
    schema: ZodType<T>,
    submitAction: (dataToSubmit:T)=>void,
)   {
    const [formData, setFormData] = useState<T>({} as T)
    const [errors, setErrors] = useState<U>({} as U)

    function handleChange<K extends keyof T>(name: K, value: keyof T[K]): void{
        setFormData((prevData:T) => ({
            ...prevData, [name]: value
        }))
    }

    const resetErrors = (): void => {
        setErrors({} as U)
    }

    const handleSubmit = () => {
        setErrors({} as U)
        const validatedResult = schema.safeParse(formData)
        console.log(formData)
        if (!validatedResult.success){
            console.log("validation fail", validatedResult.error.issues)
            let fieldErrors:U = {} as U
            validatedResult.error.issues.forEach(error=>{fieldErrors = {...fieldErrors,[error.path[0]]: error.message}})
            setErrors(fieldErrors)
            return
        }

        const validatedData = validatedResult.data as T
        try {
            submitAction(validatedData)
        }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        resetErrors()
    }, []);

    return {handleChange, handleSubmit, errors, resetErrors}
}