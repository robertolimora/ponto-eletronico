"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Clock, Users, FileText, LayoutDashboard, User } from "lucide-react";

const navigationItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Registrar Ponto", url: "/timeentry", icon: Clock },
  { title: "Funcionários", url: "/employees", icon: Users },
  { title: "Relatórios", url: "/reports", icon: FileText },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 min-h-screen neumorphic p-6 mr-4">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 neumorphic rounded-full flex items-center justify-center">
            <Clock className="w-6 h-6 text-gray-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-700">PontoTech</h2>
            <p className="text-sm text-gray-500">Sistema de Ponto</p>
          </div>
        </div>
      </div>

      <nav className="space-y-3">
        {navigationItems.map((item) => (
          <Link
            key={item.title}
            href={item.url}
            className={`flex items-center gap-3 p-4 rounded-2xl transition-all duration-200 ${
              pathname === item.url
                ? "neumorphic-active text-gray-700"
                : "neumorphic hover:shadow-lg text-gray-600 hover:text-gray-700"
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.title}</span>
          </Link>
        ))}
      </nav>

      <div className="mt-8 p-4 neumorphic-inset rounded-2xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 neumorphic rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-gray-600" />
          </div>
          <div>
            <p className="font-medium text-gray-700">Administrador</p>
            <p className="text-xs text-gray-500">Sistema Ativo</p>
          </div>
        </div>
      </div>
    </div>
  );
}
