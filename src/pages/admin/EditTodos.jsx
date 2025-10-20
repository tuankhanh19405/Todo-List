import React, { useEffect, useState } from 'react';
import { Button, DatePicker, Form, Input, Radio, Select, message } from 'antd';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';

const { Option } = Select;

const EditTodos = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;

    const fetchTodo = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://api-class-o1lo.onrender.com/api/v1/todos/${id}`);
        const data = response.data.data; 
        console.log('API Data:', data); 
        if (mounted) {
          const formattedData = {
            name: data.name || '',
            priority: data.priority || 1,
            description: data.description || '',
            dueDate: data.dueDate ? moment(data.dueDate) : null, 
            completed: data.completed || false, 
          };
          form.setFieldsValue(formattedData);
        }
      } catch (error) {
        console.error(error);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchTodo();

    return () => {
      mounted = false;
    };
  }, [id, form]);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      await axios.put(`https://api-class-o1lo.onrender.com/api/v1/todos/${id}`, {
        ...values,
        dueDate: values.dueDate ? values.dueDate.format('YYYY-MM-DD') : null,
        completed: values.completed, 
      });
      message.success('Cập nhật thành công');
      navigate('/');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f0f2f5',
    }}>
      <div style={{
        fontSize: '24px',
        color: '#1890ff',
        fontWeight: 'bold',
      }}>
        Loading...
      </div>
    </div>
  );

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #e6f7ff 0%, #fff7e6 100%)',
      padding: '20px',
    }}>
      <div style={{
        backgroundColor: '#fff',
        padding: '40px',
        borderRadius: '12px',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '600px',
      }}>
        <h2 style={{
          textAlign: 'center',
          marginBottom: '24px',
          color: '#1f2a44',
          fontSize: '28px',
          fontWeight: '600',
        }}>
          Edit Todo
        </h2>
        <Form
          form={form}
          name="edit-todo"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input your name!' }]}
          >
            <Input
              disabled={loading}
              style={{
                borderRadius: '8px',
                padding: '10px',
                fontSize: '16px',
              }}
              placeholder="Enter todo name"
            />
          </Form.Item>

          <Form.Item
            label="Priority"
            name="priority"
            rules={[{ required: true, message: 'Please select a priority!' }]}
          >
            <Select
              placeholder="Select priority"
              disabled={loading}
              style={{
                borderRadius: '8px',
                fontSize: '16px',
              }}
            >
              <Option value={1}>Thấp</Option>
              <Option value={2}>Trung bình</Option>
              <Option value={3}>Cao</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: 'Please input your description!' }]}
          >
            <Input.TextArea
              disabled={loading}
              rows={4}
              style={{
                borderRadius: '8px',
                padding: '10px',
                fontSize: '16px',
              }}
              placeholder="Enter todo description"
            />
          </Form.Item>

          <Form.Item
            label="Due Date"
            name="dueDate"
            rules={[{ required: true, message: 'Please select a due date!' }]}
          >
            <DatePicker
              style={{
                width: '100%',
                borderRadius: '8px',
                padding: '10px',
                fontSize: '16px',
              }}
              disabled={loading}
              placeholder="Select due date"
            />
          </Form.Item>

          <Form.Item
            label="Completed"
            name="completed"
            rules={[{ required: true, message: 'Please select completion status!' }]}
          >
            <Radio.Group
              disabled={loading}
              style={{
                display: 'flex',
                gap: '20px',
              }}
            >
              <Radio
                value={true}
                style={{
                  fontSize: '16px',
                  color: '#1f2a44',
                }}
              >
                True
              </Radio>
              <Radio
                value={false}
                style={{
                  fontSize: '16px',
                  color: '#1f2a44',
                }}
              >
                False
              </Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '500',
                backgroundColor: '#1890ff',
                borderColor: '#1890ff',
                height: 'auto',
              }}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default EditTodos;