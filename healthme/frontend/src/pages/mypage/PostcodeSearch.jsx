// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// export default function PostcodeSearch() {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const script = document.createElement("script");
//     script.src =
//       "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
//     script.async = true;

//     script.onload = () => {
//       new window.daum.Postcode({
//         oncomplete: function (data) {
//           const roadAddress = data.roadAddress;
//           navigate(
//             `/mypage/address_add_form?roadAddress=${encodeURIComponent(
//               roadAddress
//             )}`
//           );
//         },
//       }).embed(document.getElementById("search-area"));
//     };

//     document.body.appendChild(script);
//   }, [navigate]);

//   return <div id="search-area" />;
// }
