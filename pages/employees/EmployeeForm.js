import React from "react";
import { User, Edit, Power } from "lucide-react";

export default function EmployeeCard({ employee, onEdit, onToggleStatus }) {
  return (
    <div className="neumorphic p-6 rounded-3xl">
      <div className="text-center mb-4">
        <div className="w-16 h-16 neumorphic rounded-full mx-auto mb-3 flex items-center justify-center">
          <User className="w-8 h-8 text-gray-600" />
        </div>
        <h3 className="font-bold text-gray-700">{employee.name}</h3>
        <p className="text-sm text-gray-500">ID: {employee.employee_id}</p>
      </div>

      <div className="space-y-2 mb-4">
        {employee.department && (
          <p className="text-sm text-gray-600">
            <span className="font-medium">Departamento:</span> {employee.department}
          </p>
        )}
        {employee.position && (
          <p className="text-sm text-gray-600">
            <span className="font-medium">Cargo:</span> {employee.position}
          </p>
        )}
      </div>

      <div className={`p-2 rounded-2xl text-center mb-4 ${
        employee.active 
          ? "neumorphic-inset text-green-700" 
          : "neumorphic-inset text-red-700"
      }`}>
        <p className="text-sm font-medium">
          {employee.active ? "Ativo" : "Inativo"}
        </p>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => onEdit(employee)}
          className="flex-1 py-2 px-4 neumorphic rounded-2xl text-gray-600 hover:text-gray-700 transition-all active:neumorphic-pressed flex items-center justify-center gap-2"
        >
          <Edit className="w-4 h-4" />
          Editar
        </button>
        <button
          onClick={() => onToggleStatus(employee)}
          className={`py-2 px-4 neumorphic rounded-2xl transition-all active:neumorphic-pressed ${
            employee.active 
              ? "text-red-600 hover:text-red-700" 
              : "text-green-600 hover:text-green-700"
          }`}
        >
          <Power className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
