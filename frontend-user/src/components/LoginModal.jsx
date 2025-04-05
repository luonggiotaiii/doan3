import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { IoClose, IoLogoGoogle, IoLogoFacebook } from 'react-icons/io5';
import '../styles/_login_modal.scss';
import { motion, AnimatePresence } from 'framer-motion';
import RegisterModal from './RegisterModal'; // Import the RegisterModal

const LoginModal = ({ isOpen, onClose }) => {
    const [isRegisterOpen, setIsRegisterOpen] = useState(false); // State for RegisterModal

    const modalVariants = {
        hidden: {
            y: '100vh',
            opacity: 0,
        },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 20,
                duration: 0.5,
            },
        },
        exit: {
            y: '-100vh',
            opacity: 0,
            transition: {
                duration: 0.4,
            },
        },
    };

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 flex items-center justify-center z-50">
                        <motion.div
                            className="login-modal-overlay"
                            onClick={onClose}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        ></motion.div>

                        <motion.div
                            className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-[80vh] max-h-[82vh] h-full"
                            variants={modalVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        >
                            <button
                                className="absolute -top-4 -right-4 w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-300 hover:text-gray-800 transition"
                                onClick={onClose}
                            >
                                <IoClose className="w-6 h-6" />
                            </button>

                            <div className="text-center mt-4 mb-4">
                                <img src='/pic_in_login.webp' alt="Login Banner" />
                            </div>

                            <h3 className="text-left text-4xl font-semibold mb-4">
                                Rất nhiều đặc quyền và quyền lợi mua sắm đang chờ bạn
                            </h3>
                            <div className="flex justify-center m-4 gap-4 mb-4">
                                <img
                                    src="/pic-in-login-1.webp"
                                    alt="Feature 1"
                                    className="w-1/3 object-contain"
                                />
                                <img
                                    src="/pic-in-login-2.webp"
                                    alt="Feature 2"
                                    className="w-1/3 object-contain"
                                />
                                <img
                                    src="/pic-in-login-3.webp"
                                    alt="Feature 3"
                                    className="w-1/3 object-contain"
                                />
                            </div>
                            <div className="flex justify-left">
                                <h3 className="text-lg text-gray-700 font-semibold pt-4 pr-4">Đăng nhập bằng:</h3>
                                <button className="border border-gray-800 rounded-2xl p-2 mr-2">
                                    <img
                                        src="https://www.google.com/favicon.ico"
                                        alt="Google"
                                        className="w-10 h-10"
                                    />
                                </button>
                                <button className="border border-gray-800 rounded-2xl p-2">
                                    <img
                                        src="https://www.facebook.com/favicon.ico"
                                        alt="Facebook"
                                        className="w-10 h-10"
                                    />
                                </button>
                            </div>

                            <h3 className="text-lg text-gray-700 font-semibold pt-4 pr-4 mb-3">Hoặc đăng nhập tài khoản:</h3>
                            <div className="space-y-4">
                                <div>
                                    <InputText
                                        id="email"
                                        placeholder="Email/SĐT của bạn"
                                        className="w-full h-14 p-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <InputText
                                        id="password"
                                        type="password"
                                        placeholder="Mật khẩu"
                                        className="w-full h-14 p-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>
                            <button className="w-full h-13 bg-black text-white p-3 rounded-full mt-4 hover:bg-gray-800">
                                ĐĂNG NHẬP
                            </button>

                            <div className="flex justify-between mt-4 text-lg">
                                <button
                                    onClick={() => {
                                        onClose(); // Close LoginModal
                                        setIsRegisterOpen(true); // Open RegisterModal
                                    }}
                                    className="text-blue-800 hover:underline"
                                >
                                    Đăng ký
                                </button>
                                <a href="#" className="text-blue-800 hover:underline">
                                    Quên mật khẩu
                                </a>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Render RegisterModal */}
            <RegisterModal
                isOpen={isRegisterOpen}
                onClose={() => setIsRegisterOpen(false)}
            />
        </>
    );
};

export default LoginModal;