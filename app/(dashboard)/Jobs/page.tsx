import React from 'react'
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
  useQuery
} from '@tanstack/react-query';
import { getAllJobs } from '../../../utils/action';
import {SearchForm} from "../../../components/SearchForm";
import {JobList} from "../../../components/JobList";

const JobsPage = async  () => {
  await new Promise((resolve)=> {setTimeout(resolve,1000)});
  let queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey:['jobs','','all',1],
    queryFn: async ()=> await getAllJobs({}),
  });

  

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
    <div>
      <h1 className='text-3xl mb-10'>Search Jobs</h1>
      <SearchForm></SearchForm>
      <JobList></JobList>
    </div>
    </HydrationBoundary>
    
  )
}

export default JobsPage
 