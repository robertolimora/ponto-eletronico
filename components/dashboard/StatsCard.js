import React from "react";

export default function StatsCard({ title, value, icon: Icon, color, isLoading, isText = false }) {
  const colorClasses = {
    blue: "text-blue-600",
    green: "text-green-600", 
    purple: "text-purple-600",
    orange: "text-orange-600"
  };

  return (
    <div className="neumorphic p-6 rounded-3xl">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 neumorphic rounded-full flex items-center justify-center`}>
          <Icon className={`w-6 h-6 ${colorClasses[color]}`} />
        </div>
      </div>
      <div>
        <p className="text-gray-500 text-sm mb-1">{title}</p>
        {isLoading ? (
          <div className="h-8 bg-gray-300 rounded animate-pulse"></div>
        ) : (
          <p className={`font-bold ${isText ? 'text-xl' : 'text-3xl'} text-gray-700`}>
            {value}
          </p>
        )}
      </div>
    </div>
  );
}
