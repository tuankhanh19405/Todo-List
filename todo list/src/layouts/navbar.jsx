import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const resetFilters = () => {
    navigate('/todos');
  };

  return (
    <nav className="bg-white shadow-md p-4 sticky top-0 z-10">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Todo App</h1>
        <div className="flex items-center gap-4">
          <a
            href="/todos"
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
              location.pathname === '/todos' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            Tất cả công việc
          </a>
          <a
            href="/important"
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
              location.pathname === '/important' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            Công việc quan trọng
          </a>
          <button
            onClick={resetFilters}
            className="px-3 py-2 rounded-lg bg-red-100 text-red-700 text-sm font-medium hover:bg-red-200 transition-all"
          >
            Làm mới bộ lọc
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
