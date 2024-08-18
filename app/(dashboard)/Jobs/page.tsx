import React from 'react'


const JobsPage = async  () => {
  await new Promise((resolve)=> {setTimeout(resolve,1000)});


  return (
    
    <div>
      <h1 className='text-3xl'>Jobs Page</h1>
    </div>
    
  )
}

export default JobsPage
