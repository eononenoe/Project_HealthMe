// src/components/Footer.jsx
import React from 'react';
import 'static/css/common/common.css';

const Footer = () => {
    return (
        <footer>
            <div className="top_info">
                <ul>
                    <li>주식회사 Jeon</li>
                    <li>/</li>
                    <li>STORE 헬시미</li>
                    <li>/</li>
                    <li>OWNER 전정현</li>
                    <li>/</li>
                    <li>COMPANY REG.NO</li>
                    <li>/</li>
                    <li>123.1234.1234</li>
                    <li>/</li>
                    <li>NETWORK REG.NO</li>
                    <li>/</li>
                    <li>제2025-대구광역시-0001호</li>
                    <li>/</li>
                    <li>CHECK</li>
                </ul>
            </div>
            <div className="low_info">
                <ul>
                    <li>
                        Copyright © 2025-01-01 Inc. All rights reserved. / designed by
                        JeonJeongHyeon ©
                    </li>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;
