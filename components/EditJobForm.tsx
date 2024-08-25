'use client'
import React from 'react'
import { updateJob, getSingleJob } from "../utils/action";
import { z } from "zod";
import { useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { CustomFormField, CustomFormSelect } from "./FormComponent";
import { Form } from '../@/components/ui/form';
import {
    JobStatus,
    JobMode,
    CreateAndEditJobSchema,
} from '../utils/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from "next/navigation";


const EditJobForm = ({ jobId }) => {

    let router = useRouter();
    const queryClient = useQueryClient();

    let { data } = useQuery({
        queryKey: ['job', jobId],
        queryFn: async () => await getSingleJob(jobId),
    });

    let { mutate, isPending } = useMutation({
        mutationFn: async (values: z.infer<typeof CreateAndEditJobSchema>) => await updateJob(jobId, values),
        onSuccess: (data) => {
            if (!data) {
                toast.error('Something went wrong!!!');
            }
            toast.success('Successfully Edited');
            // queryClient.invalidateQueries({ queryKey: ['jobs'] });
            // queryClient.invalidateQueries({ queryKey: ['job', jobId] });
            // queryClient.invalidateQueries({ queryKey: ['stats'] });
            router.push('/Jobs');
            
        }
    });

    const form = useForm<z.infer<typeof CreateAndEditJobSchema>>({
        resolver: zodResolver(CreateAndEditJobSchema),
        defaultValues: {
            position: data?.position || '',
            company: data?.company || '',
            location: data?.location || '',
            status: (data?.status as JobStatus) || JobStatus.Pending,
            mode: (data?.mode as JobMode) || JobMode.FullTime,
        },
    });


    function onSubmit(values: z.infer<typeof CreateAndEditJobSchema>) {
        console.log(values);
        mutate(values);
    };

    return (
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
    )
}

export { EditJobForm };
