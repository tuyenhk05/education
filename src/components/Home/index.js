import React, { useEffect, useState } from "react";
import { Typography, Row, Col, Card, Button, Tag, Skeleton } from "antd";
import { getAllCourses } from "../../services/dataCourses"; // API giả định
import { Link } from "react-router-dom";
import "./Home.scss";
import IntroSlider from "./IntroSlide";
import { ClockCircleOutlined, FileProtectOutlined, TeamOutlined, RiseOutlined, SafetyOutlined, MobileOutlined } from '@ant-design/icons';
import CountUp from '../../helpers/Cout';
import AnimateWhenVisible from '../../helpers/FadeInWhenVisible';

const { Title, Paragraph } = Typography;

const Home = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        async function fetchCourses() {
            const data = await getAllCourses();
            setCourses(data);
        }
        fetchCourses();
       
        
    }, []);


    
    if (courses.length === 0) {
        return (
            <>
                <div className="homepage container" style={{minHeight:"90vh"} }>
                    {/* Banner */}
                    <div className="hero-section" style={{ background: "white" } }>
                        <Skeleton.Button active={true} block={true} style={{ minHeight: "60vh" }} />

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
                    <Title style={{fontSize:"clamp(38px,2vw,45px)"} }>Chào mừng đến với EduMarket 🎓</Title>
                <Paragraph className="test1">Học mọi thứ, mọi lúc, mọi nơi – với các khóa học chất lượng cao từ chuyên gia</Paragraph>
                <Button type="primary" size="large" ><Link to="allCourses">Tìm hiểu các khóa học</Link></Button>
            </div>
            </div>
            {/* Danh sách khóa học nổi bật */}

            <div className="home_tt  container">
         
                <Row>
                    <Col xs={12} sm={12} md={12} lg={6} xl={6}>
                       <AnimateWhenVisible transition={{ duration: 1 }}>

                        <div className="number">
                            <CountUp
                                from={0}
                                to={100}
                                separator=","
                                direction="up"
                                duration={1}
                                className="count-up-text"
                            />+
                        </div> <div className="title_home">
                        Học viên
                            </div>
                        </AnimateWhenVisible>

                        </Col>
                    <Col xs={12} sm={12} md={12} lg={6} xl={6}>
                        <AnimateWhenVisible transition={{ duration: 1.4 }}>

                        <div className="number">
                            <CountUp
                                from={0}
                                to={30}
                                separator=","
                                direction="up"
                                duration={1}
                                className="count-up-text"
                            />+
                        </div> <div className="title_home">
                           Khóa học
                            </div>
                        </AnimateWhenVisible>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={6} xl={6}>
                        <AnimateWhenVisible transition={{ duration: 1.8 }}>

                        <div className="number">
                            <CountUp
                                from={0}
                                to={25}
                                separator=","
                                direction="up"
                                duration={1}
                                className="count-up-text"
                            />+
                        </div> <div className="title_home">
                            Giảng viên
                            </div>
                        </AnimateWhenVisible>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={6} xl={6}>
                        <AnimateWhenVisible transition={{ duration: 2.2 }}>

                        <div className="number">
                            <CountUp
                                from={0}
                                to={98}
                                separator=","
                                direction="up"
                                duration={1}
                                className="count-up-text"
                            />%
                        </div> <div className="title_home">
                           Mức độ hài lòng
                            </div>
                        </AnimateWhenVisible>
                    </Col>
                </Row>
            </div>
            <div className="home_slide ">
                <div className=" container">     
                    <AnimateWhenVisible>
                        <h2>Khám phá EduMarket</h2>
                    
                <span>Nền tảng học trực tuyến hàng đầu Việt Nam với phương pháp giảng dạy hiện đại </span>
                   
                        <IntroSlider />
                    </AnimateWhenVisible>
                </div>
            </div>
            <div className="section  container">
                <AnimateWhenVisible direction="fadeInDown">
                    <Title level={3} style={{ textAlign: 'center', fontSize: 34, padding: 20 } }>Khóa học phổ biến 🔥</Title>
                </AnimateWhenVisible>
                    <Row gutter={[16, 16]}>
                    {courses
                        .filter(course => course.isPopular)
                        .slice(0, 3)
                        .map(course => (
                            <Col xs={24} sm={12} md={8} key={course.id}>
                                <AnimateWhenVisible direction="slideFromLeft">
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
                                </AnimateWhenVisible>
                            </Col>
                        ))}
                </Row>
            </div>
            <div className="section1" style={{ textAlign: 'center'}}>
                <div className="content1 container">
                    <AnimateWhenVisible direction="fadeInDown">
                        <div className="content1_title1 ">Tại sao chọn EduMarket?</div>
                    </AnimateWhenVisible>

                    <span style={{marginBottom:20} }>                    <AnimateWhenVisible direction="fadeInDown">
                        Những ưu điểm vượt trội của nền tảng học trực tuyến hàng đầu                    </AnimateWhenVisible>
                    </span>
                    <div className="content1_list">
                        <AnimateWhenVisible direction="fadeInDown" transition={{ duration: 0.8 }}>

                        <div className="content1_item">
                            <div className="content1_item_icon"><ClockCircleOutlined /></div>
                            <div className="content1_item_title">Học mọi lúc, mọi nơi</div>
                            <div className="content1_item_desc">Truy cập khóa học 24/7 trên mọi thiết bị của bạn</div>

                            </div>
                        </AnimateWhenVisible>
                        <AnimateWhenVisible direction="fadeInDown" transition={{ duration: 1.2 }}>

                        <div className="content1_item">
                            <div className="content1_item_icon"><FileProtectOutlined /></div>
                            <div className="content1_item_title">Chứng chỉ hoàn thành</div>
                            <div className="content1_item_desc">Nhận chứng chỉ được công nhận sau khi hoàn thành khóa học</div>

                            </div>
                        </AnimateWhenVisible>
                        <AnimateWhenVisible direction="fadeInDown" transition={{ duration: 1.6 }}>

                        <div className="content1_item">
                            <div className="content1_item_icon"><TeamOutlined /></div>
                            <div className="content1_item_title">Cộng đồng hỗ trợ</div>
                            <div className="content1_item_desc">Tham gia cộng đồng học viên và giảng viên nhiệt tình</div>

                            </div>
                        </AnimateWhenVisible>
                        <AnimateWhenVisible direction="fadeInDown" transition={{ duration: 2 }}>

                        <div className="content1_item">
                            <div className="content1_item_icon"><RiseOutlined /></div>
                            <div className="content1_item_title">Cập nhật liên tục</div>
                            <div className="content1_item_desc">Nội dung khóa học được cập nhật theo xu hướng mới nhất</div>

                            </div>
                        </AnimateWhenVisible>
                        <AnimateWhenVisible direction="fadeInDown" transition={{ duration: 2.4 }}>

                        <div className="content1_item">
                            <div className="content1_item_icon"><SafetyOutlined /></div>
                            <div className="content1_item_title">Đảm bảo chất lượng</div>
                            <div className="content1_item_desc">Tất cả khóa học được kiểm định chất lượng nghiêm ngặt</div>

                            </div>
                        </AnimateWhenVisible>
                        <AnimateWhenVisible direction="fadeInDown" transition={{ duration: 2.8 }}>

                        <div className="content1_item">
                            <div className="content1_item_icon"><MobileOutlined /></div>
                            <div className="content1_item_title">Ứng dụng mobile</div>
                            <div className="content1_item_desc">Tải app EduMarket để học mọi lúc trên điện thoại</div>

                            </div>
                        </AnimateWhenVisible>
                    </div>
                </div>


            </div>
        </div>
    );
};

export default Home;
