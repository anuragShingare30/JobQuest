'use client'
import React from "react"
import { useEffect } from "react";
import * as z from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from "react-hook-form";
import { CustomFormField, CustomFormSelect } from "./FormComponent"
import { JobMode, JobStatus, JobType, CreateAndEditJobSchema, CreateAndEditJobType } from "../utils/types";
import { Form } from "../@/components/ui/form";
import { Button } from "../@/components/ui/button";

import toast from 'react-hot-toast';




function CreateJobForm() {

    let {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const form = useForm<CreateAndEditJobType>({

        resolver: zodResolver(CreateAndEditJobSchema),
        defaultValues: {
            position: '',
            company: '',
            location: '',
            mode: JobMode.Internship,
            status: JobStatus.Pending,
        },
    });

    function onSubmit(values: CreateAndEditJobType) {
        console.log(values);
        if (!values) {
            toast.error("An Error Occured");
        }
        else {
            toast.success("Successfully Submitted");
        }
    }

    function onFormSubmit(data: any) {
        console.log(watch('username'));
        console.log(data);
        
    }


    return (
        <div className="mt-10">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3  items-start">
                        {/* Position */}
                        <CustomFormField name='position' control={form.control}></CustomFormField>
                        {/* Company */}
                        <CustomFormField name='company' control={form.control}></CustomFormField>
                        {/* Location */}
                        <CustomFormField name='location' control={form.control}></CustomFormField>

                        {/* jobStatus */}

                        <CustomFormSelect name='status' control={form.control} items={Object.values(JobStatus)} labelText='Job Status'></CustomFormSelect>
                        {/* jobMode */}
                        <CustomFormSelect name='Mode' control={form.control} items={Object.values(JobMode)} labelText='Job Profile'></CustomFormSelect>

                    </div>
                    <Button
                        type='submit'
                        className="self-end capitalize btn bg-neutral-300 text-neutral-900 mt-16"
                    >Add Job</Button>
                </form>
            </Form>

            <div className="mt-10">
                <form onSubmit={handleSubmit(onFormSubmit)}>
                <label htmlFor="username">Username</label>
                <input {...register("username")} type="text" placeholder="Enter username" key='user'/>
                <select {...register("gender")}>
                    <option value="female">female</option>
                    <option value="male">male</option>
                    <option value="other">other</option>
                </select>
                <button type="submit" className="btn btn-sm btn-base-200" >Add</button>
            </form>
        </div>
        </div > 
    );
}


export { CreateJobForm };