import React, { useEffect, useState } from "react";
import { Typography, Avatar, Card, Button, Tag, message, Row, Col, Skeleton } from "antd";
import { getCookie } from "../../helpers/cookie";
import { LogoutOutlined, HeartTwoTone } from "@ant-design/icons";
import "./Profile.scss";
import { useNavigate,Link } from "react-router-dom";
import { deleteAllCookies } from "../../helpers/cookie";
import { useDispatch } from "react-redux";
import { lockout } from "../../action/login";
import { get } from "../../untils/request";
import { patchUser } from "../../services/dataUser";

const { Title, Paragraph } = Typography;

const Profile = () => {
    const userId = parseInt(getCookie("user_id"));
    const [user, setUser] = useState(null);
    const [products, setProducts] = useState([]);
    const [suggested, setSuggested] = useState([]);
    const [loadingSuggest, setLoadingSuggest] = useState(false);
    const [aiInfo, setAiInfo] = useState(null);
    const [trueAI, settrueAI] = useState(null);
    const navigate = useNavigate();
    const dispath = useDispatch();
    const [messageApi, contextHolder] = message.useMessage();
    const [userFavs, setUserFavs] = useState([]);
    const [render, setRender] = useState(false);
   
    useEffect(() => {
        const fetchData = async () => {
          
            const data = await get("db");
            const foundUser = data.users.find(u => u.id === userId);
                setUser(foundUser);
            setProducts(data.products);
            setUserFavs(foundUser.favoriteProducts);
            const suggestions = data.suggestions[String(userId)];
                if (suggestions) {
                    const filtered = data.products.filter(p => suggestions.products.includes(p.id));
                    setSuggested(filtered);
                    settrueAI(suggestions.aiAnalysis);
                }

            
        };
        if (userId>0) {
            fetchData();
        }
     
    }, [userId, render]);

  
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
    const handleSuggest = () => {
        setLoadingSuggest(true);
       
        setTimeout(() => {
            setLoadingSuggest(false);
            setAiInfo(trueAI);
            success("Đã tải gợi ý từ AI.");
        }, 1000);
    };
    const handleLockout = () => {
        deleteAllCookies();
        dispath(lockout());
        navigate("/login");
    }
    const toggleFavorite = async (prodId) => {
        if (!userId) {
            error("Bạn cần đăng nhập để đánh dấu yêu thích");
            return;
        }
        const isFav = userFavs.includes(prodId);
        const newFavs = isFav
            ? userFavs.filter(id => id !== prodId)
            : [...userFavs, prodId];
        // gọi PATCH cập nhật favorities
        await patchUser(userId, { favoriteProducts: newFavs });
        setRender(!render);
        setUserFavs(newFavs);
        message.success(isFav ? error("Đã bỏ yêu thích") : success("Đã thêm vào yêu thích"));

    };

    const renderCourse = (course) => (

        <Card
            key={course.id}
            hoverable
            style={{ width: "100%", marginBottom: 16 }}
            cover={<img alt={course.name} src={course.image} style={{ height: 180, objectFit: "cover" }} />}
            actions={[
                <Link to={`/allCourses/${course.id}`}>Xem chi tiết</Link>,
                <HeartTwoTone
                twoToneColor={userFavs.includes(course.id) ? "#eb2f96" : "#ccc"}
                    onClick={() => toggleFavorite(course.id)}
                />
            ]}

        >
            <Title level={5}>{course.name}</Title>
            <Paragraph ellipsis={{ rows: 2 }}>{course.shortDescription}</Paragraph>
            <div>
                <Tag color="blue">{course.category}</Tag>
                <Tag color="green">★ {course.rating}</Tag>
                <Tag color="red">{course.price.toLocaleString()}đ</Tag>
            </div>
        </Card>
    );
    //if (!user) return navigate("/login");

    const views = products.filter(p => user.viewHistory.includes(p.id));
  
    if (products.lenght === 0 /*|| userFavs.length === 0 */ || !user) { 
        return (
            <>
                <div className="profile-container container" style={{minHeight:"75vh"} }>
                    <div className="profile-header">
                        <Skeleton.Avatar active={true} size={100} shape="circle" style={{marginBottom:20}} />
                        <div className="profile-info">
                            <Skeleton.Button active={true} style={{ marginBottom: 20 }} />
                            <Skeleton.Button active={true} block={true} style={{ marginBottom: 20 }} />
                        </div>
                    </div>


                    <div className="profile-section">
                        <Skeleton.Button active={true} block={true} style={{ marginBottom: 20 }} />
                    </div>
                    <div className="profile-section">
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
            </>
        )
    }
    return (
        <>
        { contextHolder }

            <div className="profile-container container" style={{minHeight:"80vh",padding:20} }>
            <div className="profile-header">
                    <Avatar size={100} src={user.avatar ? user.avatar :"https://jbagy.me/wp-content/uploads/2025/03/Hinh-anh-avatar-nam-cute-2.jpg"} />
                <div className="profile-info">
                    <Title level={3}>{user.name}</Title>
                    <Paragraph>{user.email}</Paragraph>
                </div>
                <Button type="primary" onClick={handleLockout} style={{ marginBottom: 16 }}>Đăng xuất <LogoutOutlined /></Button>
            </div>

          
                <div className="profile-section">
                    <Title level={4}>✨ Gợi ý thông minh từ AI</Title>
                    <Button type="primary" loading={loadingSuggest} onClick={handleSuggest} style={{ marginBottom: 16 }}>
                        Gợi ý sản phẩm phù hợp
                    </Button>

                    {aiInfo && (
                        <>
                            <Card title="🧠 Phân tích hành vi AI" style={{ marginBottom: 16 }}>
                                <Paragraph><strong>Hành vi:</strong> {aiInfo.behaviorPattern}</Paragraph>
                                <ul>
                                    {aiInfo.recommendedReasons.map((reason, idx) => (
                                        <li key={idx}>{reason}</li>
                                    ))}
                                </ul>
                            </Card>
                            <Row gutter={[16, 16]}>
                                {suggested.length > 0 ? suggested.map(c => (
                                    <Col xs={24} sm={12} md={8} key={c.id}>
                                        {renderCourse(c)}
                                    </Col>
                                )) : <Paragraph>Chưa có gợi ý.</Paragraph>}
                            </Row>
                        </>
                    )}


                </div>
            <div className="profile-section">
                <Title level={4}>🕵️ Khoá học đã xem</Title>
                <Row gutter={[16, 16]}>
                    {views.length > 0 ? [...views].reverse().map(c => (
                        <Col xs={24} sm={12} md={8} key={c.id}>
                            {renderCourse(c)}
                        </Col>
                    )) : <Paragraph>Bạn chưa xem khoá học nào.</Paragraph>}
                </Row>
            </div>

            
            </div>
        </>
    );
};

export default Profile;
