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
    <div className="container my-12">
      <div className="row items-center">
        <div className="w-full lg:w-3/4 my-5 lg:my-0 lg:px-4">
          <Slider {...settings}>
            <div>
              <img
                src={img1}
                className="w-full h-[500px] rounded-lg"
                alt="slider image 1"
              />
            </div>
            <div>
              <img
                src={img2}
                className="w-full h-[500px] rounded-lg"
                alt="slider image 2"
              />
            </div>
          </Slider>
        </div>
        <div className="w-full lg:w-1/4 flex flex-col gap-1">
          <img
            src={img2}
            className="w-full h-[250px] rounded-lg "
            alt="image slider 2"
          />
          <img
            src={img3}
            className="w-full h-[250px] rounded-lg "
            alt="image slider 3"
          />
        </div>
      </div>
    </div>
  );
}
