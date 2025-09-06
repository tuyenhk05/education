import React, { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { Typography, Tag, Button, Descriptions, Row, Col, Image, Skeleton } from "antd";
import { getCourseById } from "../../services/dataCourses";
import { ArrowLeftOutlined } from "@ant-design/icons";

const { Title, Paragraph } = Typography;

const CourseDetail = () => {
    const { idCourses } = useParams();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        async function fetchData() {
            const data = await getCourseById(idCourses);
            setCourse(data);
            setLoading(false);
        }
        fetchData();
    }, [idCourses]);

    if (loading  ) return (<>

        <div className="course-detail">
            <Row gutter={[24, 24]}>
                <Col xs={24} md={10}>
                    <Skeleton.Image active={true} style={{ width: "30rem",height:"30rem" }} />
                </Col>

                <Col xs={24} md={14}>
                    <Skeleton.Button active={true} block={true} style={{ marginBottom: 20 }} />
                    <Skeleton.Button active={true} block={true} style={{ minHeight: 160, marginBottom: 20 }} />

                    <Skeleton.Button active={true} block={true} style={{ minHeight: 260, marginBottom: 20 }} />

                </Col>
            </Row>
        </div>

    </>);

    if (!course) return <Paragraph>Không tìm thấy khóa học.</Paragraph>;

    return (
        <div className="course-detail container">
        <Button className="button-try" type="link" onClick={() => navigate(-1)} style={{ marginBottom: 20 }}>
                <ArrowLeftOutlined />Quay lại
             </Button>
            <Row gutter={[24, 24]}>
                <Col xs={24} md={10}>
                    <Image src={course.image} alt={course.name} width="100%" />
                </Col>

                <Col xs={24} md={14}>
                    <Title>{course.name}</Title>
                    <Paragraph type="secondary">{course.fullDescription}</Paragraph>
                    <Tag color="blue">{course.category}</Tag>
                    <Tag color="green">★ {course.rating}</Tag>
                    {course.discount > 0 && <Tag color="volcano">-{course.discount}%</Tag>}
                    <br />
                    <Title level={3} style={{ marginTop: 20 }}>
                        {course.price.toLocaleString()}đ
                    </Title>
                    <Button type="primary" size="large">Đăng ký ngay</Button>

                    <Descriptions title="Thông tin khóa học" bordered column={1} style={{ marginTop: 30 }}>
                        <Descriptions.Item label="Giảng viên">{course.instructor?.name}</Descriptions.Item>
                        <Descriptions.Item label="Trình độ">{course.level}</Descriptions.Item>
                        <Descriptions.Item label="Thời lượng">{course.duration}</Descriptions.Item>
                        <Descriptions.Item label="Số bài học">{course.lessons}</Descriptions.Item>
                        <Descriptions.Item label="Học viên đã học">{course.reviewCount}</Descriptions.Item>
                    </Descriptions>
                </Col>
            </Row>
        </div>
    );
};

export default CourseDetail;
