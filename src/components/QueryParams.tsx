import { queryParamAtom, urlAtom } from '@/state/atoms'
import { useAtom } from 'jotai'
// import { Input } from './ui/input'
import { Button } from './ui/button'
import { generateId } from '@/lib/utils'
import { useEffect } from 'react'
import KeyValuePair from './KeyValuePair'

export default function QueryParams() {
    const [params, setParams] = useAtom(queryParamAtom)
    const [, setUrl] = useAtom(urlAtom)

    useEffect(() => {
        setUrl((old) => {
            const plainUrl = old.split('?')[0]
            let url = ''
            params.forEach((param) => {
                if (param.key.trim() === '' && param.value.trim() === '') return
                url += `${param.key}=${param.value}&`
            })

            if (url.trim() === '') {
                return plainUrl
            }

            return plainUrl + '?' + url.slice(0, -1)
        })
    }, [params, setUrl])

    return (
        <div className='space-y-3'>
            {params.map((param) => {
                return (
                    <KeyValuePair
                        key={param.id}
                        param={param}
                        placeholder='Key'
                        setParams={setParams}
                    />
                )
            })}
            <Button
                onClick={() => {
                    setParams((old) => {
                        return [
                            ...old,
                            {
                                id: generateId(),
                                key: '',
                                value: '',
                            },
                        ]
                    })
                }}
            >
                Add
            </Button>
        </div>
    )
}
