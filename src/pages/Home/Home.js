import styles from "./Home.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { useState, useEffect } from "react";

const Home = () => {
  const [slidesPerView, setSlidesPerView] = useState(2);
  const [currentIndex, setCurrentIndex] = useState(0);
  const data = [
    { id: 1, image: "./mcBanner.jpg" },
    { id: 2, image: "./pizzaBanner.png" },
    { id: 3, image: "./subwayBanner.jpg" },
  ];

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const nextIndex = (currentIndex + 1) % data.length;
      setCurrentIndex(nextIndex);
    }, 3000); // Change this value to 3000 for 3 seconds

    return () => {
      clearTimeout(timeoutId);
    };
  }, [currentIndex, data]);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 720) {
        setSlidesPerView(1);
      } else {
        setSlidesPerView(1);
      }
    }

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={styles.container}>
      <Swiper
        slidesPerView={slidesPerView}
        pagination={{ clickable: true }}
        navigation
        initialSlide={currentIndex}
        onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)}
      >
        {data.map((item) => (
          <SwiperSlide key={item.id}>
            <img
              src={item.image}
              alt={`Slider ${item.id}`}
              className="slide-item"
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <br /> <br /> <br /> <br /> <br /> <br />
      <br />
    </div>
  );
};

export default Home;
