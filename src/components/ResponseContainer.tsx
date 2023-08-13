import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Response from './Response'
import ResponseHeaders from './ResponseHeaders'
import { responseAtom } from '@/state/atoms'
import { useAtom } from 'jotai'

export default function ResponseContainer() {
    const [response] = useAtom(responseAtom)

    return (
        <div className='dark:text-slate-200 mt-3'>
            {response === undefined ? (
                <p>No Response Available</p>
            ) : (
                <>
                    <div className='flex gap-10 mb-5 text-xl'>
                        <div>
                            Status:{' '}
                            <span
                                className={`${
                                    response.status < 300 &&
                                    response.status >= 200
                                        ? 'text-green-500'
                                        : 'text-red-500'
                                }`}
                            >
                                {`${response.status} ${response.statusText}`}
                            </span>
                        </div>
                        <div>Size: {response.size} KB</div>
                        <div>Time: {response.time} ms</div>
                    </div>
                    <Tabs defaultValue='response'>
                        <TabsList>
                            <TabsTrigger value='response'>Response</TabsTrigger>
                            <TabsTrigger value='headers'>Headers</TabsTrigger>
                        </TabsList>
                        <TabsContent value='response'>
                            <Response />
                        </TabsContent>
                        <TabsContent value='headers'>
                            <ResponseHeaders />
                        </TabsContent>
                    </Tabs>
                </>
            )}
        </div>
    )
}
