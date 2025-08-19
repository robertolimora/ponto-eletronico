import React, { useState, useEffect } from "react";
import { Employee, TimeEntry } from "@/entities/all";
import { Clock, Users, TrendingUp, Calendar, UserCheck, Timer } from "lucide-react";
import { format, startOfDay, endOfDay, subDays } from "date-fns";
import { ptBR } from "date-fns/locale";

import StatsCard from "../components/dashboard/StatsCard";
import RecentActivity from "../components/dashboard/RecentActivity";
import ActiveEmployees from "../components/dashboard/ActiveEmployees";

export default function Dashboard() {
  const [employees, setEmployees] = useState([]);
  const [timeEntries, setTimeEntries] = useState([]);
  const [todayEntries, setTodayEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [employeeData, timeEntryData] = await Promise.all([
        Employee.list(),
        TimeEntry.list('-timestamp', 50)
      ]);
      
      setEmployees(employeeData);
      setTimeEntries(timeEntryData);
      
      const today = new Date();
      const todayStart = startOfDay(today);
      const todayEnd = endOfDay(today);
      
      const todayData = timeEntryData.filter(entry => {
        const entryDate = new Date(entry.timestamp);
        return entryDate >= todayStart && entryDate <= todayEnd;
      });
      
      setTodayEntries(todayData);
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    }
    setIsLoading(false);
  };

  const getActiveEmployeesToday = () => {
    const uniqueEmployees = new Set(todayEntries.map(entry => entry.employee_id));
    return uniqueEmployees.size;
  };

  const getTotalHoursToday = () => {
    // Calcular horas trabalhadas hoje (simplificado)
    return todayEntries.length * 2; // Aproximação
  };

  const getAverageEntryTime = () => {
    const entradas = todayEntries.filter(entry => entry.entry_type === 'entrada');
    if (entradas.length === 0) return '--:--';
    
    const avgTime = entradas.reduce((acc, entry) => {
      const time = new Date(entry.timestamp);
      return acc + time.getHours() * 60 + time.getMinutes();
    }, 0) / entradas.length;
    
    const hours = Math.floor(avgTime / 60);
    const minutes = Math.floor(avgTime % 60);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-700 mb-2">Dashboard</h1>
        <p className="text-gray-500">
          {format(new Date(), "EEEE, d 'de' MMMM 'de' yyyy", { locale: ptBR })}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Funcionários Ativos"
          value={employees.filter(emp => emp.active).length}
          icon={Users}
          color="blue"
          isLoading={isLoading}
        />
        <StatsCard
          title="Registros Hoje"
          value={todayEntries.length}
          icon={Clock}
          color="green"
          isLoading={isLoading}
        />
        <StatsCard
          title="Presentes Hoje"
          value={getActiveEmployeesToday()}
          icon={UserCheck}
          color="purple"
          isLoading={isLoading}
        />
        <StatsCard
          title="Horário Médio"
          value={getAverageEntryTime()}
          icon={Timer}
          color="orange"
          isLoading={isLoading}
          isText={true}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Activity - Takes 2 columns */}
        <div className="lg:col-span-2">
          <RecentActivity 
            entries={timeEntries.slice(0, 10)}
            isLoading={isLoading}
          />
        </div>

        {/* Active Employees - Takes 1 column */}
        <div className="lg:col-span-1">
          <ActiveEmployees 
            employees={employees.filter(emp => emp.active).slice(0, 5)}
            todayEntries={todayEntries}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}
