import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../@/components/ui/card";
import { Button } from '../@/components/ui/button';
import { Label } from '../@/components/ui/label';
import { Separator } from '../@/components/ui/separator';

const JobCard = ({ job }) => {

  let { position, company, location, mode, status, createdAt } = job;

  const date = new Date(createdAt);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so add 1
  const year = date.getFullYear();
  const formattedDate = `${day}/${month}/${year}`;
  


  return (
    <div className='border-red-500 border-2 flex flex-col items-start gap-4 card bg-base-100 w-96 shadow-xl'>

      <div>
        <h1 className='text-2xl font-bold'>{position}</h1>
        <h1 className='text-slate-300'>{company}</h1>
      </div>

      <div className='grid md:grid-cols-2 mb-10'>
        <h1>{status}</h1>
        <h1>{mode}</h1>
        <h1>{location}</h1>
        <h1 className='btn btn-sm'>{formattedDate}</h1>
      </div>
    </div>
  )
}

export { JobCard };




// id clerkId date position location company mode status