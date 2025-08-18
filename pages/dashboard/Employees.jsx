import React, { useState, useEffect } from "react";
import { Employee } from "@/entities/all";
import { Plus, Search, Users, Edit, Trash2 } from "lucide-react";

import EmployeeCard from "../components/employees/EmployeeCard";
import EmployeeForm from "../components/employees/EmployeeForm";

export default function EmployeesPage() {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadEmployees();
  }, []);

  useEffect(() => {
    filterEmployees();
  }, [employees, searchTerm]);

  const loadEmployees = async () => {
    setIsLoading(true);
    try {
      const data = await Employee.list('-created_date');
      setEmployees(data);
    } catch (error) {
      console.error("Erro ao carregar funcionários:", error);
    }
    setIsLoading(false);
  };

  const filterEmployees = () => {
    const filtered = employees.filter(emp =>
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.employee_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (emp.department && emp.department.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredEmployees(filtered);
  };

  const handleSubmit = async (employeeData) => {
    try {
      if (editingEmployee) {
        await Employee.update(editingEmployee.id, employeeData);
      } else {
        await Employee.create(employeeData);
      }
      await loadEmployees();
      setShowForm(false);
      setEditingEmployee(null);
    } catch (error) {
      console.error("Erro ao salvar funcionário:", error);
    }
  };

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
    setShowForm(true);
  };

  const toggleStatus = async (employee) => {
    try {
      await Employee.update(employee.id, { active: !employee.active });
      await loadEmployees();
    } catch (error) {
      console.error("Erro ao alterar status:", error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-700">Funcionários</h1>
          <p className="text-gray-500">Gerencie os funcionários do sistema</p>
        </div>
        <button
          onClick={() => {
            setEditingEmployee(null);
            setShowForm(true);
          }}
          className="flex items-center gap-2 px-6 py-3 neumorphic rounded-2xl text-gray-600 hover:text-gray-700 transition-all active:neumorphic-pressed"
        >
          <Plus className="w-5 h-5" />
          Novo Funcionário
        </button>
      </div>

      {/* Search */}
      <div className="neumorphic-inset p-4 rounded-2xl">
        <div className="flex items-center gap-3">
          <Search className="w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Buscar funcionários..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-gray-700 placeholder-gray-500"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="neumorphic p-4 rounded-2xl text-center">
          <div className="w-12 h-12 neumorphic rounded-full mx-auto mb-2 flex items-center justify-center">
            <Users className="w-6 h-6 text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-gray-700">{employees.length}</p>
          <p className="text-gray-500">Total</p>
        </div>
        <div className="neumorphic p-4 rounded-2xl text-center">
          <div className="w-12 h-12 neumorphic rounded-full mx-auto mb-2 flex items-center justify-center">
            <Users className="w-6 h-6 text-green-600" />
          </div>
          <p className="text-2xl font-bold text-gray-700">
            {employees.filter(emp => emp.active).length}
          </p>
          <p className="text-gray-500">Ativos</p>
        </div>
        <div className="neumorphic p-4 rounded-2xl text-center">
          <div className="w-12 h-12 neumorphic rounded-full mx-auto mb-2 flex items-center justify-center">
            <Users className="w-6 h-6 text-orange-600" />
          </div>
          <p className="text-2xl font-bold text-gray-700">
            {employees.filter(emp => !emp.active).length}
          </p>
          <p className="text-gray-500">Inativos</p>
        </div>
      </div>

      {/* Employee Form Modal */}
      {showForm && (
        <EmployeeForm
          employee={editingEmployee}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingEmployee(null);
          }}
        />
      )}

      {/* Employee List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          Array(6).fill(0).map((_, i) => (
            <div key={i} className="neumorphic p-6 rounded-3xl animate-pulse">
              <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-4"></div>
              <div className="h-4 bg-gray-300 rounded mb-2"></div>
              <div className="h-3 bg-gray-300 rounded mb-4"></div>
              <div className="h-8 bg-gray-300 rounded"></div>
            </div>
          ))
        ) : (
          filteredEmployees.map((employee) => (
            <EmployeeCard
              key={employee.id}
              employee={employee}
              onEdit={handleEdit}
              onToggleStatus={toggleStatus}
            />
          ))
        )}
      </div>

      {!isLoading && filteredEmployees.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">
            {searchTerm ? "Nenhum funcionário encontrado" : "Nenhum funcionário cadastrado"}
          </p>
        </div>
      )}
    </div>
  );
}