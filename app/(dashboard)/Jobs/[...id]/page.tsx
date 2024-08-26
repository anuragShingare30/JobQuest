import React from "react";
import { EditJobForm } from "../../../../components/EditJobForm";
import { getSingleJob } from "../../../../utils/action"
import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
    useQuery
} from '@tanstack/react-query';


const singleJobsPage = async ({ params }:{ params: { id: number } }) => { 

    // let jobId = params.id; 
    let queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ['job', params.id],
        queryFn: async () => await getSingleJob(params.id),
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <div>
                <h1 className="text-3xl">Edit job form</h1>
                <EditJobForm jobId={params.id}/>
            </div>
        </HydrationBoundary>
    )
}

export default singleJobsPage;
