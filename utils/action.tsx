'use server'
import React from "react"
import { GoogleGenerativeAI } from "@google/generative-ai";
import prisma from "./db";
import { redirect } from "next/navigation";
import { Prisma } from "@prisma/client";
import {auth} from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { CreateAndEditJobSchema, CreateAndEditJobType, JobType } from "./types";

// THIS IS THE FUNCTION REQUIRED TO ASK QUESTION TO AI AND GET RESPONSE.
async function getchatResponse(prompt) {
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
}

async function createJobForm(values:CreateAndEditJobType):Promise<JobType|null>{
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
}

export {getchatResponse, createJobForm};