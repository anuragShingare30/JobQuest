import React from 'react'
import { CreateJobForm } from '../../../components/CreateJobForm';

const AddJob = () => {
  return (
    <div>
      <h1 className='text-3xl'>Add Jobs</h1>
      <div>
        <CreateJobForm></CreateJobForm>
      </div>
    </div>
  )
} 

export default AddJob; 
