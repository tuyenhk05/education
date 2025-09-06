// FavoritesPage.jsx
import React, { useEffect, useState } from "react";
import {
    Typography, Card, Tag, Row, Col, message, Skeleton
} from "antd";
import { HeartTwoTone } from "@ant-design/icons";
import { getCookie } from "../../helpers/cookie";
import { patchUser } from "../../services/dataUser";
import { get } from "../../untils/request";
import { Link,useNavigate } from "react-router-dom";

const { Title, Paragraph } = Typography;

const FavoritesPage = () => {
    const userId = parseInt(getCookie("user_id"));
    const [user, setUser] = useState(null);
    const [products, setProducts] = useState([]);
    const [userFavs, setUserFavs] = useState([]);
    const [reload, setReload] = useState(false);
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await get("db");
                const currentUser = data.users.find(u => u.id === userId);
                setUser(currentUser);
                setProducts(data.products);
                setUserFavs(currentUser.favoriteProducts || []);
            } catch (err) {
                message.error("Lỗi khi lấy dữ liệu người dùng");
            }
        };
        fetchData();
        //if (!user) {
        //    return navigate("/login");
        //}
    }, [userId, reload]);
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
    const toggleFavorite = async (prodId) => {
        if (!userId) {
            message.warn("Bạn cần đăng nhập");
            return;
        }
        const isFav = userFavs.includes(prodId);
        const newFavs = isFav
            ? userFavs.filter(id => id !== prodId)
            : [...userFavs, prodId];
        await patchUser(userId, { favoriteProducts: newFavs });
        setReload(!reload);
        message.success(isFav ? error("Đã bỏ yêu thích") : success("Đã thêm vào yêu thích"));
    };

    const renderCourse = (course) => (
        <Card
            key={course.id}
            hoverable
            cover={
                <img
                    alt={course.name}
                    src={course.image}
                    style={{ height: 180, objectFit: "cover" }}
                />
            }
            actions={[
                <Link to={`/allCourses/${course.id}`}>Xem chi tiết</Link>,
                <HeartTwoTone
                    twoToneColor={userFavs.includes(course.id) ? "#eb2f96" : "#ccc"}
                    onClick={() => toggleFavorite(course.id)}
                />
            ]}
        >
            <Title level={5}>{course.name}</Title>
            <Paragraph ellipsis={{ rows: 2 }}>
                {course.shortDescription}
            </Paragraph>
            <div>
                <Tag color="blue">{course.category}</Tag>
                <Tag color="green">★ {course.rating}</Tag>
                <Tag color="red">
                    {course.price.toLocaleString()}đ
                </Tag>
            </div>
        </Card>
    );
    if (!userId) {
        return <h1 style={{minHeight:"75vh"} }> Bạn cần đăng nhập để xem trang này</h1>;
    }
   

    const favoriteCourses = products.filter(p =>
        userFavs.includes(p.id)
    );
    if (products.length === 0/*||userFavs.length===0*/||!user) {
        return (
            <div className="homepage container" style={{ minHeight: "80vh" }}>
                {/* Banner */}
                <div className="hero-section">
                    <Skeleton.Button active={true} block={true} style={{ minHeight: 160 }} />

                </div>

                <div className="section">
                    <Row gutter={[16, 16]}>

                        <Col xs={24} sm={12} md={8} >
                            <Card

                            >
                                <Card.Meta
                                    description={
                                        <>
                                            <Skeleton.Button active={true} block={true} style={{ minHeight: 160 }} />

                                        </>
                                    }
                                />
                            </Card>
                        </Col>

                        <Col xs={24} sm={12} md={8} >
                            <Card

                            >
                                <Card.Meta
                                    description={
                                        <>
                                            <Skeleton.Button active={true} block={true} style={{ minHeight: 160 }} />

                                        </>
                                    }
                                />
                            </Card>
                        </Col>

                        <Col xs={24} sm={12} md={8} >
                            <Card

                            >
                                <Card.Meta
                                    description={
                                        <>
                                            <Skeleton.Button active={true} block={true} style={{ minHeight: 160 }} />

                                        </>
                                    }
                                />
                            </Card>
                        </Col>

                    </Row>
                </div>
            </div>
        )
    }
    return (
        <>        { contextHolder }

        <div className="favorites-page container" style={{minHeight:"80vh",marginBottom:40,padding:20} }>
            <Title level={2}>❤️ Khóa học yêu thích của bạn</Title>
            {favoriteCourses.length === 0 ? (
                <Paragraph>Bạn chưa có khóa học nào trong yêu thích.</Paragraph>
            ) : (
                <Row gutter={[16, 16]}>
                    {favoriteCourses.map(course => (
                        <Col xs={24} sm={12} md={8} key={course.id}>
                            {renderCourse(course)}
                        </Col>
                    ))}
                </Row>
            )}
            </div>
        </>
    );
};

export default FavoritesPage;
