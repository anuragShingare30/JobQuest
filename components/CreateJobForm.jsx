'use client'
import React from "react"
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from 'react-hot-toast';
import { createJobForm } from "../utils/action";
import { useRouter } from "next/navigation";
function CreateJobForm() {

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    // let queryClient = useQueryClient();
    // let Router = useRouter();

    const { mutate, isPending } = useMutation({
        mutationFn:async  (value) => await createJobForm(value),
        onSuccess: (data) => {
            if (!data) {
                toast.error("Something went wrong");
                return;
            }
            toast.success("Submitted");
            return data;
            // queryClient.invalidateQueries({ queryKey: ['jobs'] });
            // queryClient.invalidateQueries({ queryKey: ['stats'] });
            // queryClient.invalidateQueries({ queryKey: ['charts'] });
            // Router.push('/Jobs');
        },
        

    });

    const onFormSubmit = (value) => {
        console.log(value);
        mutate(value);
    };

    return (
        
            <div className="mt-20 grid grid-cols-2 grid-rows-2 gap-6 ">
                <form onSubmit={handleSubmit(onFormSubmit)}>
                    <input className='input bg-base-100' type="text" placeholder="Enter position" {...register('position')}/>
                    <input className='input bg-base-100' type="text" placeholder="Enter location" {...register('location')} />
                    <input className='input bg-base-100' type="text" placeholder="Enter company" {...register('company')} />
                    <input className='input bg-base-100' type="text" placeholder="Enter mode" {...register('mode')} />
                    <input className='input bg-base-100' type="text" placeholder="Enter status" {...register('status')}/>
                    <button className="btn btn-sm bg-base-100" type="submit" disabled={isPending}>
                        {isPending ? "Submitting..." : "Add"}
                    </button>
                </form>
            </div>
        
    );
}

export { CreateJobForm };
