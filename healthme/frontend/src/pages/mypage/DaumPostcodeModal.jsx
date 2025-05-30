import React, { useEffect } from "react";

export default function DaumPostcodeModal({ onClose, onSelect }) {
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.onload = () => {
      new window.daum.Postcode({
        oncomplete: function (data) {
          const roadAddress = data.roadAddress;
          const zonecode = data.zonecode;
          // console.log("updateAddr : ", data);
          onSelect({ address: roadAddress, zonecode: zonecode }); // AddressEditModal로 전송
          onClose();
        },
        width: "100%",
        height: "100%",
      }).embed(document.getElementById("daum-postcode"));
    };
    document.body.appendChild(script);
  }, []);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-content postcode-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div id="daum-postcode" className="postcode-container"></div>
      </div>
    </div>
  );
}
