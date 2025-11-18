// src/components/AnimateWhenVisible.js
import React from 'react';
import { motion } from 'framer-motion';

// 1. Định nghĩa sẵn các hiệu ứng
const variants = {
    // "Fade in từ dưới lên" (Mặc định)
    fadeInUp: {
        initial: { opacity: 0, y: 50 },
        whileInView: { opacity: 1, y: 0 }
    },
    // "Fade in từ trên xuống"
    fadeInDown: {
        initial: { opacity: 0, y: -50 },
        whileInView: { opacity: 1, y: 0 }
    },
    // "Trượt từ trái sang phải"
    slideFromLeft: {
        initial: { opacity: 0, x: -100 },
        whileInView: { opacity: 1, x: 0 }
    },
    // "Trượt từ phải sang trái"
    slideFromRight: {
        initial: { opacity: 0, x: 100 },
        whileInView: { opacity: 1, x: 0 }
    },
    // "Chỉ mờ dần"
    fade: {
        initial: { opacity: 0 },
        whileInView: { opacity: 1 }
    }
};

function AnimateWhenVisible({
    children,
    // 2. Nhận prop 'direction', mặc định là 'fadeInUp'
    direction = 'fadeInUp',
    // Bạn vẫn có thể tùy chỉnh transition và viewport
    transition = { duration: 1, ease: "easeInOut" },
    viewport = { once: true }
}) {

    // 3. Lấy ra object hiệu ứng dựa trên 'direction'
    // Nếu 'direction' không tồn tại, dùng 'fadeInUp'
    const animation = variants[direction] || variants.fadeInUp;

    return (
        <motion.div
            // 4. Áp dụng hiệu ứng đã chọn
            initial={animation.initial}
            whileInView={animation.whileInView}
            transition={transition}
            viewport={viewport}
        >
            {children}
        </motion.div>
    );
}

export default AnimateWhenVisible;