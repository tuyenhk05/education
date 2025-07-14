import React, { useState,useEffect } from "react";
import { Outlet, Link } from "react-router";
//import { getCookie } from "../../helpers/cookie";
import { Layout, Menu } from "antd";
import { useLocation } from "react-router";
import { useSelector } from "react-redux";

import "./Layout.scss";

const { Header, Content, Footer } = Layout;

function Layoutt() {
    const location = useLocation(); // 👈 lấy đường dẫn hiện tại
    const state = useSelector(state => state.checkLogin);
    const [key, setkey] = useState(1);
    useEffect(() => {
        switch (location.pathname) {
            case "/":
                setkey("1");
                break;
            case "/allCourses":
                setkey("2");
                break;
            case "/favorite":
                setkey("3");
                break;
            case "/profile":
            case "/login":
                setkey("4");
                break;
            default:
                setkey("");
        }
    }, [location.pathname]);

    const items = [
        {
            key: 1,
            label: <Link to="/">Trang chủ</Link>,
        }, {
            key:2,
            label:<Link to="allCourses">Các khóa học</Link>
        }, {
            key: 3,
            label: <Link to="favorite">Khóa học đã thích</Link>
        },
        {
            key: 4,
            label: state.isLogin ? (
                <Link to="profile">Hồ sơ cá nhân</Link>
            ) : (
                <Link to="/login" className="Log">Đăng nhập</Link>
            ),
        }
    ];
    return (
        <Layout>
            <Header
                className="container_header"
                style={{
                    position: "sticky",
                    top: 0,
                    zIndex: 1,
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    background: "#FFFFFF",
                }}
            >
                <Link to="/" className="demo-logo">
                    EDUMARKET
                </Link>
                <Menu
                    theme="light"
                    mode="horizontal"
                    
                    defaultSelectedKeys={key}
                    items={items}
                    style={{ flex: 1, minWidth: 0, marginLeft: 30 }}
                />
            </Header>
            <Content  >
                <Outlet />
            </Content>
            <Footer
                style={{
                    textAlign: "center",
                    background: "#34C9A5",
                    width: "100vw",
                }}
            >
                EduMarket ©{new Date().getFullYear()} Created by Ant UED
            </Footer>
        </Layout>
    );
}

export default Layoutt;
