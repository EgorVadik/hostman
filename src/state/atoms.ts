/* eslint-disable @typescript-eslint/no-explicit-any */
import { generateId } from '@/lib/utils'
import { KeyValuePair } from '@/types/Types'
import { atom } from 'jotai'

export const methodAtom = atom('GET')
export const urlAtom = atom('')
export const queryParamAtom = atom<KeyValuePair[]>([
    { id: generateId(), key: '', value: '' },
])
export const headerAtom = atom<KeyValuePair[]>([
    {
        id: generateId(),
        key: 'Accept',
        value: '*/*',
    },
])
export const jsonAtom = atom('{\n\t\n}')
export const responseAtom = atom<
    | {
          data: any
          status: number
          statusText: string
          headers: any
          time: number
          size: number
      }
    | undefined
>(undefined)
export const loadingAtom = atom(false)
