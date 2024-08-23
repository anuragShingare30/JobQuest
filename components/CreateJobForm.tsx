'use client'
import React from "react"
import { useMutation } from "@tanstack/react-query";
import toast from 'react-hot-toast';
import { createJobForm } from "../utils/action";
import { useRouter } from "next/navigation";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
    JobStatus,
    JobMode,
    CreateAndEditJobSchema,
} from '../utils/types';


import { Form } from '../@/components/ui/form';
import { CustomFormField, CustomFormSelect } from './FormComponent';
import { z } from "zod";

function CreateJobForm() {

    // 1. Define your form.
    const form = useForm<z.infer<typeof CreateAndEditJobSchema>>({
        resolver: zodResolver(CreateAndEditJobSchema),
        defaultValues: {
            position: '',
            company: '',
            location: '',
            status: JobStatus.Pending,
            mode: JobMode.FullTime,
        },
    });




    // let queryClient = useQueryClient();
    let Router = useRouter();

    const { mutate, isPending } = useMutation({
        mutationFn: async (values : z.infer<typeof CreateAndEditJobSchema>) => await createJobForm(values),
        onSuccess: (data) => {
            if (!data) {
                toast.error("Something went wrong");
                return;
            }
            toast.success("Submitted");
            Router.push('/Jobs');
            // queryClient.invalidateQueries({ queryKey: ['jobs'] });
            // queryClient.invalidateQueries({ queryKey: ['stats'] });
            // queryClient.invalidateQueries({ queryKey: ['charts'] });
            return data;
        },


    });

    function onSubmit(values:z.infer<typeof CreateAndEditJobSchema>) {
        console.log(values);
        mutate(values);
    };


    return (
        <div>

        <div>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='bg-muted p-8 rounded'
                >
                    <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3 items-start'>
                        {/* position */}
                        <CustomFormField name='position' control={form.control} />
                        {/* company */}
                        <CustomFormField name='company' control={form.control} />
                        {/* location */}
                        <CustomFormField name='location' control={form.control} />

                        {/* job status */}
                        <CustomFormSelect
                            name='status'
                            control={form.control}
                            labelText='job status'
                            items={Object.values(JobStatus)}
                            
                        />
                        {/* job  type */}
                        <CustomFormSelect
                            name='mode'
                            control={form.control}
                            labelText='job mode'
                            items={Object.values(JobMode)}
                        />

                    </div>
                        <button
                            type='submit'
                            className='self-end capitalize btn text-neutral-500 btn-base-300 mt-12'
                            disabled={isPending}
                        >
                            {isPending ? "Loading..." : "Add Job"}
                        </button>
                </form>
            </Form>
        </div>
        </div>

    );
}

export { CreateJobForm }; 
