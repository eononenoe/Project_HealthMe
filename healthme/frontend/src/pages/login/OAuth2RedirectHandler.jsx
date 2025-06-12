import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const OAuth2RedirectHandler = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const loginUserEncoded = params.get("loginUser");

        if (loginUserEncoded) {
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