import useJsonEditor from '@/hooks/useJsonEditor'

export default function Json() {
    const { parent } = useJsonEditor({ isReadOnly: false })

    return (
        <div
            ref={parent}
            className='h-60 dark:bg-slate-950 overflow-y-auto text-base'
        ></div>
    )
}
