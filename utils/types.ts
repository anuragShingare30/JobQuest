import * as z from "zod";

export type JobType = {
    id:number,
    clerkId:string,
    position:string,
    company:string,
    location:string,
    mode:string, 
    status:string,
}

export enum JobStatus  {
    Pending = 'pending',
    Interview = 'interview', 
    Declined = 'declined'
} ;

export enum JobMode {
    FullTime = 'full-time',
    PartTime = 'part-time',
    Internship = 'internship' 
};


export const CreateAndEditJobSchema = z.object({
    position : z.string().min(2, {message:"Minimum of 2 characters are required!!!"}),
    company : z.string().min(2, {message:"Minimum of 2 characters are required!!!"}),
    location : z.string().min(2, {message:"Minimum of 2 characters are required!!!"}),
    mode : z.nativeEnum(JobMode),
    status : z.nativeEnum(JobStatus),
});


export type CreateAndEditJobType = z.infer<typeof CreateAndEditJobSchema>;