import React from 'react';
import { Button, DatePicker, Form, Input, Radio, Select } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

const CreateTodos = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    console.log('Success:', values);
    try {
      await axios.post(`https://api-class-o1lo.onrender.com/api/v1/todos`, {
        ...values,
        dueDate: values.dueDate ? values.dueDate.format('YYYY-MM-DD') : null,
      });
      alert("Thêm mới thành công");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

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
          Create Todo
        </h2>
        <Form
          form={form}
          name="create-todo"
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
              style={{
                borderRadius: '8px',
                fontSize: '16px',
              }}
            >
              <Option value="1">Thấp</Option>
              <Option value="2">Trung bình</Option>
              <Option value="3">Cao</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: 'Please input your description!' }]}
          >
            <Input.TextArea
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
              placeholder="Select due date"
            />
          </Form.Item>

          <Form.Item
            label="Completed"
            name="isCompleted"
            rules={[{ required: true, message: 'Please select completion status!' }]}
          >
            <Radio.Group
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

export default CreateTodos;