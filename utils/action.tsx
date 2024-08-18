'use server'
import React from "react"
import { GoogleGenerativeAI } from "@google/generative-ai";
import { CreateAndEditJobSchema, CreateAndEditJobType, JobType } from "./types";
import { auth } from '@clerk/nextjs/server';
import { redirect } from "next/navigation";
import prisma from "./db";


// THIS IS THE FUNCTION REQUIRED TO ASK QUESTION TO AI AND GET RESPONSE.
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

  function getClerkId():string{
    let {userId} = auth();
    if(!userId){
      redirect('/');
    };
    return userId;
  }

async function createJobs(values: CreateAndEditJobType):Promise<JobType | null>{
  let userId = getClerkId();
  try {
    CreateAndEditJobSchema.parse(values);
    let result : JobType = await prisma.jobs.create({
      data : {
        position:values.position || "Developer",
        location:values.location,
        company:values.company,
        mode:values.mode,
        status:values.status,
        clerkId:userId,
      },
    });
    return result;
  } 
  catch (error) {
    console.log(error);
    return null;
  }
}

export {getchatResponse, createJobs};