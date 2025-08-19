import React from "react";
import { User, Calendar, Clock, TrendingUp } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export default function EmployeeReportCard({ employeeReport, selectedMonth }) {
  const [year, month] = selectedMonth.split("-");
  const monthName = format(new Date(parseInt(year), parseInt(month) - 1), "MMMM 'de' yyyy", { locale: ptBR });

  return (
    <div className="neumorphic p-6 rounded-3xl">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 neumorphic rounded-full flex items-center justify-center">
          <User className="w-6 h-6 text-gray-600" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-700">{employeeReport.employee_name}</h3>
          <p className="text-gray-500">ID: {employeeReport.employee_id} • {monthName}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="neumorphic-inset p-4 rounded-2xl text-center">
          <div className="w-8 h-8 neumorphic rounded-full mx-auto mb-2 flex items-center justify-center">
            <Calendar className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-gray-700">{employeeReport.totalDays}</p>
          <p className="text-gray-500 text-sm">Dias</p>
        </div>

        <div className="neumorphic-inset p-4 rounded-2xl text-center">
          <div className="w-8 h-8 neumorphic rounded-full mx-auto mb-2 flex items-center justify-center">
            <Clock className="w-4 h-4 text-green-600" />
          </div>
          <p className="text-2xl font-bold text-gray-700">{employeeReport.totalHours}h</p>
          <p className="text-gray-500 text-sm">Horas</p>
        </div>

        <div className="neumorphic-inset p-4 rounded-2xl text-center">
          <div className="w-8 h-8 neumorphic rounded-full mx-auto mb-2 flex items-center justify-center">
            <TrendingUp className="w-4 h-4 text-purple-600" />
          </div>
          <p className="text-lg font-bold text-gray-700">{employeeReport.avgArrival || "--:--"}</p>
          <p className="text-gray-500 text-sm">Média</p>
        </div>

        <div className="neumorphic-inset p-4 rounded-2xl text-center">
          <div className="w-8 h-8 neumorphic rounded-full mx-auto mb-2 flex items-center justify-center">
            <Calendar className="w-4 h-4 text-orange-600" />
          </div>
          <p className="text-2xl font-bold text-gray-700">{employeeReport.entries.length}</p>
          <p className="text-gray-500 text-sm">Registros</p>
        </div>
      </div>

      <div className="neumorphic-inset p-4 rounded-2xl max-h-40 overflow-y-auto">
        <h4 className="font-medium text-gray-700 mb-3">Últimos Registros</h4>
        <div className="space-y-2">
          {employeeReport.entries.slice(0, 5).map((entry, index) => (
            <div key={index} className="flex justify-between text-sm">
              <span className="text-gray-600">
                {format(new Date(entry.timestamp), "dd/MM • HH:mm")}
              </span>
              <span className="text-gray-700 font-medium">
                {entry.entry_type.replace(/_/g, ' ')}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
