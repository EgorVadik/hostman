import ThemeToggler from '@/components/ThemeToggler'
import FormElement from '@/components/FormElement'
import DataOptions from '@/components/DataOptions'
import ResponseContainer from './components/ResponseContainer'

export default function App() {
    return (
        <main className='min-h-screen bg-white dark:bg-slate-900'>
            <div className='container mx-auto p-4 flex flex-col gap-4'>
                <ThemeToggler />
                <FormElement />
                <DataOptions />
                <ResponseContainer />
            </div>
        </main>
    )
}
