import React, { useEffect,useState } from 'react';
import { Form, Input, Button, Typography, message } from 'antd';
import { useNavigate, Link } from "react-router-dom";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useDispatch } from "react-redux";
import './Login.scss';
import { isLogin } from "../../action/login";
import { getUser } from '../../services/dataUser';
import { getCookie, setCookie } from '../../helpers/cookie';

const { Title } = Typography;

const Login = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getdata = getCookie("user_id");
        if (getdata) {
            navigate("/");
        }
    }, [navigate]);

    const success = () => {
        messageApi.open({
            type: 'success',
            content: 'Đăng nhập thành công',
        });
    };

    const error = () => {
        messageApi.open({
            type: 'error',
            content: 'Sai email hoặc mật khẩu!',
        });
    };

    const onFinish = async (values) => {
        setLoading(true);
        const data = await getUser(`?email=${values.email}&password=${values.password}`);
        if (data.length > 0) {
            success();
            setCookie("user_name", data[0].name, 7);
            setCookie("user_id", data[0].id, 7);
            setTimeout(() => {
                dispatch(isLogin(data[0].id));
                navigate("/");
            }, 1000);
        } else {
            error();
            setLoading(false);

        }
    };

    return (
        <>
            {contextHolder}
            <div className="login-container">
                <Form
                    name="login"
                    className="login-form"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                >
                    <Title level={3} style={{ textAlign: 'center' }}>Đăng nhập vào EduMarket</Title>

                    <Form.Item
                        name="email"
                        rules={[{ required: true, message: 'Vui lòng nhập email!' }]}
                    >
                        <Input prefix={<UserOutlined />} placeholder="Email" />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                    >
                        <Input.Password prefix={<LockOutlined />} placeholder="Mật khẩu" />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading} className="login-form-button" block>
                            Đăng nhập
                        </Button>
                    </Form.Item>

                    <Form.Item style={{ textAlign: 'center' }}>
                        Chưa có tài khoản? <Link to="/register">Đăng ký</Link>
                    </Form.Item>
                </Form>
            </div>
        </>
    );
};

export default Login;
