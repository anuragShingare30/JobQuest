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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createJobs } from "../utils/action";
import toast from 'react-hot-toast';
import { useRouter } from "next/navigation";
import { useToast } from "../@/components/ui/use-toast";




function CreateJobForm() {

    const queryClient = useQueryClient();
    const router = useRouter();
    
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

    let { mutate, isPending } = useMutation({
        mutationFn: async (values: CreateAndEditJobType) =>  await createJobs(values) ,
        onSuccess: (data) => {
            if (!data) {
                toast.error("Something went wrong!!");
                return;
            }
            toast.success("Success");
            router.push('/Jobs');
            // queryClient.invalidateQueries({ queryKey: ['jobs'] });
            // queryClient.invalidateQueries({ queryKey: ['stats'] });
            // queryClient.invalidateQueries({ queryKey: ['charts'] });
            return data;
        }
    })


    function onSubmit(values: CreateAndEditJobType) {
        console.log(values);
        mutate(values);
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
                        <CustomFormSelect name='mode' control={form.control} items={Object.values(JobMode)} labelText='Job Profile'></CustomFormSelect>

                    </div>
                    <Button
                        type='submit'
                        className="self-end capitalize btn bg-neutral-300 text-neutral-900  mt-16"
                        disabled={isPending}
                    >{isPending ? "Loading..." : "Add Job"}</Button>
                </form>
            </Form>
        </div >
    );
}


export { CreateJobForm };