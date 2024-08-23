'use client'
import React from 'react'
import { useSearchParams } from 'next/navigation';
import { getAllJobs } from '../utils/action';
import { useQuery } from '@tanstack/react-query';
import { JobCard } from "./JobCard";

const JobList = () => {

  let searchParams = useSearchParams();
  let search = searchParams.get('search');
  let jobstatus = searchParams.get('jobstatus') || 'all';
  // THIS WILL COME BY PAGINATION 
  let page = Number(searchParams.get('page')) || 1;


  let { isPending, data } = useQuery({
    queryKey: ['jobs', search ?? '', jobstatus, page],
    queryFn: async () => await getAllJobs({ search: search, jobStatus: jobstatus, page: page }),
  });

  let jobs = data?.jobs || [];

  if (isPending) {
    return (
      <span className='loading loading-dots'></span>
    );
  };

  if (!jobs) {
    return (
      <h1 className='text-3xl'>No Jobs Found!!!</h1>
    );
  }

  return (
    <div className='grid grid-cols-2'>
      <h1 className='text-3xl mb-10'>Jobs List</h1>
      <div className='grid md:grid-cols-2'>
        {
          jobs.map((job, index) => {
            return (

              <JobCard job={job} key={index}></JobCard>

            );
          })
        }
      </div>
    </div>
  )
}

export { JobList }; 
