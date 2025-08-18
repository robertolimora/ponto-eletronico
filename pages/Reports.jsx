import React, { useState, useEffect } from "react";
import { Employee, TimeEntry } from "@/entities/all";
import { FileText, Download, Calendar, Filter, Clock } from "lucide-react";
import { format, startOfMonth, endOfMonth, subMonths } from "date-fns";
import { ptBR } from "date-fns/locale";

import ReportFilters from "../components/reports/ReportFilters";
import EmployeeReportCard from "../components/reports/EmployeeReportCard";
import MonthlyOverview from "../components/reports/MonthlyOverview";

export default function ReportsPage() {
  const [employees, setEmployees] = useState([]);
  const [timeEntries, setTimeEntries] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(format(new Date(), "yyyy-MM"));
  const [reportData, setReportData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadEmployees();
  }, []);

  useEffect(() => {
    if (selectedMonth) {
      generateReport();
    }
  }, [selectedEmployee, selectedMonth]);

  const loadEmployees = async () => {
    try {
      const data = await Employee.filter({ active: true });
      setEmployees(data);
    } catch (error) {
      console.error("Erro ao carregar funcionários:", error);
    }
  };

  const generateReport = async () => {
    setIsLoading(true);
    try {
      const [year, month] = selectedMonth.split("-");
      const startDate = startOfMonth(new Date(parseInt(year), parseInt(month) - 1));
      const endDate = endOfMonth(new Date(parseInt(year), parseInt(month) - 1));

      // Buscar todas as entradas do mês
      const allEntries = await TimeEntry.list('-timestamp', 1000);
      
      const filteredEntries = allEntries.filter(entry => {
        const entryDate = new Date(entry.timestamp);
        const isInDateRange = entryDate >= startDate && entryDate <= endDate;
        const isEmployeeMatch = !selectedEmployee || entry.employee_id === selectedEmployee;
        return isInDateRange && isEmployeeMatch;
      });

      setTimeEntries(filteredEntries);
      
      // Gerar dados de relatório por funcionário
      const employeeReports = generateEmployeeReports(filteredEntries);
      setReportData(employeeReports);
    } catch (error) {
      console.error("Erro ao gerar relatório:", error);
    }
    setIsLoading(false);
  };

  const generateEmployeeReports = (entries) => {
    const employeeData = {};
    
    entries.forEach(entry => {
      if (!employeeData[entry.employee_id]) {
        employeeData[entry.employee_id] = {
          employee_id: entry.employee_id,
          employee_name: entry.employee_name,
          entries: [],
          totalDays: 0,
          totalHours: 0,
          avgArrival: null
        };
      }
      employeeData[entry.employee_id].entries.push(entry);
    });

    // Calcular estatísticas para cada funcionário
    Object.values(employeeData).forEach(empData => {
      const entriesByDate = {};
      
      empData.entries.forEach(entry => {
        const date = format(new Date(entry.timestamp), 'yyyy-MM-dd');
        if (!entriesByDate[date]) {
          entriesByDate[date] = [];
        }
        entriesByDate[date].push(entry);
      });
      
      empData.totalDays = Object.keys(entriesByDate).length;
      
      // Calcular horas trabalhadas (simplificado)
      empData.totalHours = empData.entries.filter(e => e.entry_type === 'entrada').length * 8;
      
      // Calcular horário médio de chegada
      const arrivals = empData.entries.filter(e => e.entry_type === 'entrada');
      if (arrivals.length > 0) {
        const avgMinutes = arrivals.reduce((sum, entry) => {
          const time = new Date(entry.timestamp);
          return sum + (time.getHours() * 60 + time.getMinutes());
        }, 0) / arrivals.length;
        
        const hours = Math.floor(avgMinutes / 60);
        const minutes = Math.floor(avgMinutes % 60);
        empData.avgArrival = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
      }
    });

    return Object.values(employeeData);
  };

  const exportReport = () => {
    const csvContent = generateCSV();
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `relatorio-ponto-${selectedMonth}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const generateCSV = () => {
    const headers = ['Funcionário', 'ID', 'Data', 'Tipo', 'Horário'];
    const rows = timeEntries.map(entry => [
      entry.employee_name,
      entry.employee_id,
      format(new Date(entry.timestamp), 'dd/MM/yyyy'),
      entry.entry_type,
      format(new Date(entry.timestamp), 'HH:mm:ss')
    ]);
    
    return [headers, ...rows]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-700">Relatórios</h1>
          <p className="text-gray-500">Acompanhe a frequência e pontualidade</p>
        </div>
        <button
          onClick={exportReport}
          disabled={timeEntries.length === 0}
          className="flex items-center gap-2 px-6 py-3 neumorphic rounded-2xl text-gray-600 hover:text-gray-700 transition-all active:neumorphic-pressed disabled:opacity-50"
        >
          <Download className="w-5 h-5" />
          Exportar CSV
        </button>
      </div>

      {/* Filters */}
      <ReportFilters
        employees={employees}
        selectedEmployee={selectedEmployee}
        selectedMonth={selectedMonth}
        onEmployeeChange={setSelectedEmployee}
        onMonthChange={setSelectedMonth}
      />

      {/* Monthly Overview */}
      <MonthlyOverview
        reportData={reportData}
        selectedMonth={selectedMonth}
        isLoading={isLoading}
      />

      {/* Employee Reports */}
      <div className="grid gap-6">
        {isLoading ? (
          Array(3).fill(0).map((_, i) => (
            <div key={i} className="neumorphic p-6 rounded-3xl animate-pulse">
              <div className="h-6 bg-gray-300 rounded mb-4"></div>
              <div className="grid grid-cols-4 gap-4">
                {Array(4).fill(0).map((_, j) => (
                  <div key={j} className="h-12 bg-gray-300 rounded"></div>
                ))}
              </div>
            </div>
          ))
        ) : (
          reportData.map((employeeReport) => (
            <EmployeeReportCard
              key={employeeReport.employee_id}
              employeeReport={employeeReport}
              selectedMonth={selectedMonth}
            />
          ))
        )}
      </div>

      {!isLoading && reportData.length === 0 && (
        <div className="text-center py-12">
          <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">
            Nenhum registro encontrado para o período selecionado
          </p>
        </div>
      )}
    </div>
  );
}