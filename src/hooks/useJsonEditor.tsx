import { basicSetup, EditorView } from 'codemirror'
import { EditorState } from '@codemirror/state'
import { keymap } from '@codemirror/view'
import { indentWithTab } from '@codemirror/commands'
import { useEffect, useRef, useState } from 'react'
import { json } from '@codemirror/lang-json'
import { useAtom } from 'jotai'
import { jsonAtom } from '@/state/atoms'
// import { language } from '@codemirror/language'

type JsonEditorProps = {
    isReadOnly: boolean
}

export default function useJsonEditor({ isReadOnly }: JsonEditorProps) {
    const parent = useRef<HTMLDivElement>(null)
    const [jsonEditor, setJsonEditor] = useState<EditorView | null>(null)
    const [jsonData, setJsonValue] = useAtom(jsonAtom)

    useEffect(() => {
        if (!parent.current) return
        const view = new EditorView({
            state: EditorState.create({
                doc: isReadOnly ? '{}' : jsonData,
                extensions: [
                    basicSetup,
                    keymap.of([indentWithTab]),
                    json(),
                    EditorState.tabSize.of(2),
                    EditorState.readOnly.of(isReadOnly),
                    EditorView.updateListener.of((update) => {
                        if (!isReadOnly) {
                            setJsonValue(update.state.doc.toString())
                        }
                    }),
                ],
            }),
            parent: parent.current,
        })

        setJsonEditor(view)

        return () => {
            view.destroy()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isReadOnly])

    return { parent, jsonEditor }
}
