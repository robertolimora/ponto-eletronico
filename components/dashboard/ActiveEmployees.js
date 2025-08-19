import React from "react";
import { Users, Clock, CheckCircle } from "lucide-react";
import { format } from "date-fns";

export default function ActiveEmployees({ employees, todayEntries, isLoading }) {
  const hasEntryToday = (employeeId) => {
    return todayEntries.some(entry => entry.employee_id === employeeId);
  };

  const getLastEntry = (employeeId) => {
    const empEntries = todayEntries.filter(entry => entry.employee_id === employeeId);
    if (empEntries.length === 0) return null;
    return empEntries.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))[0];
  };

  return (
    <div className="neumorphic p-6 rounded-3xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 neumorphic rounded-full flex items-center justify-center">
          <Users className="w-4 h-4 text-gray-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-700">Funcionários</h3>
      </div>

      <div className="space-y-4">
        {isLoading ? (
          Array(5).fill(0).map((_, i) => (
            <div key={i} className="flex items-center gap-4 p-4 neumorphic-inset rounded-2xl animate-pulse">
              <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-3 bg-gray-300 rounded"></div>
              </div>
              <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
            </div>
          ))
        ) : employees.length === 0 ? (
          <div className="text-center py-8">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500">Nenhum funcionário ativo</p>
          </div>
        ) : (
          employees.map((employee) => {
            const lastEntry = getLastEntry(employee.employee_id);
            const isPresent = hasEntryToday(employee.employee_id);
            
            return (
              <div key={employee.id} className="flex items-center gap-4 p-4 neumorphic-inset rounded-2xl">
                <div className="w-10 h-10 neumorphic rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-600">
                    {employee.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-700">{employee.name}</p>
                  <p className="text-sm text-gray-500">
                    {employee.department || "Sem departamento"}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {isPresent ? (
                    <>
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      {lastEntry && (
                        <span className="text-xs text-gray-500">
                          {format(new Date(lastEntry.timestamp), "HH:mm")}
                        </span>
                      )}
                    </>
                  ) : (
                    <Clock className="w-4 h-4 text-gray-400" />
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
