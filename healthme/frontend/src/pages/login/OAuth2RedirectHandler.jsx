import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const OAuth2RedirectHandler = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const accessToken = params.get("accessToken");
        const refreshToken = params.get("refreshToken");
        const loginUserEncoded = params.get("loginUser");
        if (accessToken && loginUserEncoded) {
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);
            // 소셜 로그인 시 loginUser값이 인코딩 값이라 디코딩 필요
            const loginUser = JSON.parse(decodeURIComponent(loginUserEncoded));
            localStorage.setItem("loginUser", JSON.stringify(loginUser));
            navigate("/");
        } else {
            alert("소셜 로그인 실패!");
            navigate("/login");
        }
    }, [location, navigate]);

    return null;
};

export default OAuth2RedirectHandler;
