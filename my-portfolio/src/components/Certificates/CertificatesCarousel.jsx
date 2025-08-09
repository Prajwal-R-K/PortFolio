// src/components/Certificates/CertificatesCarousel.jsx
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const items = [
  { file: "cert1.jpg", title: "Certificate 1" },
  { file: "cert2.jpg", title: "Certificate 2" },
  { file: "cert3.jpg", title: "Certificate 3" },
];

export default function CertificatesCarousel() {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 0,
    cssEase: "linear",
    pauseOnHover: true,
  };
  return (
    <Slider {...settings}>
      {items.map((c, i) => (
        <div key={i} className="px-4">
          <img src={`/certificates/${c.file}`} alt={c.title} className="rounded-xl" />
          <p className="text-center mt-2">{c.title}</p>
        </div>
      ))}
    </Slider>
  );
}
