'use client'
import React from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../@/components/ui/select";
import { Input } from '../@/components/ui/input';
import { JobStatus } from '../utils/types';
import { Label } from '../@/components/ui/label';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { CiSearch } from "react-icons/ci";


const SearchForm = () => {

  // URL -> `/dashboard?search=my-project`
  // `search` -> 'my-project'
  let searchParams = useSearchParams();
  let search = searchParams.get('search');
  let jobstatus = searchParams.get('jobstatus') || 'all';


  // // OPTIONAL
  // let router = useRouter();
  // let pathname = usePathname();

  let handleSubmit = (e) => {
    let formData = new FormData(e.currentTarget);
    let search = formData.get('search');
    let jobstatus = formData.get('jobstatus');
    console.log(search, jobstatus);


    // Here our moto was to set the query in our url.
    // // OPTIONAL
    // let params = new URLSearchParams();
    // params.set('search',search);
    // params.set('status',status);
    // router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div>
      <Label htmlFor="search" className='font-semibold text-xl'>Search Jobs</Label>
      <form onSubmit={handleSubmit} className='gap-4 mb-10'>
        <div className='flex flex-row items-center join w-full'>
        <Input
          type="text"
          placeholder='Ex : SWE - 1 , Amazon , Flipkart'
          name='search'
          className='w-full input input-bordered focus join-item rounded-xl'
          autoFocus
        // defaultValue={search}
        />
        <button type='submit' className='btn text-3xl join-item'><CiSearch /></button>
        </div>
        <div className='mb-10 mt-4'>
        <Label htmlFor="jobstatus" className='font-semibold text-xl'>Select JobStatus</Label>
          <Select name='jobstatus' defaultValue={jobstatus}>
            <SelectTrigger className="w-[screen] btn btn-ghost btn-sm">
              <SelectValue placeholder="Select JobStatus" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup className='cursor-pointer flex flex-row items-center gap-4'> 
                {
                  ["all", ...Object.values(JobStatus)].map((jobstatus) => {
                    return (
                      <SelectItem value={jobstatus} key={jobstatus} className='capitalize'>{jobstatus}</SelectItem>
                    );
                  })
                }
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        
      </form>
    </div>

  )
}

export { SearchForm };
