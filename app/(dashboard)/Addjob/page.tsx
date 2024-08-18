import React from 'react'
import { CreateJobForm } from '../../../components/CreateJobForm';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';


const AddJob = async () => {
  await new Promise((resolve) => { setTimeout(resolve, 1000) });

  // THIS WILL CREATE NEW QUERY CLIENT.
  const queryClient = new QueryClient();
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
    <div>
      <h1 className='text-3xl'>Add Jobs</h1>
      <div>
        <CreateJobForm></CreateJobForm>
      </div>
    </div>
    </HydrationBoundary>
  )
} 
 
export default AddJob;  
