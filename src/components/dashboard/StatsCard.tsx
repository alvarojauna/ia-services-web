'use client';

import { motion } from 'framer-motion';
import { AnimatedCounter } from '@/components/animations';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: 'blue' | 'yellow' | 'green' | 'purple' | 'red';
  suffix?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  loading?: boolean;
}

const colorClasses = {
  blue: {
    bg: 'bg-blue-100 dark:bg-blue-900/20',
    icon: 'text-blue-600 dark:text-blue-400',
    trend: 'text-blue-600',
  },
  yellow: {
    bg: 'bg-yellow-100 dark:bg-yellow-900/20',
    icon: 'text-yellow-600 dark:text-yellow-400',
    trend: 'text-yellow-600',
  },
  green: {
    bg: 'bg-green-100 dark:bg-green-900/20',
    icon: 'text-green-600 dark:text-green-400',
    trend: 'text-green-600',
  },
  purple: {
    bg: 'bg-purple-100 dark:bg-purple-900/20',
    icon: 'text-purple-600 dark:text-purple-400',
    trend: 'text-purple-600',
  },
  red: {
    bg: 'bg-red-100 dark:bg-red-900/20',
    icon: 'text-red-600 dark:text-red-400',
    trend: 'text-red-600',
  },
};

export default function StatsCard({
  title,
  value,
  icon,
  color,
  suffix = '',
  trend,
  loading = false,
}: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}
      className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 transition-shadow"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
            {title}
          </p>
          <div className="flex items-baseline gap-1">
            {loading ? (
              <div className="h-8 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            ) : (
              <>
                <span className="text-3xl font-bold text-gray-900 dark:text-white">
                  <AnimatedCounter value={value} duration={1.5} />
                </span>
                {suffix && (
                  <span className="text-lg text-gray-500 dark:text-gray-400">
                    {suffix}
                  </span>
                )}
              </>
            )}
          </div>
          {trend && (
            <div className="flex items-center gap-1 mt-2">
              <span
                className={cn(
                  'text-sm font-medium',
                  trend.isPositive ? 'text-green-600' : 'text-red-600'
                )}
              >
                {trend.isPositive ? '+' : '-'}
                {Math.abs(trend.value)}%
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                vs mes anterior
              </span>
            </div>
          )}
        </div>
        <div className={cn('p-3 rounded-xl', colorClasses[color].bg)}>
          <div className={colorClasses[color].icon}>{icon}</div>
        </div>
      </div>
    </motion.div>
  );
}
