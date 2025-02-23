import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Footer from "../Components/Footer";
import Header from "../Components/Header";

export default function Layout({ main }) {
  // AOS animation
  useEffect(() => {
    AOS.init({
      offset: 5,
      delay: 0,
      duration: 1000,
      easing: "ease",
      once: false,
      mirror: true,
    });
    //ismobile fade-up
    const updateAosAttributes = () => {
      const fadeLeftElements = document.querySelectorAll(
        '[data-aos="fade-left"]'
      );
      const fadeRightElements = document.querySelectorAll(
        '[data-aos="fade-right"]'
      );

      fadeLeftElements.forEach((element) => {
        if (window.innerWidth <= 768) {
          // Assuming 768px as the mobile breakpoint
          element.setAttribute("data-aos", "fade-up");
        } else {
          element.setAttribute("data-aos", "fade-left");
        }
      });

      fadeRightElements.forEach((element) => {
        if (window.innerWidth <= 768) {
          element.setAttribute("data-aos", "fade-up");
        } else {
          element.setAttribute("data-aos", "fade-right");
        }
      });
    };

    updateAosAttributes();
    window.addEventListener("resize", updateAosAttributes);

    return () => {
      window.removeEventListener("resize", updateAosAttributes);
    };
  }, []);
  return (
    <div className="bg-white text-black-gray flex flex-col h-screen w-full min-h-screen">
      <Header />
      {main}
      <Footer />
    </div>
  );
}
