import {useState} from "react";

const ScrollButton = () => {
    const [visible, setVisible] = useState(false);

    const toggleVisible = () => {
      const scrolled = document.documentElement.scrollTop;
      if (scrolled >300) {
        setVisible(true);
      } else if (scrolled <= 300) {
        setVisible(false);
      }
    };

    const scrollTop = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    };

    window.addEventListener("scroll", toggleVisible);

    return (
      <Button 
        onClick = {scrollTop}
        style = {{display: visible ? "inline" : "none"}}
      />         
    )
  }

  export default ScrollButton;