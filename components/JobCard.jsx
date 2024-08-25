import React from 'react';
import { Label } from '../@/components/ui/label';
import { Button } from '../@/components/ui/button';
import { FaSuitcase } from "react-icons/fa6";
import { LiaBroadcastTowerSolid } from "react-icons/lia";
import { IoLocationSharp } from "react-icons/io5";
import { MdDateRange } from "react-icons/md";
import Link from 'next/link';
import { DeleteJobBtn } from "./DeleteJobBtn";

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

        <div className='flex flex-row items-center gap-1 border p-2 rounded-md'>
          <Label><LiaBroadcastTowerSolid /></Label>
          <h1 className='font-semibold'>{status}</h1>
        </div>
        <div className='flex flex-row items-center gap-1 border p-2 rounded-md'>
          <Label><FaSuitcase /></Label>
          <h1 className='font-semibold'>{mode}</h1>
        </div>
        <div className='flex flex-row items-center gap-1 border p-2 rounded-md'>
          <Label><IoLocationSharp /></Label>
          <h1 className='font-semibold'>{location}</h1>
        </div>
        <div className='flex flex-row items-center gap-1 border p-2 rounded-md'>
          <Label><MdDateRange /></Label>
          <h1 className='font-semibold'>{formattedDate}</h1>
        </div>
      </div>

      <div className='flex flex-row items-center gap-4'>
        <Link href={`/Jobs/${job.id}`}>
          <Button className='w-[screen] btn btn-ghost btn-outline rounded-xl btn-sm'>Edit</Button>
        </Link>
        <DeleteJobBtn id={job.id} />
      </div>

    </div>
  );
}

export { JobCard };
