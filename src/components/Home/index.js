import React, { useEffect, useState } from "react";
import { Typography, Row, Col, Card, Button, Tag, Skeleton } from "antd";
import { getAllCourses } from "../../services/dataCourses"; // API giả định
import { Link } from "react-router-dom";
import "./Home.scss";
import IntroSlider from "./IntroSlide";
import { ClockCircleOutlined, FileProtectOutlined, TeamOutlined, RiseOutlined, SafetyOutlined, MobileOutlined } from '@ant-design/icons';


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
        <div className="homepage">
            {/* Banner */}
            <div className="hero-section ">
            <div className=" container">
                <Title>Chào mừng đến với EduMarket 🎓</Title>
                <Paragraph>Học mọi thứ, mọi lúc, mọi nơi – với các khóa học chất lượng cao từ chuyên gia</Paragraph>
                <Button type="primary" size="large" ><Link to="allCourses">Tìm hiểu các khóa học</Link></Button>
            </div>
            </div>
            {/* Danh sách khóa học nổi bật */}

            <div className="home_tt  container">
                <Row>
                    <Col xs={12} sm={12} md={12} lg={6} xl={6}>
                       
                        <div className="number">
                        100+
                        </div> <div className="title_home">
                        Học viên
                        </div>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={6} xl={6}>
                       
                        <div className="number">
                            15+
                        </div> <div className="title_home">
                           Khóa học
                        </div>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={6} xl={6}>
                       
                        <div className="number">
                            10+
                        </div> <div className="title_home">
                            Giảng viên
                        </div>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={6} xl={6}>
                       
                        <div className="number">
                            98%
                        </div> <div className="title_home">
                           Mức độ hài lòng
                        </div>
                    </Col>
                </Row>
            </div>
            <div className="home_slide ">
            <div className="  container">                                    
                <h2>Khám phá EduMarket</h2>
                <span>Nền tảng học trực tuyến hàng đầu Việt Nam với phương pháp giảng dạy hiện đại

</span>
                <IntroSlider />
                </div>
            </div>
            <div className="section  container">
                <Title level={3} style={{textAlign:'center',fontSize:34} }>Khóa học phổ biến 🔥</Title>
                <Row gutter={[16, 16]}>
                    {courses
                        .filter(course => course.isPopular)
                        .slice(0, 3)
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
            <div className="section1" style={{ textAlign: 'center'}}>
                <div className="content1 container">
                    <div className="content1_title1">Tại sao chọn EduMarket?</div>
                    <span>Những ưu điểm vượt trội của nền tảng học trực tuyến hàng đầu</span>
                    <div className="content1_list">
                        <div className="content1_item">
                            <div className="content1_item_icon"><ClockCircleOutlined /></div>
                            <div className="content1_item_title">Học mọi lúc, mọi nơi</div>
                            <div className="content1_item_desc">Truy cập khóa học 24/7 trên mọi thiết bị của bạn</div>

                        </div>
                        <div className="content1_item">
                            <div className="content1_item_icon"><FileProtectOutlined /></div>
                            <div className="content1_item_title">Chứng chỉ hoàn thành</div>
                            <div className="content1_item_desc">Nhận chứng chỉ được công nhận sau khi hoàn thành khóa học</div>

                        </div>
                        <div className="content1_item">
                            <div className="content1_item_icon"><TeamOutlined /></div>
                            <div className="content1_item_title">Cộng đồng hỗ trợ</div>
                            <div className="content1_item_desc">Tham gia cộng đồng học viên và giảng viên nhiệt tình</div>

                        </div>
                        <div className="content1_item">
                            <div className="content1_item_icon"><RiseOutlined /></div>
                            <div className="content1_item_title">Cập nhật liên tục</div>
                            <div className="content1_item_desc">Nội dung khóa học được cập nhật theo xu hướng mới nhất</div>

                        </div>
                        <div className="content1_item">
                            <div className="content1_item_icon"><SafetyOutlined /></div>
                            <div className="content1_item_title">Đảm bảo chất lượng</div>
                            <div className="content1_item_desc">Tất cả khóa học được kiểm định chất lượng nghiêm ngặt</div>

                        </div>
                        <div className="content1_item">
                            <div className="content1_item_icon"><MobileOutlined /></div>
                            <div className="content1_item_title">Ứng dụng mobile</div>
                            <div className="content1_item_desc">Tải app EduMarket để học mọi lúc trên điện thoại</div>

                        </div>
                    </div>
                </div>


            </div>
        </div>
    );
};

export default Home;
