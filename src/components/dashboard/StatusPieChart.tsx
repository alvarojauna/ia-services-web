'use client';

import { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { motion } from 'framer-motion';

interface Project {
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
}

interface StatusPieChartProps {
  projects: Project[];
}

const statusConfig = {
  pending: { label: 'Pendiente', color: '#F59E0B' },
  in_progress: { label: 'En Progreso', color: '#3B82F6' },
  completed: { label: 'Completado', color: '#22C55E' },
  cancelled: { label: 'Cancelado', color: '#EF4444' },
};

export default function StatusPieChart({ projects }: StatusPieChartProps) {
  const chartData = useMemo(() => {
    const statusCounts: Record<string, number> = {
      pending: 0,
      in_progress: 0,
      completed: 0,
      cancelled: 0,
    };

    projects.forEach((project) => {
      statusCounts[project.status]++;
    });

    return Object.entries(statusCounts)
      .filter((entry) => entry[1] > 0)
      .map(([status, count]) => ({
        name: statusConfig[status as keyof typeof statusConfig].label,
        value: count,
        color: statusConfig[status as keyof typeof statusConfig].color,
      }));
  }, [projects]);

  interface PieTooltipPayload {
    payload: { name: string; value: number; color: string };
  }

  const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: PieTooltipPayload[] }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <p className="font-medium text-gray-900 dark:text-white">{data.name}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {data.value} proyecto{data.value !== 1 ? 's' : ''}
          </p>
        </div>
      );
    }
    return null;
  };

  if (projects.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700"
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Estado de Proyectos
        </h3>
        <div className="h-48 flex items-center justify-center">
          <p className="text-gray-500 dark:text-gray-400">No hay proyectos</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700"
    >
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Estado de Proyectos
      </h3>

      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={70}
              paddingAngle={4}
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-2 mt-4">
        {chartData.map((item) => (
          <div key={item.name} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {item.name} ({item.value})
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
