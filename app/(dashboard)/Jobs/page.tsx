import React from 'react'
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';


const JobsPage = () => {
  const queryClient = new QueryClient();
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
    <div>
      <h1 className='text-3xl'>Jobs Page</h1>
    </div>
    </HydrationBoundary>
  )
}

export default JobsPage;
