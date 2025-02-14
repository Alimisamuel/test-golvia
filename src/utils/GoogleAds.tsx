import React, { useEffect } from "react";

const GoogleAds: React.FC = () => {
  useEffect(() => {
    const adsbygoogle = window.adsbygoogle || [];
    try {
      adsbygoogle.push({});
    } catch (e) {
      console.error("AdSense initialization error:", e);
    }

    return () => {
      // Cleanup to prevent errors on re-mount
      const ins = document.querySelector(".adsbygoogle");
      if (ins) ins.innerHTML = "";
    };
  }, []);

  return (
    <div>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-7145869889431675"
        data-ad-slot="1234567890"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
};

export default GoogleAds;
