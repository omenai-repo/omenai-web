"use client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

function CustomTooltip() {
  return (
    <div className="custom-tooltip">
      <p className="desc">Anything you want can be displayed here.</p>
    </div>
  );
}
export function SalesActivity({ activityData }: any) {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        paddingBottom: "300px",
      }}
    >
      <div
        className="text-xs text-dark"
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          top: 0,
        }}
      >
        <ResponsiveContainer>
          <AreaChart data={activityData} margin={{ top: 3, bottom: 35 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" height={20} className="text-xs" />
            <YAxis width={50} className="text-xs " />
            <Tooltip />
            <Legend verticalAlign="bottom" />
            <Area
              type="monotone"
              dataKey="Revenue"
              stroke="#585858"
              fill="#EFEFEF"
            />
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
