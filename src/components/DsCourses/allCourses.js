/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
    Row, Col, Card, Select, Typography, Tag, Input, Empty, Pagination, message, Skeleton
} from "antd";
import { Link } from "react-router-dom";
import { HeartTwoTone, LoadingOutlined } from "@ant-design/icons";
import { getAllCourses } from "../../services/dataCourses";
import { getAllCategories } from "../../services/dataCategories";
import { getCookie } from "../../helpers/cookie";
import "./AllCourses.scss";
import { getUser, patchUser } from "../../services/dataUser";

const { Option } = Select;
const { Title, Paragraph } = Typography;

const AllCourses = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const userId = parseInt(getCookie("user_id"));
    const [userFavs, setUserFavs] = useState([]);
    const [courses, setCourses] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [selectedPrice, setSelectedPrice] = useState("all");
    const [keyword, setKeyword] = useState("");
    const [user, setUser] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 6;
    const [loading, setLoading] = useState(false);
    const priceRanges = [
        { id: 1, label: "Dưới 500K", min: 0, max: 500000 },
        { id: 2, label: "500K - 1 triệu", min: 500000, max: 1000000 },
        { id: 3, label: "Trên 1 triệu", min: 1000000, max: 999999999 },
    ];

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
    useEffect(() => {
        async function fetchData() {
            const [courseData, categoryData] = await Promise.all([
                getAllCourses(),
                getAllCategories()
            ]);
            setCourses(courseData);
            setFiltered(courseData);
            setCategories(categoryData);

            if (userId) {
                const res = await getUser(userId);
                setUserFavs(res.favoriteProducts || []);
                setUser(res);
            }
        }
        fetchData();
    }, [userId]);

    useEffect(() => {
        let result = [...courses];
        if (selectedCategory !== "all") {
            result = result.filter(c => c.category === selectedCategory);
        }
        if (selectedPrice !== "all") {
            const range = priceRanges.find(r => r.id === Number(selectedPrice));
            result = range
                ? result.filter(c => c.price >= range.min && c.price <= range.max)
                : result;
        }
        if (keyword.trim()) {
            result = result.filter(c =>
                c.name.toLowerCase().includes(keyword.toLowerCase())
            );
        }
        setFiltered(result);
        setCurrentPage(1);
    }, [selectedCategory, selectedPrice, keyword, courses]);

   
    const toggleFavorite = async (prodId) => {
        setLoading(true);
        if (!userId) {
            error("Bạn cần đăng nhập để đánh dấu yêu thích");
            return;
        }
        const isFav = userFavs.includes(prodId);
        const newFavs = isFav
            ? userFavs.filter(id => id !== prodId)
            : [...userFavs, prodId];
        // gọi PATCH cập nhật favorities
        await patchUser(userId, { favoriteProducts: newFavs } );
      
        setUserFavs(newFavs);
        message.success(isFav ? error("Đã bỏ yêu thích") : success("Đã thêm vào yêu thích"));
        setLoading(false);
    };

    const startIndex = (currentPage - 1) * pageSize;
    const paginated = filtered.slice(startIndex, startIndex + pageSize);
    const addToViewHistory = async (courseId) => {
        if (!user) return;
        const currentHistory = user.viewHistory || [];
        if (!currentHistory.includes(courseId)) {
            const newHistory = [...currentHistory, courseId];
            await patchUser(userId, { viewHistory: newHistory });
            setUser({ ...user, viewHistory: newHistory });
        }
    };
  
    if (courses.length === 0 || filtered.length === 0 || categories.length === 0 ) {
        return (
            <>
                <div className="all-courses-page container" style={{minHeight:"80vh"} }>
                    <Skeleton.Button active={true} block={true} style={{ minHeight: 100 }} />
                    {/*<div className="filter-bar">*/}

                    {/*    <Skeleton.Button active={true} block={true}  />*/}

                    {/*</div>*/}

                    <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
                        <Skeleton.Button active={true} block={true} />

                        <Col xs={24} sm={12} md={8} >
                            
                                <Card.Meta
                                description={
                                    <>
                                        <Skeleton.Button active={true} block={true} style={{ minHeight: 160 }} />

                                    </>
                                }
                            />
                            
                        </Col>
                        <Col xs={24} sm={12} md={8} >

                            <Card.Meta
                                description={
                                    <>
                                        <Skeleton.Button active={true} block={true} style={{ minHeight: 160 }} />

                                    </>
                                }
                            />

                        </Col>
                        <Col xs={24} sm={12} md={8} >

                            <Card.Meta
                                description={
                                    <>
                                        <Skeleton.Button active={true} block={true} style={{ minHeight: 160 }} />

                                    </>
                                }
                            />

                        </Col>
                        <Col xs={24} sm={12} md={8} >

                            <Card.Meta
                                description={
                                    <>
                                        <Skeleton.Button active={true} block={true} style={{ minHeight: 160 }} />

                                    </>
                                }
                            />

                        </Col>
                        <Col xs={24} sm={12} md={8} >

                            <Card.Meta
                                description={
                                    <>
                                        <Skeleton.Button active={true} block={true} style={{ minHeight: 160 }} />

                                    </>
                                }
                            />

                        </Col>
                        <Col xs={24} sm={12} md={8} >

                            <Card.Meta
                                description={
                                    <>
                                        <Skeleton.Button active={true} block={true} style={{ minHeight: 160 }} />

                                    </>
                                }
                            />

                        </Col>


                    </Row>


                </div>
            </>
        )
    }
    return (
        <>
            {contextHolder}

        <div className="all-courses-page container">
            <Title level={2}>Tất cả khóa học 📚</Title>
            <div className="filter-bar">
                <Select
                    value={selectedCategory}
                    onChange={setSelectedCategory}
                    style={{ width: 200, marginRight: 20 }}
                >
                    <Option value="all">Tất cả danh mục</Option>
                    {categories.map(cat => (
                        <Option value={cat.name} key={cat.id}>{cat.name}</Option>
                    ))}
                </Select>
                <Select
                    value={selectedPrice}
                    onChange={setSelectedPrice}
                    style={{ width: 200, marginRight: 20 }}
                >
                    <Option value="all">Tất cả mức giá</Option>
                    {priceRanges.map(range => (
                        <Option key={range.id} value={range.id}>{range.label}</Option>
                    ))}
                </Select>
                <Input
                    placeholder="Tìm kiếm..."
                    value={keyword}
                    onChange={e => setKeyword(e.target.value)}
                    style={{ width: 300 }}
                />
            </div>

            <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
                {paginated.length === 0 ? (
                    <Col span={24} style={{ textAlign: "center", paddingTop: 50 }}>
                        <Empty description="Không tìm thấy" />
                    </Col>
                ) : (
                    paginated.map(course => {
                        const isFav = userFavs.includes(course.id);
                        return (
                            <Col xs={24} sm={12} md={8} key={course.id}>
                                <Card
                                    hoverable
                                    cover={<img alt={course.name} src={course.image} />}
                                    actions={[
                                        <Link to={`${course.id}`} onClick={() => addToViewHistory(course.id)}>Xem chi tiết</Link>,
                                      
                                        <HeartTwoTone
                                            twoToneColor={isFav ? "#eb2f96" : "#ccc"}
                                            onClick={() => toggleFavorite(course.id)}
                                            
                                        />
                                    ]}
                                >

                                    <Card.Meta
                                        title={
                                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                                {course.name}
                                             
                                            </div>
                                        }
                                        description={
                                            <>
                                                <Paragraph ellipsis={{ rows: 2 }}>{course.shortDescription}</Paragraph>
                                                <Tag color="blue">{course.category}</Tag>
                                                <Tag color="green">★ {course.rating}</Tag>
                                                <Tag color="red">{course.price.toLocaleString()}đ</Tag>
                                                {course.discount > 0 && <Tag color="volcano">-{course.discount}%</Tag>}
                                            </>
                                        }
                                    />
                                </Card>
                            </Col>
                        );
                    })
                )}
            </Row>

            {filtered.length > pageSize && (
                <div style={{ textAlign: "center", marginTop: 40 }}>
                    <Pagination
                        current={currentPage}
                        pageSize={pageSize}
                        total={filtered.length}
                        onChange={setCurrentPage}
                    />
                </div>
            )}
            </div>
        </>
    );
};

export default AllCourses;
