import React, { useState, useEffect } from "react";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

const slidesData = [
    "https://i0.wp.com/digital-photography-school.com/wp-content/uploads/2021/04/tell-us-about-yourself-and-your-photography-1.jpg?w=600&h=1260&ssl=1&is-pending-load=1",
    "https://images.pexels.com/photos/17542964/pexels-photo-17542964.jpeg?cs=srgb&dl=pexels-paige-thompson-17542964.jpg&fm=jpg",
    "https://tse1.mm.bing.net/th/id/OIP.kLIGDqjite37BRwi4Pc00wHaE8?w=612&h=408&rs=1&pid=ImgDetMain&o=7&rm=3",
];

export default function IntroSlider() {
    const [index, setIndex] = useState(0);

    const prevSlide = () => {
        setIndex((prev) => (prev - 1 + slidesData.length) % slidesData.length);
    };

    const nextSlide = () => {
        setIndex((prev) => (prev + 1) % slidesData.length);
    };

    // ⏱ Auto-play sau 2s
    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % slidesData.length);
        }, 2000);

        return () => clearInterval(timer); // clear khi component unmount hoặc re-render
    }, []);

    return (
        <div
            style={{
                width: "auto",
                height: "60vh",
                margin: "auto",
                position: "relative",
                overflow: "hidden",
                borderRadius: "8px",
                objectFit: "cover",
            }}
        >
            {slidesData.map((src, i) => (
                <img
                    key={i}
                    src={src}
                    alt="slide"
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        opacity: i === index ? 1 : 0,
                        transition: "opacity 0.8s ease-in-out",
                    }}
                />
            ))}

            <button
                onClick={prevSlide}
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "10px",
                    transform: "translateY(-50%)",
                    background: "rgba(255, 255, 255, 0.21)",
                    color: "white",
                    border: "none",
                    padding: "20px",
                    cursor: "pointer",
                    borderRadius: "50%",
                }}
            >
                <LeftOutlined />
            </button>
            <button
                onClick={nextSlide}
                style={{
                    position: "absolute",
                    top: "50%",
                    right: "10px",
                    transform: "translateY(-50%)",
                    background: "rgba(255, 255, 255, 0.21)",
                    color: "white",
                    border: "none",
                    padding: "20px",
                    cursor: "pointer",
                    borderRadius: "50%",
                }}
            >
                <RightOutlined />
            </button>
        </div>
    );
}
