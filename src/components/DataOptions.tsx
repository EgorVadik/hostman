import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import QueryParams from './QueryParams'
import Json from './Json'
import Headers from './Headers'

export default function DataOptions() {
    return (
        <Tabs defaultValue='params' className='dark:text-slate-200'>
            <TabsList>
                <TabsTrigger value='params'>Query Params</TabsTrigger>
                <TabsTrigger value='headers'>Headers</TabsTrigger>
                <TabsTrigger value='json'>JSON</TabsTrigger>
            </TabsList>
            <TabsContent value='params'>
                <QueryParams />
            </TabsContent>
            <TabsContent value='headers'>
                <Headers />
            </TabsContent>
            <TabsContent value='json'>
                <Json />
            </TabsContent>
        </Tabs>
    )
}
