import React, { useEffect, useState } from "react";
import { Typography, Row, Col, Card, Button, Tag, Skeleton } from "antd";
import { getAllCourses } from "../../services/dataCourses"; // API giả định
import { Link } from "react-router-dom";
import "./Home.scss";


const { Title, Paragraph } = Typography;

const Home = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        async function fetchCourses() {
            const data = await getAllCourses(); // Gọi API
            setCourses(data);
        }
        fetchCourses();
    }, []);
    if (courses.length === 0) {
        return (
            <>
                <div className="homepage container" style={{minHeight:"80vh"} }>
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
                {/*<Flex gap="middle" vertical style={{ minHeight: "80vh",maxWidth:"1200px",marginLeft:"auto",marginRight:"auto" }} >*/}
                {/*    <Space className="hero-section" >*/}
                {/*        <Skeleton.Button active={true} block={true}  />*/}
                       
                {/*    </Space>*/}

                {/*    </Flex>*/}
            </>
        )
        
    }
    return (
        <div className="homepage container">
            {/* Banner */}
            <div className="hero-section">
                <Title>Chào mừng đến với EduMarket 🎓</Title>
                <Paragraph>Học mọi thứ, mọi lúc, mọi nơi – với các khóa học chất lượng cao từ chuyên gia</Paragraph>
                <Button type="primary" size="large" ><Link to="allCourses">Tìm hiểu các khóa học</Link></Button>
            </div>

            {/* Danh sách khóa học nổi bật */}
            <div className="section">
                <Title level={3}>Khóa học phổ biến 🔥</Title>
                <Row gutter={[16, 16]}>
                    {courses
                        .filter(course => course.isPopular)
                        .slice(0, 6)
                        .map(course => (
                            <Col xs={24} sm={12} md={8} key={course.id}>
                                <Card
                                    hoverable
                                    cover={<img alt={course.name} src={course.image} />}
                                    actions={[<Button type="link" href={`/allCourses/${course.id}`}>Xem chi tiết</Button>]}
                                >
                                    <Card.Meta
                                        title={course.name}
                                        description={
                                            <>
                                                <Paragraph ellipsis={{ rows: 2 }}>{course.shortDescription}</Paragraph>
                                                <Tag color="blue">{course.category}</Tag>
                                                <Tag color="green">★ {course.rating}</Tag>
                                            </>
                                        }
                                    />
                                </Card>
                            </Col>
                        ))}
                </Row>
            </div>
        </div>
    );
};

export default Home;
