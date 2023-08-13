import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from './ui/button'
import { useAtom } from 'jotai'
import { methodAtom } from '@/state/atoms'

export default function MethodDropdown() {
    const [method, setMethod] = useAtom(methodAtom)

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild className='self-end rounded-r-none'>
                <Button
                    variant='outline'
                    size='icon'
                    className='min-w-fit px-4 group'
                >
                    <div className='dark:text-slate-200 flex items-center gap-2'>
                        {method}
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='24'
                            height='24'
                            viewBox='0 0 24 24'
                            fill='none'
                            stroke='currentColor'
                            strokeWidth='2'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            className='h-4 w-4 shrink-0 transition-transform duration-200 group-aria-expanded:-rotate-180'
                        >
                            <polyline points='6 9 12 15 18 9'></polyline>
                        </svg>
                    </div>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
                <DropdownMenuItem onClick={() => setMethod('GET')}>
                    GET
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setMethod('POST')}>
                    POST
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setMethod('PUT')}>
                    PUT
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setMethod('PATCH')}>
                    PATCH
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setMethod('DELETE')}>
                    DELETE
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
