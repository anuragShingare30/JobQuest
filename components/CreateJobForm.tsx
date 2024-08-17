// 'use client';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { useForm } from 'react-hook-form';
// import * as z from 'zod';

// import { Button } from '../@/components/ui/button';
// import {
//     Form,
//     FormControl,
//     FormField,
//     FormItem,
//     FormLabel,
//     FormMessage,
// } from '../@/components/ui/form';
// import { Input } from '../@/components/ui/input';


// // This schema specifies that the username field is a string and must be at least 2 characters long.
// // Here we will define our input name and their data type.
// const formSchema = z.object({
//     username: z.string().min(2, {
//         message: 'Username must be at least 2 characters.',
//     }),
//     age: z.string().min(2),
// });


// // It uses the useForm hook from react-hook-form to create a form instance which can be used to manage form state, handle form submission, and perform form validation.
// // It also uses zod schema as its resolver.
// function CreateJobForm() {


//     // 1. Define your form.
//     // Here we will define our default value.
//     const form = useForm<z.infer<typeof formSchema>>({
//         resolver: zodResolver(formSchema),
//         defaultValues: {
//             username: '',
//             age: null,
//         },
//     });


//     // 2. Define a submit handler.
//     // Log the user input as a JS object.
//     function onSubmit(values: z.infer<typeof formSchema>) {
//         // Do something with the form values.
//         // This will be type-safe and validated.
//         console.log(values);
//     }

//     return (
//         <div className='m-10'>
//             <Form {...form}>
//                 <form
//                     onSubmit={form.handleSubmit(onSubmit)}
//                     className='space-y-9 join w-full flex flex-col gap-5'
//                 >
//                     <FormField
//                         control={form.control}
//                         name='username'
//                         render={({ field }) => (
//                             <FormItem>
//                                 <FormLabel>Username</FormLabel>
//                                 <FormControl>
//                                     <Input placeholder='Enter your username' {...field} className='input input-bordered  mt-3  join-item ' />
//                                 </FormControl>
//                                 <FormMessage />
//                             </FormItem>
//                         )}
//                     />
//                     <Button type='submit' className='btn join-item'>Add Job</Button>
//                 </form>
//             </Form>
//         </div>
//     );
// }
// export { CreateJobForm };

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

import toast, { Toaster } from 'react-hot-toast';




function CreateJobForm() {


    const form = useForm<CreateAndEditJobType>({

        resolver: zodResolver(CreateAndEditJobSchema),
        defaultValues: {
            position: '',
            company: '',
            location: '',
            mode: JobMode.FullTime,
            status: JobStatus.Pending,
        },
    });

    function onSubmit(values: CreateAndEditJobType) {
        console.log(values);
        if(!values){
            toast.error("An Error Occured");
        }
        else{
            toast.success("Successfully Submitted");
        }
    }

    return (
        <div className="mt-10">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-start">
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
                        className="btn bg-neutral-100 text-neutral-900 mt-16"
                    >Add Job</Button>
                </form>
            </Form>
        </div>
    );
}


export { CreateJobForm };