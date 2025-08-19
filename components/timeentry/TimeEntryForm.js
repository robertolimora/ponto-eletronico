import React from "react";
import { Clock, Coffee, LogIn, LogOut } from "lucide-react";

export default function TimeEntryForm({ onTimeEntry, isLoading, recentEntries }) {
  const entryTypes = [
    { id: "entrada", label: "Entrada", icon: LogIn, color: "text-green-600" },
    { id: "saida_almoco", label: "Saída Almoço", icon: Coffee, color: "text-orange-600" },
    { id: "retorno_almoco", label: "Retorno Almoço", icon: Coffee, color: "text-blue-600" },
    { id: "saida", label: "Saída", icon: LogOut, color: "text-red-600" }
  ];

  const getLastEntryType = () => {
    if (recentEntries.length === 0) return null;
    return recentEntries[0].entry_type;
  };

  const getSuggestedNextEntry = () => {
    const lastType = getLastEntryType();
    if (!lastType || lastType === "saida") return "entrada";
    if (lastType === "entrada") return "saida_almoco";
    if (lastType === "saida_almoco") return "retorno_almoco";
    if (lastType === "retorno_almoco") return "saida";
    return "entrada";
  };

  const suggestedEntry = getSuggestedNextEntry();

  return (
    <div className="neumorphic p-6 rounded-3xl">
      <div className="text-center mb-6">
        <div className="w-20 h-20 neumorphic rounded-full mx-auto mb-4 flex items-center justify-center">
          <Clock className="w-10 h-10 text-gray-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-700">Registrar Ponto</h3>
        <p className="text-gray-500">Selecione o tipo de registro</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {entryTypes.map((type) => {
          const Icon = type.icon;
          const isSuggested = type.id === suggestedEntry;
          
          return (
            <button
              key={type.id}
              onClick={() => onTimeEntry(type.id)}
              disabled={isLoading}
              className={`p-6 rounded-3xl transition-all ${
                isSuggested 
                  ? "neumorphic-active ring-2 ring-blue-300" 
                  : "neumorphic hover:shadow-lg active:neumorphic-pressed"
              } disabled:opacity-50 text-center`}
            >
              <div className={`w-12 h-12 neumorphic rounded-full mx-auto mb-3 flex items-center justify-center`}>
                <Icon className={`w-6 h-6 ${type.color}`} />
              </div>
              <p className="font-medium text-gray-700">{type.label}</p>
              {isSuggested && (
                <p className="text-xs text-blue-600 mt-1">Sugerido</p>
              )}
            </button>
          );
        })}
      </div>

      {isLoading && (
        <div className="text-center mt-6">
          <div className="inline-flex items-center gap-2 text-gray-500">
            <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
            Registrando ponto...
          </div>
        </div>
      )}
    </div>
  );
}
