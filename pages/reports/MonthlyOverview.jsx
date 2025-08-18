import React from "react";
import { BarChart, Calendar, Users, TrendingUp } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export default function MonthlyOverview({ reportData, selectedMonth, isLoading }) {
  const [year, month] = selectedMonth.split("-");
  const monthName = format(new Date(parseInt(year), parseInt(month) - 1), "MMMM 'de' yyyy", { locale: ptBR });

  const totalEmployees = reportData.length;
  const totalHours = reportData.reduce((sum, emp) => sum + emp.totalHours, 0);
  const avgHoursPerEmployee = totalEmployees > 0 ? (totalHours / totalEmployees).toFixed(1) : 0;
  const totalRegistries = reportData.reduce((sum, emp) => sum + emp.entries.length, 0);

  return (
    <div className="neumorphic p-6 rounded-3xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 neumorphic rounded-full flex items-center justify-center">
          <BarChart className="w-4 h-4 text-gray-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-700">Resumo de {monthName}</h3>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array(4).fill(0).map((_, i) => (
            <div key={i} className="neumorphic-inset p-4 rounded-2xl text-center animate-pulse">
              <div className="w-8 h-8 bg-gray-300 rounded-full mx-auto mb-2"></div>
              <div className="h-8 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 bg-gray-300 rounded"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="neumorphic-inset p-4 rounded-2xl text-center">
            <div className="w-8 h-8 neumorphic rounded-full mx-auto mb-2 flex items-center justify-center">
              <Users className="w-4 h-4 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-gray-700">{totalEmployees}</p>
            <p className="text-gray-500 text-sm">Funcionários</p>
          </div>

          <div className="neumorphic-inset p-4 rounded-2xl text-center">
            <div className="w-8 h-8 neumorphic rounded-full mx-auto mb-2 flex items-center justify-center">
              <Calendar className="w-4 h-4 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-gray-700">{totalHours}h</p>
            <p className="text-gray-500 text-sm">Total Horas</p>
          </div>

          <div className="neumorphic-inset p-4 rounded-2xl text-center">
            <div className="w-8 h-8 neumorphic rounded-full mx-auto mb-2 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-purple-600" />
            </div>
            <p className="text-2xl font-bold text-gray-700">{avgHoursPerEmployee}h</p>
            <p className="text-gray-500 text-sm">Média/Funcionário</p>
          </div>

          <div className="neumorphic-inset p-4 rounded-2xl text-center">
            <div className="w-8 h-8 neumorphic rounded-full mx-auto mb-2 flex items-center justify-center">
              <BarChart className="w-4 h-4 text-orange-600" />
            </div>
            <p className="text-2xl font-bold text-gray-700">{totalRegistries}</p>
            <p className="text-gray-500 text-sm">Registros</p>
          </div>
        </div>
      )}
    </div>
  );
}