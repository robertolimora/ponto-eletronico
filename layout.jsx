import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Clock, Users, FileText, LayoutDashboard, User } from "lucide-react";

const navigationItems = [
  {
    title: "Dashboard",
    url: createPageUrl("Dashboard"),
    icon: LayoutDashboard,
  },
  {
    title: "Registrar Ponto",
    url: createPageUrl("TimeEntry"),
    icon: Clock,
  },
  {
    title: "Funcionários",
    url: createPageUrl("Employees"),
    icon: Users,
  },
  {
    title: "Relatórios",
    url: createPageUrl("Reports"),
    icon: FileText,
  },
];

export default function Layout({ children, currentPageName }) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-200">
      <style>{`
        :root {
          --neumorphic-bg: #e0e0e0;
          --neumorphic-light: #ffffff;
          --neumorphic-dark: #bebebe;
          --neumorphic-pressed-light: #d1d1d1;
          --neumorphic-pressed-dark: #a8a8a8;
        }

        .neumorphic {
          background: var(--neumorphic-bg);
          box-shadow: 6px 6px 12px var(--neumorphic-dark), 
                      -6px -6px 12px var(--neumorphic-light);
          border: none;
          transition: all 0.2s ease;
        }

        .neumorphic-inset {
          background: var(--neumorphic-bg);
          box-shadow: inset 4px 4px 8px var(--neumorphic-dark), 
                      inset -4px -4px 8px var(--neumorphic-light);
          border: none;
        }

        .neumorphic-pressed {
          background: var(--neumorphic-bg);
          box-shadow: inset 3px 3px 6px var(--neumorphic-pressed-dark), 
                      inset -3px -3px 6px var(--neumorphic-pressed-light);
          transform: scale(0.98);
        }

        .neumorphic:hover {
          box-shadow: 8px 8px 16px var(--neumorphic-dark), 
                      -8px -8px 16px var(--neumorphic-light);
        }

        .neumorphic-active {
          background: var(--neumorphic-bg);
          box-shadow: inset 2px 2px 4px var(--neumorphic-dark), 
                      inset -2px -2px 4px var(--neumorphic-light);
        }
      `}</style>
      
      <div className="flex">
        {/* Sidebar */}
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
                to={item.url}
                className={`flex items-center gap-3 p-4 rounded-2xl transition-all duration-200 ${
                  location.pathname === item.url
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

        {/* Main Content */}
        <div className="flex-1 p-6">
          {children}
        </div>
      </div>
    </div>
  );
}