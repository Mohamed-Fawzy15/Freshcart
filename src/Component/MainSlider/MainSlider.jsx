import Slider from "react-slick/lib/slider";
import img1 from "../../assets/slider-image-1.jpeg";
import img2 from "../../assets/slider-image-2.jpeg";
import img3 from "../../assets/slider-image-3.jpeg";

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  initialSlide: 0,
  autoplay: true,
  autoplaySpeed: 2000,
  arrows: false,
};

export default function MainSlider() {
  return (
    <div className="row my-3">
      <div className="w-3/4 ">
        <Slider {...settings}>
          <div>
            <img src={img1} className="w-full h-[500px]" alt="slider image 1" />
          </div>
          <div>
            <img src={img2} className="w-full h-[500px]" alt="slider image 2" />
          </div>
        </Slider>
      </div>
      <div className="w-1/4">
        <img src={img2} className="w-full h-[250px]" alt="image slider 2" />
        <img src={img3} className="w-full h-[250px]" alt="image slider 3" />
      </div>
    </div>
  );
}
