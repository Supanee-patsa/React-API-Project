import { useEffect, useState } from "react";
import './topbutton.css';

const ScrollButton: React.FC = () => {
  const [scrollToTopButton, setScrollToTopButton] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollToTopButton(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollTop = (): void => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <div className="topScroll-btn">
      {scrollToTopButton && (
        <button onClick={scrollTop}>
          Top
        </button>
      )}
    </div>
  );
};

export default ScrollButton;
