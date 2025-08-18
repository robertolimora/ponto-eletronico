import React, { useState, useEffect } from "react";
import { Employee, TimeEntry } from "@/entities/all";
import { Clock, User, Lock, CheckCircle, AlertCircle } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import EmployeeLogin from "../components/timeentry/EmployeeLogin";
import TimeEntryForm from "../components/timeentry/TimeEntryForm";
import RecentEntries from "../components/timeentry/RecentEntries";

export default function TimeEntryPage() {
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [recentEntries, setRecentEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (currentEmployee) {
      loadRecentEntries();
    }
  }, [currentEmployee]);

  const loadRecentEntries = async () => {
    if (!currentEmployee) return;
    
    try {
      const entries = await TimeEntry.filter(
        { employee_id: currentEmployee.employee_id },
        '-timestamp',
        5
      );
      setRecentEntries(entries);
    } catch (error) {
      console.error("Erro ao carregar registros:", error);
    }
  };

  const handleLogin = (employee) => {
    setCurrentEmployee(employee);
  };

  const handleLogout = () => {
    setCurrentEmployee(null);
    setRecentEntries([]);
  };

  const handleTimeEntry = async (entryType) => {
    if (!currentEmployee) return;
    
    setIsLoading(true);
    try {
      await TimeEntry.create({
        employee_id: currentEmployee.employee_id,
        employee_name: currentEmployee.name,
        entry_type: entryType,
        timestamp: new Date().toISOString(),
        location: "Sistema Web"
      });
      
      await loadRecentEntries();
    } catch (error) {
      console.error("Erro ao registrar ponto:", error);
    }
    setIsLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-24 h-24 neumorphic rounded-full mx-auto mb-4 flex items-center justify-center">
          <Clock className="w-12 h-12 text-gray-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-700 mb-2">Registro de Ponto</h1>
        <p className="text-gray-500">
          {format(new Date(), "EEEE, d 'de' MMMM 'de' yyyy - HH:mm", { locale: ptBR })}
        </p>
      </div>

      {!currentEmployee ? (
        <EmployeeLogin onLogin={handleLogin} />
      ) : (
        <div className="space-y-6">
          {/* Employee Info */}
          <div className="neumorphic p-6 rounded-3xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 neumorphic rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-gray-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-700">{currentEmployee.name}</h2>
                  <p className="text-gray-500">ID: {currentEmployee.employee_id}</p>
                  <p className="text-sm text-gray-500">{currentEmployee.department} - {currentEmployee.position}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="px-6 py-2 neumorphic rounded-2xl text-gray-600 hover:text-gray-700 transition-colors"
              >
                Sair
              </button>
            </div>
          </div>

          {/* Time Entry Form */}
          <TimeEntryForm
            onTimeEntry={handleTimeEntry}
            isLoading={isLoading}
            recentEntries={recentEntries}
          />

          {/* Recent Entries */}
          {recentEntries.length > 0 && (
            <RecentEntries entries={recentEntries} />
          )}
        </div>
      )}
    </div>
  );
}