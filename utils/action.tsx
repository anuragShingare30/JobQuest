'use server'
import React from "react"
import { GoogleGenerativeAI } from "@google/generative-ai";
import prisma from "./db";
import { Prisma } from "@prisma/client";
import {auth} from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { CreateAndEditJobSchema, JobMode, JobStatus, JobType, getJobsType} from "./types";
import { map, z } from "zod";
import { redirect } from "next/navigation";
import dayjs  from "dayjs";



// THIS FUNCTION IS AN VIRTUAL AI ASSISTANT (CAN BE FINE-TUNED).
async function getchatResponse(prompt: string) {
    // Access your API key as an environment variable
    const genAI = new GoogleGenerativeAI(process.env.API_KEY); 
    try {
      // Choose a model that's appropriate for your use case.
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); 
  
      const result = await model.generateContent({
        contents: [
          {
            role: 'user', 
            parts: [
              {
                text: prompt,
              }
            ],
          }
        ],
        generationConfig: {
          maxOutputTokens: 1000,
          temperature: 0.1, 
        },
      });
      // console.log(result.response.text());
      console.log(result.response.candidates[0].content.parts[0].text);
      return (result.response.candidates[0]);
    }
    catch (error) {
      console.log(error);
    }
  };


function getClerkId(){
  let {userId} = auth();
  if(!userId){
    throw new Error("User is not authenticated");
  }
  return userId;
};



// THIS FUNCTION WILL CREATE NEW JOBS.
async function createJobForm(values:z.infer<typeof CreateAndEditJobSchema>):Promise<JobType|null>{
  let userId = getClerkId();
  try {
      CreateAndEditJobSchema.parse(values);
      let result:JobType= await prisma.jobs.create({
          data:{
            position:values.position,
            location:values.location,
            company:values.company,
            mode:values.mode,
            status:values.status,
            clerkId:userId,
          },
      });
      revalidatePath('/');
      return result;
  } 
  catch (error) {
    console.log(error);
    return null;
  }
};





// THIS FUNCTION WILL FETCH ALL THE JOBS ON THE BASIS OF QUERY.
async function getAllJobs({
  search,
  jobStatus,
  page=1,
  limit=10,
}: getJobsType):Promise<{
    jobs:JobType[];
    count:number;
    page:number;
    totalpage:number;
}>{ 
  let userId = getClerkId();
  try {

    // 'whereClause' is nothing but the 'where' condition we set-in for prisma search.
    let whereClause : Prisma.JobsWhereInput = {
      clerkId:userId,
    };

    // This will extract the job on the basis of 'search' variable.
    if(search){

      // Here value of 'whereClause' will be 'clerkId' and 'search' value.
      // We have set 'OR' value here, the query input can be 'position' or 'company'.
      whereClause = {
        ...whereClause,
        OR:[
          {
            position:{
              contains:search,
            }
          },
          {
            company:{
              contains:search,
            }
          }
        ]
      }
      // If 'jobStatus' 
      if(jobStatus && jobStatus !== 'all' ){
        whereClause = {
          ...whereClause,
          status:jobStatus,
        }
      }
    }
    let jobs:JobType[] = await prisma.jobs.findMany({
      where:whereClause,
    });
    return {jobs,count:0,page:1,totalpage:0};
  } 
  catch (error) {
    console.log(error);
    return {jobs:[],count:0,page:1,totalpage:0};
  }
};


async function deleteJobAction(id: any){
  let userId = getClerkId();
  try {
    let job = await prisma.jobs.delete({
      where:{
        id,
        clerkId:userId
      }
    });

    return job;
  } 
  catch (error) {
    console.log(error);
    return null;
  }
};


async function getSingleJob(id: number): Promise<JobType | null> {
  let userId = getClerkId();
  try {
      const job = await prisma.jobs.findUnique({
          where: {
              id,
              clerkId: userId,
          },
      });
      return job ? job : null;  // Ensure that null is returned if no job is found
  } catch (error) {
      console.error("Error fetching job:", error);
      return null;  // Return null in case of any error
  }
}


async function updateJob(id:number,values:z.infer<typeof CreateAndEditJobSchema>){
  let userId = getClerkId();
  try {
    let result : JobType = await prisma.jobs.update({
      where:{
        id,
        clerkId:userId,
      },
      data:{
        ...values,
      },
    });
    return result;
  } 
  catch (error) {
    console.log(error);
    return null;
  }
};


async function getStatsAction(){
  let userId = getClerkId();
  try {
    let stats = await prisma.jobs.groupBy({
      where:{
        clerkId:userId,
      },
      by:['status'],
      _count:{
        status:true
      }
    });

    let jobs = {};

    let data = stats.map((job)=>{
      jobs = {
        count:job._count.status,
        status:job.status,
      };
      return jobs;
    })
    // console.log(data);
    return data;

  } 
  catch (error) {
    console.log(error);
    return null;
      
  }
};

// // THIS WILL BE THE OUTPUT FOR THE ABOVE FUNCTION WHERE WE ARE CALCULATING THE TOTAL INPUT ENTRIES.
// [
//   { _count: { status: 33 }, status: 'declined' },
//   { _count: { status: 41 }, status: 'interview' },
//   { _count: { status: 29 }, status: 'pending' }
// ]


async function getChartsAction(){
  let userId = getClerkId();
  let date = dayjs().subtract(6,'month').toDate();
  try {
    let charts = await prisma.jobs.findMany({
      where:{
        clerkId:userId,
        createdAt:{
          gte:date,
        },
      },
      orderBy:{
        createdAt:'asc',
      }
    });
    
    let applicationsPerMonth = charts.reduce((acc, job) => {
      const date = dayjs(job.createdAt).format('MMM YY');

      const existingEntry = acc.find((entry) => entry.date === date);

      if (existingEntry) {
        existingEntry.JobsApplied += 1;
      } 
      else {
        acc.push({ date, JobsApplied: 1 });
      }

      return acc;
    }, [] as Array<{ date: string; JobsApplied: number }>);
    

    // console.log(applicationsPerMonth);
    return applicationsPerMonth;
  } 
  catch (error) {
    console.log(error);
    return null; 
  }
}

export {getchatResponse, createJobForm,getAllJobs,deleteJobAction,getSingleJob,updateJob, getStatsAction,getChartsAction};