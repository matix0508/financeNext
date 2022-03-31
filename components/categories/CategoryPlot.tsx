import React, { FC } from 'react'
import { useQuery } from 'react-query';
import {MyLineChart} from '../common/MyLineChart';

export const CategoryPlot:FC = () => {
    const {isLoading, error, data: rawData} = useQuery("/api/summary/2022")
  return (<></>
    // <MyLineChart data={} />
  )
}
