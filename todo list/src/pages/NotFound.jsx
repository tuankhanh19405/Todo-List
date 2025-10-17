import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-md text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">404 - Không tìm thấy trang</h1>
        <p className="text-gray-600 mb-6">Trang bạn đang tìm kiếm không tồn tại.</p>
        <button
          onClick={() => navigate('/todos')}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
        >
          Về danh sách công việc
        </button>
      </div>
    </div>
  );
};

export default NotFound;
