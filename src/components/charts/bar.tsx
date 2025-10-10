import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
} from "recharts";


export const AnimatedLineChart = () => {
  const data = [
  { name: "Page A", uv: 400, pv: 2400, amt: 2400 },
  { name: "Page B", uv: 300, pv: 2200, amt: 2100 },
  { name: "Page C", uv: 500, pv: 2500, amt: 2600 },
];

  return (
    <div className="w-full h-[300px] sm:h-[350px] md:h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 20, right: 20, bottom: 10, left: 0 }}
        >
          <CartesianGrid stroke="#e5e7eb" strokeDasharray="5 5" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="uv"
            stroke="#9333ea"
            strokeWidth={2}
            name="Visitors"
            dot={{ r: 5 }}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export const AnimatedBarChart = () => {
  const data = [
  { name: "Jan", savings: 4000, expenses: 2400 },
  { name: "Feb", savings: 3000, expenses: 1398 },
  { name: "Mar", savings: 2000, expenses: 9800 },
  { name: "Apr", savings: 2780, expenses: 3908 },
  { name: "May", savings: 1890, expenses: 4800 },
];
  return (
    <div className="w-full h-[250px] sm:h-[350px] md:h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 20, left: 0, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="name" tick={{ fill: "#6b7280" }} />
          <YAxis tick={{ fill: "#6b7280" }} />
          <Tooltip
            contentStyle={{ backgroundColor: "#fff", borderRadius: "0.5rem" }}
          />
          <Legend />
          <Bar
            dataKey="savings"
            fill="#4f46e5"
            barSize={40}
            radius={[6, 6, 0, 0]}
            animationDuration={1000}
          />
          <Bar
            dataKey="expenses"
            fill="#9333ea"
            barSize={40}
            radius={[6, 6, 0, 0]}
            animationDuration={1000}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
