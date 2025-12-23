import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

// MOCK DATA (To be replaced by API calls to Sync Service)
const KPIS = [
    { title: "Active Leads", value: "142", change: "+12%", color: "bg-blue-500" },
    { title: "Cars in Shop", value: "3", change: "Capacity: 6", color: "bg-orange-500" },
    { title: "Est. Revenue", value: "$4,250", change: "This Week", color: "bg-green-600" },
];

const CHART_DATA = [
    { name: 'Mon', leads: 4, revenue: 2400 },
    { name: 'Tue', leads: 3, revenue: 1398 },
    { name: 'Wed', leads: 9, revenue: 9800 },
    { name: 'Thu', leads: 2, revenue: 3908 },
    { name: 'Fri', leads: 6, revenue: 4800 },
    { name: 'Sat', leads: 4, revenue: 3800 },
];

const TASKS = [
    { id: 1, name: "Honda Civic - Freins", status: "In Progress", assignee: "Maxime" },
    { id: 2, name: "Ford F150 - Transmission", status: "Parts Ordered", assignee: "Jesse" },
    { id: 3, name: "Mazda 3 - Pneus", status: "Done", assignee: "Maxime" },
];

const DashboardPage: React.FC = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-2 text-slate-800 dark:text-white">MGC Command Center</h1>
            <p className="text-slate-500 mb-8">Live Operations & Pipeline Sync</p>

            {/* KPI GRID */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {KPIS.map((kpi, idx) => (
                    <div key={idx} className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
                        <div className={`w-2 h-2 rounded-full ${kpi.color} mb-2`}></div>
                        <p className="text-slate-500 text-sm">{kpi.title}</p>
                        <h3 className="text-3xl font-bold text-slate-900 dark:text-white">{kpi.value}</h3>
                        <span className="text-xs text-green-500 font-medium">{kpi.change}</span>
                    </div>
                ))}
            </div>

            {/* CHARTS & LISTS */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* REVENUE CHART */}
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
                    <h3 className="text-lg font-bold mb-4 text-slate-800 dark:text-white">Weekly Pipeline Value</h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={CHART_DATA}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <Tooltip />
                                <Bar dataKey="revenue" fill="#EA580C" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* CLICKUP TASKS */}
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-bold text-slate-800 dark:text-white">Shop Floor (ClickUp)</h3>
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Live Sync</span>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead>
                                <tr className="border-b border-slate-200 dark:border-slate-600">
                                    <th className="pb-2 text-slate-500">Task</th>
                                    <th className="pb-2 text-slate-500">Status</th>
                                    <th className="pb-2 text-slate-500">Assignee</th>
                                </tr>
                            </thead>
                            <tbody>
                                {TASKS.map((task) => (
                                    <tr key={task.id} className="border-b border-slate-100 dark:border-slate-700 last:border-0 hover:bg-slate-50 dark:hover:bg-slate-750">
                                        <td className="py-3 font-medium text-slate-800 dark:text-slate-200">{task.name}</td>
                                        <td className="py-3">
                                            <span className={`px-2 py-1 rounded text-xs ${task.status === 'Done' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                                {task.status}
                                            </span>
                                        </td>
                                        <td className="py-3 text-slate-500">{task.assignee}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default DashboardPage;
