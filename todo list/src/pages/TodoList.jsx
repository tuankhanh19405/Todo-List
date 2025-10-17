import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const API_BASE = 'https://api-class-o1lo.onrender.com/api/v1';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(5);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const getTodoStatus = (todo) => {
    const today = new Date('2025-10-10T20:57:00+07:00');
    const dueDate = new Date(todo.dueDate);
    if (todo.completed) return { label: 'Hoàn thành', color: 'border-emerald-500', badge: 'bg-emerald-100 text-emerald-700' };
    if (dueDate < today) return { label: 'Quá hạn', color: 'border-rose-500', badge: 'bg-rose-100 text-rose-700' };
    return { label: 'Đang thực hiện', color: 'border-blue-500', badge: 'bg-blue-100 text-blue-700' };
  };

  const buildQuery = () => {
    const params = new URLSearchParams();
    if (searchQuery) params.append('q', searchQuery);
    if (priorityFilter !== 'all') params.append('priority', priorityFilter);
    params.append('_sort', 'priority');
    params.append('_order', sortOrder);
    params.append('_page', currentPage);
    params.append('_limit', limit);
    return params.toString();
  };

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const query = buildQuery();
      const response = await axios.get(`${API_BASE}/todos?${query}`);
      if (response.data.success) {
        const data = response.data.data || [];
        setTodos(data);
        if (response.data.meta) {
          setTotalItems(response.data.meta.total || 0);
          setTotalPages(response.data.meta.totalPages || 0);
        } else {
          setTotalItems(data.length);
          setTotalPages(1);
        }
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError('Lỗi kết nối API');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [searchQuery, priorityFilter, sortOrder, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, priorityFilter, sortOrder]);

  const getPriorityLabel = (priority) => {
    switch (priority) {
      case 1: return { text: 'Thấp', color: 'bg-slate-100 text-slate-700' };
      case 2: return { text: 'Trung bình', color: 'bg-amber-100 text-amber-700' };
      case 3: return { text: 'Cao', color: 'bg-red-100 text-red-700' };
      default: return { text: 'Không xác định', color: 'bg-gray-100 text-gray-700' };
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    if (startPage > 1) {
      pageNumbers.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          className="w-10 h-10 flex items-center justify-center rounded-lg bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium transition-all"
        >
          1
        </button>
      );
      if (startPage > 2) {
        pageNumbers.push(
          <span key="ellipsis-start" className="px-2 text-gray-500">
            ...
          </span>
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`w-10 h-10 flex items-center justify-center rounded-lg font-medium transition-all ${
            currentPage === i
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-white border border-gray-300 hover:bg-gray-50 text-gray-700'
          }`}
        >
          {i}
        </button>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push(
          <span key="ellipsis-end" className="px-2 text-gray-500">
            ...
          </span>
        );
      }
      pageNumbers.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className="w-10 h-10 flex items-center justify-center rounded-lg bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium transition-all"
        >
          {totalPages}
        </button>
      );
    }

    return pageNumbers;
  };

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
        <p className="mt-4 text-gray-600 font-medium">Đang tải...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <p className="text-red-500 font-medium">Lỗi: {error}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Danh sách Việc cần làm
          </h1>
          <p className="text-gray-600">Quản lý công việc của bạn một cách hiệu quả</p>
        </div>

        {/* Bộ lọc, tìm kiếm và nút Thêm mới */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
            <input
              type="text"
              placeholder="🔍 Tìm kiếm todo..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 md:flex-none md:w-1/2 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="flex-1 md:flex-none md:w-1/4 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
            >
              <option value="all">Tất cả ưu tiên</option>
              <option value="1">Ưu tiên thấp</option>
              <option value="2">Ưu tiên trung bình</option>
              <option value="3">Ưu tiên cao</option>
            </select>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="flex-1 md:flex-none md:w-1/4 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
            >
              <option value="desc">Giảm dần</option>
              <option value="asc">Tăng dần</option>
            </select>
            <Link
              to="/todos/add"
              className="px-4 py-3 rounded-lg bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition-all"
            >
              Thêm mới
            </Link>
          </div>
        </div>

        {/* Danh sách todos */}
        <div className="space-y-4 mb-6">
          {todos.length === 0 ? (
            <div className="bg-white rounded-xl shadow-md p-12 text-center">
              <div className="text-6xl mb-4">📝</div>
              <p className="text-gray-500 text-lg">Không có todo nào phù hợp.</p>
            </div>
          ) : (
            todos.map((todo) => {
              const status = getTodoStatus(todo);
              const priority = getPriorityLabel(todo.priority);
              return (
                <div
                  key={todo._id}
                  className={`bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border-l-4 ${status.color}`}
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-bold text-gray-800 flex-1">{todo.name}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${status.badge}`}>
                        {status.label}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 mb-4 leading-relaxed">{todo.description}</p>
                    
                    <div className="flex flex-wrap gap-3 items-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${priority.color}`}>
                        📌 {priority.text}
                      </span>
                      <span className="text-sm text-gray-600 flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {new Date(todo.dueDate).toLocaleDateString('vi-VN')}
                      </span>
                      <Link
                        to={`/todos/${todo._id}`}
                        className="px-3 py-1 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-all"
                      >
                        Xem chi tiết
                      </Link>
                      <Link
                        to={`/todos/edit/${todo._id}`}
                        className="px-3 py-1 rounded-lg bg-yellow-600 text-white text-sm font-medium hover:bg-yellow-700 transition-all"
                      >
                        Cập nhật
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Phân trang */}
        {totalPages > 1 && (
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-sm text-gray-600">
                Trang <span className="font-semibold text-gray-800">{currentPage}</span> / <span className="font-semibold text-gray-800">{totalPages}</span>
                <span className="mx-2">•</span>
                Tổng <span className="font-semibold text-gray-800">{totalItems}</span> mục
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-lg bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Trước
                </button>

                <div className="flex items-center gap-1">
                  {renderPageNumbers()}
                </div>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-lg bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
                >
                  Sau
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoList;