import { FC } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
interface IMyLineChart {
  data: {
    name: string;
    height: number;
  }[];
}

export const MyLineChart: FC<IMyLineChart> = ({ data }) => {
  return (
    <LineChart
      width={800}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 20,
        bottom: 5,
        left: 0,
      }}
    >
      <Line type="monotone" dataKey="height" stroke="#8884d8" />
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
    </LineChart>
  );
};
