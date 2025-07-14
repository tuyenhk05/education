import React, { useState } from 'react';
import { Form, Input, Button, Typography, message } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import './Sigup.scss';
import { useNavigate } from "react-router-dom";
import { getUser, postUser } from '../../services/dataUser';

const { Title } = Typography;

const Register = () => {
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
    const [loading, setLoading] = useState(false);
    const success = (content) => {
        messageApi.open({
            type: 'success',
            content: content,
        });
    };

    const error = (content) => {
        messageApi.open({
            type: 'error',
            content: content,
        });
    };
    const onFinish = async (values) => {
        setLoading(true);
        const checkdata = await getUser(`?email=${values.email}`);
        if (checkdata.length>0) {
            error("Email đã tồn tại !");
            setLoading(false);

            return
        }
        const newUser = {
            id:Date.now(),
            name: values.name,
            email: values.email,
            password: values.password,
            avatar: "https://source.unsplash.com/100x100/?face",
            favoriteProducts: [],
            viewHistory: [],
            purchaseHistory: [],
            preferences: {
                categories: [],
                priceRange: [0, 1000000],
                level: [],
            },
        };

        await postUser( newUser);// Giả sử bạn có hàm này
        success("Đăng ký thành công!");
        setTimeout(() => {
            navigate("/login");
        }, 1000);
    };

    return (
        <>
            {contextHolder}
            <div className='register-container' style={{minHeight:"80vh"} }>
            <Form
                name="register"
                className='register-form'
                onFinish={onFinish}
            >
                <Title level={3} style={{ textAlign: 'center' }}>Đăng ký tài khoản mới</Title>

                <Form.Item
                    name="name"
                    rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
                >
                    <Input prefix={<UserOutlined />} placeholder="Họ và tên" />
                </Form.Item>

                <Form.Item
                    name="email"
                    rules={[
                        { required: true, message: 'Vui lòng nhập email!' },
                        { type: 'email', message: 'Email không hợp lệ!' }
                    ]}
                >
                    <Input prefix={<MailOutlined />} placeholder="Email" />
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                    hasFeedback
                >
                    <Input.Password prefix={<LockOutlined />} placeholder="Mật khẩu" />
                </Form.Item>

                <Form.Item
                    name="confirm"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        { required: true, message: 'Vui lòng xác nhận mật khẩu!' },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject('Mật khẩu không khớp!');
                            },
                        }),
                    ]}
                >
                    <Input.Password prefix={<LockOutlined />} placeholder="Xác nhận mật khẩu" />
                </Form.Item>

                <Form.Item>
                        <Button type="primary" loading={loading} htmlType="submit" className='register-button'>
                        Đăng ký
                    </Button>
                </Form.Item>

                <div style={{ textAlign: 'center' }}>
                    Đã có tài khoản? <a href="/login">Đăng nhập</a>
                </div>
            </Form>
            </div>
        </>
    );
};

export default Register;
