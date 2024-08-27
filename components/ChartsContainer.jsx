'use client';
import React, { PureComponent } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
} from "recharts";
import { useQuery } from '@tanstack/react-query';
import { getChartsAction } from '../utils/action';



const ChartsContainer = () => {

  let { data, isError } = useQuery({
    queryKey: ['charts'],
    queryFn: async () => await getChartsAction(),
  });


  if (isError) {
    return (
      <span className='text-3xl'>No Charts Found...</span>
    );
  };





  return (
    <div className='mt-16 xl:flex flex-row items-center gap-16'>

      <BarChart
        width={400}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 1,
          left: 2,
          bottom: 5
        }}
        barSize={20}
        className='m-10'
      >
        <XAxis dataKey="date" scale="point" padding={{ left: 20, right: 20 }} />
        <YAxis />
        <Tooltip />
        <Legend />
        <CartesianGrid strokeDasharray="3 3" />
        <Bar dataKey="JobsApplied" fill="#2563eb" background={{ fill: "#eee" }} />
      </BarChart>

      <LineChart width={400} height={300} data={data} className='m-10'>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" padding={{ left: 30, right: 30 }} />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="JobsApplied"
        stroke="#2563eb"
        activeDot={{ r: 8 }}
      />
    </LineChart>

    </div>
  );
}

export { ChartsContainer }; 