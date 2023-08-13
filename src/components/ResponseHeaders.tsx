import { responseAtom } from '@/state/atoms'
import { useAtom } from 'jotai'

export default function ResponseHeaders() {
    const [response] = useAtom(responseAtom)

    return (
        <div className='space-y-1'>
            {response === undefined ? (
                <p>No Response Headers Available</p>
            ) : (
                Object.entries(response.headers).map(([key, value]) => {
                    return (
                        <div key={key} className='flex space-x-2'>
                            <div className='font-bold'>{key}:</div>
                            <div>{value as string}</div>
                        </div>
                    )
                })
            )}
        </div>
    )
}
