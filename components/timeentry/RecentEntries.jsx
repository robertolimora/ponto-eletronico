import React from "react";
import { Clock, Calendar } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export default function RecentEntries({ entries }) {
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
      entrada: "text-green-600 bg-green-50",
      saida: "text-red-600 bg-red-50",
      saida_almoco: "text-orange-600 bg-orange-50", 
      retorno_almoco: "text-blue-600 bg-blue-50"
    };
    return colors[type] || "text-gray-600 bg-gray-50";
  };

  return (
    <div className="neumorphic p-6 rounded-3xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 neumorphic rounded-full flex items-center justify-center">
          <Calendar className="w-4 h-4 text-gray-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-700">Últimos Registros</h3>
      </div>

      <div className="space-y-3">
        {entries.map((entry, index) => (
          <div key={index} className="flex items-center justify-between p-4 neumorphic-inset rounded-2xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 neumorphic rounded-full flex items-center justify-center">
                <Clock className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <p className={`font-medium px-3 py-1 rounded-full text-sm ${getEntryTypeColor(entry.entry_type)}`}>
                  {getEntryTypeLabel(entry.entry_type)}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {format(new Date(entry.timestamp), "dd/MM/yyyy", { locale: ptBR })}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-gray-700">
                {format(new Date(entry.timestamp), "HH:mm:ss")}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}