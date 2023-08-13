import type { KeyValuePair as KeyValuePairType } from '@/types/Types'
import { Input } from './ui/input'
import { Button } from './ui/button'

type KeyValuePairProps = {
    param: KeyValuePairType
    setParams: React.Dispatch<React.SetStateAction<KeyValuePairType[]>>
    placeholder: 'Key' | 'Header'
}

export default function KeyValuePair({
    param,
    setParams,
    placeholder,
}: KeyValuePairProps) {
    return (
        <div className='flex items-center'>
            <Input
                className='w-1/3 bg-slate-100 dark:bg-slate-800 rounded-r-none border-r-slate-200 dark:border-r-slate-700 focus-visible:ring-0 focus-visible:ring-offset-0'
                placeholder={placeholder}
                value={param.key}
                onChange={(e) => {
                    setParams((old) => {
                        const newParams = [...old]
                        const index = newParams.findIndex(
                            (p) => p.id === param.id
                        )
                        newParams[index].key = e.target.value
                        return newParams
                    })
                }}
            />
            <Input
                className='w-2/3 bg-slate-100 dark:bg-slate-800 rounded-none border-l focus-visible:ring-0 focus-visible:ring-offset-0'
                placeholder='Value'
                value={param.value}
                onChange={(e) => {
                    setParams((old) => {
                        const newParams = [...old]
                        const index = newParams.findIndex(
                            (p) => p.id === param.id
                        )
                        newParams[index].value = e.target.value
                        return newParams
                    })
                }}
            />
            <Button
                variant={'destructive'}
                className='rounded-l-none'
                onClick={() => {
                    setParams((old) => {
                        return old.filter((p) => p.id !== param.id)
                    })
                }}
            >
                Remove
            </Button>
        </div>
    )
}
