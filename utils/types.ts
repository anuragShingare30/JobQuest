import * as z from "zod";


// THIS TS TYPE IS USED WHEN WE NEED TO ADD THE DATA IN DATABASE ONLY.
export type JobType = {
    id:number,
    clerkId:string,
    position?:string,
    company:string,
    location:string,
    mode:string, 
    status:string,
};

// THIS IS USED FOR SELECT COMPONENT
export enum JobStatus  {
    Pending = 'pending', 
    Interview = 'interview', 
    Declined = 'declined'
};

// THIS IS USED FOR SELECT COMPONENT
export enum JobMode { 
    FullTime = 'full-time',
    PartTime = 'part-time',
    Internship = 'internship' 
}; 

export type getJobsType = {
    search?:string,
    jobStatus?:string,
    page?:Number,
    limit?:Number,
};


// FORM SCHEMA
export const CreateAndEditJobSchema = z.object({
    position : z.string().min(2, {message:"Minimum of 2 characters are required!!!"}),
    company : z.string().min(2, {message:"Minimum of 2 characters are required!!!"}),
    location : z.string().min(2, {message:"Minimum of 2 characters are required!!!"}),
    mode : z.nativeEnum(JobMode),
    status : z.nativeEnum(JobStatus),
});


// export type CreateAndEditJobType = z.infer<typeof CreateAndEditJobSchema>;