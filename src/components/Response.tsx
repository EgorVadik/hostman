import useJsonEditor from '@/hooks/useJsonEditor'
import { loadingAtom, responseAtom } from '@/state/atoms'
import { useAtom } from 'jotai'
import { useEffect } from 'react'

export default function Response() {
    const [response] = useAtom(responseAtom)
    const { parent, jsonEditor } = useJsonEditor({ isReadOnly: true })
    const [loading] = useAtom(loadingAtom)

    useEffect(() => {
        if (!response) return

        jsonEditor?.dispatch({
            changes: {
                from: 0,
                to: jsonEditor.state.doc.length,
                insert: JSON.stringify(response.data, null, 4),
            },
        })
    }, [response, jsonEditor])

    return (
        <div className='relative'>
            <div
                ref={parent}
                className='h-80 dark:bg-slate-950 overflow-y-auto text-base'
            ></div>
            {loading && (
                <div className='animate-spin border-l-2 border-r-2 border-t border-slate-900 dark:border-slate-100 w-16 h-16 rounded-full m-auto mt-16 absolute right-1/2 bottom-1/3' />
            )}
        </div>
    )
}
