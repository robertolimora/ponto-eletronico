import React from "react";
import { Filter, Calendar, User } from "lucide-react";
import { format } from "date-fns";

export default function ReportFilters({ 
  employees, 
  selectedEmployee, 
  selectedMonth, 
  onEmployeeChange, 
  onMonthChange 
}) {
  const generateMonthOptions = () => {
    const options = [];
    const currentDate = new Date();
    
    for (let i = 0; i < 12; i++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
      const value = format(date, "yyyy-MM");
      const label = format(date, "MMMM 'de' yyyy");
      options.push({ value, label });
    }
    
    return options;
  };

  return (
    <div className="neumorphic p-6 rounded-3xl">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 neumorphic rounded-full flex items-center justify-center">
          <Filter className="w-4 h-4 text-gray-600" />
        </div>
        <h3 className="text-lg font-bold text-gray-700">Filtros</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-600 font-medium mb-2">Funcionário</label>
          <div className="neumorphic-inset p-3 rounded-2xl">
            <select
              value={selectedEmployee}
              onChange={(e) => onEmployeeChange(e.target.value)}
              className="w-full bg-transparent border-none outline-none text-gray-700"
            >
              <option value="">Todos os funcionários</option>
              {employees.map((emp) => (
                <option key={emp.id} value={emp.employee_id}>
                  {emp.name} ({emp.employee_id})
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-gray-600 font-medium mb-2">Mês/Ano</label>
          <div className="neumorphic-inset p-3 rounded-2xl">
            <select
              value={selectedMonth}
              onChange={(e) => onMonthChange(e.target.value)}
              className="w-full bg-transparent border-none outline-none text-gray-700"
            >
              {generateMonthOptions().map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
