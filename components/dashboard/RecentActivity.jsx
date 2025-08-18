import React from "react";
import { Clock, ArrowRight, User } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export default function RecentActivity({ entries, isLoading }) {
  const getEntryTypeLabel = (type) => {
    const types = {
      entrada: "Entrada",
      saida: "Saída",
      saida_almoco: "Saída Almoço",
      retorno_almoco: "Retorno Almoço"
    };
    return types[type] || type;
  };

  const getEntryTypeColor = (type) => {
    const colors = {
      entrada: "text-green-600",
      saida: "text-red-600", 
      saida_almoco: "text-orange-600",
      retorno_almoco: "text-blue-600"
    };
    return colors[type] || "text-gray-600";
  };

  return (
    <div className="neumorphic p-6 rounded-3xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 neumorphic rounded-full flex items-center justify-center">
          <Clock className="w-4 h-4 text-gray-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-700">Atividade Recente</h3>
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
              <div className="h-4 w-16 bg-gray-300 rounded"></div>
            </div>
          ))
        ) : entries.length === 0 ? (
          <div className="text-center py-8">
            <Clock className="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500">Nenhuma atividade recente</p>
          </div>
        ) : (
          entries.map((entry, index) => (
            <div key={index} className="flex items-center gap-4 p-4 neumorphic-inset rounded-2xl">
              <div className="w-10 h-10 neumorphic rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-gray-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-700">{entry.employee_name}</p>
                <p className="text-sm text-gray-500">
                  <span className={getEntryTypeColor(entry.entry_type)}>
                    {getEntryTypeLabel(entry.entry_type)}
                  </span>
                  {" • "}
                  {format(new Date(entry.timestamp), "dd/MM/yyyy", { locale: ptBR })}
                </p>
              </div>
              <div className="text-sm font-medium text-gray-600">
                {format(new Date(entry.timestamp), "HH:mm")}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}