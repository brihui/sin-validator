"use client"

import { useEffect, useState } from "react"
import debounce from "lodash.debounce"

export default function SINInput() {
    const [sin, setSin] = useState("")
    const [validSin, setValidSin] = useState<boolean | null>(null)
    const [error, setError] = useState<string | null>(null)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSin(e.target.value)
    }

    const debouncedValidate = debounce(async () => {
        const { valid, error } = await validateSIN()

        if (error) {
            setError(error)
        } else {
            setError(null)
        }

        setValidSin(valid)
    }, 500)

    const validateSIN = async () => {
        try {
            const res = await fetch("/api/validate-sin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ sin }),
            })

            const data = await res.json()
            return data
        } catch (error) {
            setError("Unknown error occurred")
            return false
        }
    }

    useEffect(() => {
        if (sin) {
            console.log("validating sin")
            debouncedValidate()
        } else {
            setValidSin(null)
            setError(null)
        }
    }, [sin])

    return (
        <div>
            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text">Please enter your Social Insurance Number</span>
                </div>
                <input 
                    type="text"
                    placeholder="Enter SIN"
                    className={`input input-bordered input-lg w-full max-w-xs ${validSin === false ? "input-error" : ""} ${validSin === true ? "input-success" : ""}`}
                    onChange={handleChange}
                />
                <div className="label">
                    <span className="label-text-alt">{error ? error : ""}</span>
                    <span className="label-text-alt">{validSin === true ? "Valid SIN" : ""}</span>
                </div>
            </label>
        </div>
    )
}