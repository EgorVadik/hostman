import { headerAtom } from '@/state/atoms'
import { useAtom } from 'jotai'
import { Button } from './ui/button'
import { generateId } from '@/lib/utils'
import KeyValuePair from './KeyValuePair'

export default function Headers() {
    const [headers, setHeaders] = useAtom(headerAtom)

    return (
        <div className='space-y-3'>
            {headers.map((header) => {
                return (
                    <KeyValuePair
                        key={header.id}
                        param={header}
                        placeholder='Key'
                        setParams={setHeaders}
                    />
                )
            })}
            <Button
                onClick={() => {
                    setHeaders((old) => {
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
