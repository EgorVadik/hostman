import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function generateId() {
    return crypto.randomUUID()
}

export function formatKB(data: unknown) {
    try {
        const bytes = JSON.stringify(data).length / 1024
        return Number(bytes.toFixed(2))
    } catch (error) {
        return 0
    }
}
