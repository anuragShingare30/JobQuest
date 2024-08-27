'use client'
import React from 'react'
import { getStatsAction } from '../utils/action';
import { useQuery } from '@tanstack/react-query';

const StatsContainer = () => {

  let { data, isError } = useQuery({
    queryKey: ['stats'],
    queryFn: async () => await getStatsAction(),
  });

  
  if (data.length===0) {
    return (
      <span className='text-xl'>No Stats found...</span>
    );
  };




  return (
    <div className='lg:flex  flex-row gap-20'>
      {
        data.map((stat,index) => {
          return (
            <div className='flex flex-row items-center gap-16 bg-base-300 rounded p-4 mt-10' key={index} id={index}>
              <h1 className='text-xl font-bold  capitalize'>{stat.status}</h1>
              <h1 className='text-3xl font-bold  text-blue-600'>{stat.count}</h1>
            </div>
          );
        })
      }
    </div>
  )
}

export { StatsContainer }; 
