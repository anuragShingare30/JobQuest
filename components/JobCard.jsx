import React from 'react';
import { Label } from '../@/components/ui/label';
import { Button } from '../@/components/ui/button';
import { Badge } from '../@/components/ui/badge';

const JobCard = ({ job }) => {
  let { position, company, location, mode, status, createdAt } = job;

  const date = new Date(createdAt);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so add 1
  const year = date.getFullYear();
  const formattedDate = `${day}/${month}/${year}`;

  return (
    <div className='border rounded-lg p-4 flex flex-col items-start gap-4 bg-base-100 shadow-xl mb-10'>

      <div className='w-full border-b border-gray-200 pb-2'>
        <h1 className='text-2xl font-bold'>{position}</h1>
        <h1 className='text-slate-500'>{company}</h1>
      </div>

      <div className='grid  md:grid-cols-2 gap-4 w-full'>
        <div className='border p-1 rounded-md'>
          <Label>Status</Label>
          <h1 className='font-semibold'>{status}</h1>
        </div>
        <div className='border p-1 rounded-md'>
          <Label>Mode</Label>
          <h1 className='font-semibold'>{mode}</h1>
        </div>
        <div className='border p-1 rounded-md'>
          <Label>Location</Label>
          <h1 className='font-semibold'>{location}</h1>
        </div>
        <div className='border p-1 rounded-md'>
          <Label>Date</Label>
          <h1 className='font-semibold'>{formattedDate}</h1>
        </div>
      </div>


      <Button className='w-[screen] btn btn-ghost btn-outline rounded-xl'>Apply Now</Button>

    </div>
  );
}

export { JobCard };
