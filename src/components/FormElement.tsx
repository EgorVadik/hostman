import { useToast } from '@/components/ui/use-toast'
import { Input } from '@/components/ui/input'
import MethodDropdown from './MethodDropdown'
import { useAtom } from 'jotai'
import {
    headerAtom,
    jsonAtom,
    loadingAtom,
    methodAtom,
    responseAtom,
    urlAtom,
} from '@/state/atoms'
import { Button } from './ui/button'
import { FormEvent } from 'react'
import axios, { AxiosError } from 'axios'
import { formatKB } from '@/lib/utils'

export default function FormElement() {
    const [url, setUrl] = useAtom(urlAtom)
    const [json] = useAtom(jsonAtom)
    const [headers] = useAtom(headerAtom)
    const [method] = useAtom(methodAtom)
    const [, setResponse] = useAtom(responseAtom)
    const [loading, setLoading] = useAtom(loadingAtom)
    const { toast } = useToast()

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const startTime = new Date().getTime()
        setLoading(true)
        let jsonData: unknown = {}
        try {
            if (method === 'GET' || method === 'DELETE') {
                jsonData = {}
            } else {
                jsonData = JSON.parse(json || '{}')
            }
        } catch (_) {
            toast({
                title: 'Invalid JSON',
                description:
                    'Unable to parse JSON data provided, please check again',
            })
            return
        }

        const rawHeaders = headers
            .map((header) => ({
                [header.key]: header.value,
            }))
            .reduce((acc, curr) => {
                return { ...acc, ...curr }
            }, {})

        axios({
            method,
            url,
            data: jsonData,
            headers: rawHeaders,
        })
            .then((res) => {
                const size = formatKB(res.data)
                setResponse({
                    status: res.status,
                    statusText: res.statusText,
                    data: res.data,
                    headers: res.headers,
                    time: 0,
                    size,
                })
            })
            .catch((err) => {
                toast({
                    title: 'Error',
                    description: err.message,
                })

                if (err instanceof AxiosError) {
                    const size = formatKB(err.response?.data)
                    setResponse({
                        status: err.response?.status ?? 500,
                        statusText:
                            err.response?.statusText ?? 'Internal Server Error',
                        data: err.response?.data,
                        headers: err.response?.headers,
                        time: 0,
                        size,
                    })
                }
            })
            .finally(() => {
                const endTime = new Date().getTime()
                const time = endTime - startTime
                setResponse((old) => {
                    if (old === undefined) {
                        return old
                    }

                    return {
                        ...old,
                        time,
                    }
                })
                setLoading(false)
            })
    }

    return (
        <form className='flex items-center' onSubmit={handleSubmit}>
            <MethodDropdown />

            <Input
                className='rounded-none border-l-0 dark:text-slate-200'
                placeholder='https://jsonplaceholder.typicode.com/todos'
                value={url}
                onChange={(e) => {
                    setUrl(e.target.value)
                }}
            />
            <Button
                type='submit'
                variant={'default'}
                className='rounded-l-none disabled:cursor-not-allowed'
                disabled={loading}
            >
                {loading ? (
                    <div className='animate-spin border-l border-r border-t dark:border-slate-900 border-slate-100 w-4 h-4 rounded-full' />
                ) : (
                    'Send'
                )}
            </Button>
        </form>
    )
}
