import React, { PureComponent } from 'react';
import { getStatsAction, getChartsAction } from '../../../utils/action';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
  useQuery
} from '@tanstack/react-query';
import { StatsContainer } from "../../../components/StatsContainer";
import { ChartsContainer } from "../../../components/ChartsContainer";

const StatsPage = async () => {

  await new Promise((resolve) => { setTimeout(resolve, 1000) });
  let queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['stats'],
    queryFn: async () => await getStatsAction(),
  });


  await queryClient.prefetchQuery({
    queryKey: ['charts'],
    queryFn: async () => await getChartsAction(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
        <h1 className='text-3xl'>Get Your Job Stats here</h1>
        <div className='p-10 md:mx-7 flex flex-col items-center'>
        <StatsContainer />
        <ChartsContainer />
        </div>
      
    </HydrationBoundary>
  )
}

export default StatsPage;
