import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_BASE = 'https://api-class-o1lo.onrender.com/api/v1';

const TodoDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [todo, setTodo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getTodoStatus = (todo) => {
    const today = new Date('2025-10-10T20:57:00+07:00');
    const dueDate = new Date(todo.dueDate);
    if (todo.completed) return { label: 'Hoàn thành', color: 'border-emerald-500', badge: 'bg-emerald-100 text-emerald-700' };
    if (dueDate < today) return { label: 'Quá hạn', color: 'border-rose-500', badge: 'bg-rose-100 text-rose-700' };
    return { label: 'Đang thực hiện', color: 'border-blue-500', badge: 'bg-blue-100 text-blue-700' };
  };

  const getPriorityLabel = (priority) => {
    switch (priority) {
      case 1: return { text: 'Thấp', color: 'bg-slate-100 text-slate-700' };
      case 2: return { text: 'Trung bình', color: 'bg-amber-100 text-amber-700' };
      case 3: return { text: 'Cao', color: 'bg-red-100 text-red-700' };
      default: return { text: 'Không xác định', color: 'bg-gray-100 text-gray-700' };
    }
  };

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE}/todos/${id}`);
        if (response.data.success) {
          setTodo(response.data.data);
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        setError('Lỗi kết nối API');
      } finally {
        setLoading(false);
      }
    };
    fetchTodo();
  }, [id]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
        <p className="mt-4 text-gray-600 font-medium">Đang tải...</p>
      </div>
    </div>
  );

  if (error || !todo) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <p className="text-red-500 font-medium">Lỗi: {error || 'Không tìm thấy công việc'}</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
        >
          Quay lại
        </button>
      </div>
    </div>
  );

  const status = getTodoStatus(todo);
  const priority = getPriorityLabel(todo.priority);

  return (
    <div className="py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-start justify-between mb-4">
            <h1 className="text-3xl font-bold text-gray-800">{todo.name}</h1>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${status.badge}`}>
              {status.label}
            </span>
          </div>
          <p className="text-gray-600 mb-4 leading-relaxed">{todo.description}</p>
          <div className="flex flex-wrap gap-3 mb-4">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${priority.color}`}>
              📌 {priority.text}
            </span>
            <span className="text-sm text-gray-600 flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {new Date(todo.dueDate).toLocaleDateString('vi-VN')}
            </span>
          </div>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
          >
            Quay lại
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoDetail;
