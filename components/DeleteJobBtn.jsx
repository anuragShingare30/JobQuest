import React from 'react'
import { useMutation } from "@tanstack/react-query";
import toast from 'react-hot-toast';
import {deleteJobAction} from "../utils/action";

const DeleteJobBtn = ({id}) => {

  let {mutate,data,isPending} = useMutation({
    mutationFn: async(id)=> await deleteJobAction(id),
    onSuccess:(data)=>{
      if(!data){
        toast.error("Something went wrong");
      }
      toast.success("Deleted!!!");
    }
  });

  function handleSubmit(){
    mutate(id);
  }

  return (
    <form onSubmit={handleSubmit}>
      <button 
        type='submit' 
        className='btn btn-sm btn-primary'
        disabled={isPending}
        >
          {isPending ? 'Please Wait' : 'Delete'}
        </button>
    </form>
  )
}

export {DeleteJobBtn};
