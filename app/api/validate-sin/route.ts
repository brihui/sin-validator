import { NextResponse } from "next/server"

export async function POST(req: Request) {
    const { sin } = await req.json()

    // Digit Count Check
    if (!sin || sin.length !== 9) {
        return NextResponse.json({ valid: false, error: "Invalid SIN Length" })
    }

    // All Numerical Values Check
    const allNums = /^\d+$/.test(sin)

    if (!allNums) {
        return NextResponse.json({ valid: false, error: "SIN must contain only numerical digits"})
    }

    // Luhn Algorithm Check
    let numDigits = sin.length
    let sum = 0
    let isSecond = false

    for (let i = numDigits - 1; i >= 0; i--) {
        let digit = sin.charCodeAt(i) - "0".charCodeAt(0)

        digit = isSecond ? digit * 2 : digit

        sum += Math.floor(digit / 10)
        sum += digit % 10

        isSecond = !isSecond
    }

    const isValid = (sum % 10) === 0

    return isValid
        ? NextResponse.json({ valid: isValid })
        : NextResponse.json({ valid: isValid, error: "Invalid SIN" })
}