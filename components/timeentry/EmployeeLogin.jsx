import React, { useState } from "react";
import { Employee } from "@/entities/all";
import { User, Lock, AlertCircle } from "lucide-react";

export default function EmployeeLogin({ onLogin }) {
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!employeeId || !password) {
      setError("Preencha todos os campos");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const employees = await Employee.filter({ 
        employee_id: employeeId, 
        password: password,
        active: true 
      });

      if (employees.length === 0) {
        setError("ID ou senha incorretos, ou funcionário inativo");
      } else {
        onLogin(employees[0]);
      }
    } catch (error) {
      setError("Erro ao fazer login. Tente novamente.");
    }

    setIsLoading(false);
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="neumorphic p-8 rounded-3xl">
        <div className="text-center mb-6">
          <div className="w-16 h-16 neumorphic rounded-full mx-auto mb-4 flex items-center justify-center">
            <User className="w-8 h-8 text-gray-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-700">Login do Funcionário</h2>
          <p className="text-gray-500 mt-2">Digite suas credenciais para continuar</p>
        </div>

        {error && (
          <div className="neumorphic-inset p-4 rounded-2xl mb-4 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-500" />
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-600 font-medium mb-2">ID do Funcionário</label>
            <div className="neumorphic-inset p-4 rounded-2xl">
              <input
                type="text"
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                placeholder="Digite seu ID"
                className="w-full bg-transparent border-none outline-none text-gray-700 placeholder-gray-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-600 font-medium mb-2">Senha</label>
            <div className="neumorphic-inset p-4 rounded-2xl">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite sua senha"
                className="w-full bg-transparent border-none outline-none text-gray-700 placeholder-gray-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 neumorphic rounded-2xl font-medium text-gray-700 hover:text-gray-800 transition-all active:neumorphic-pressed disabled:opacity-50"
          >
            {isLoading ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}