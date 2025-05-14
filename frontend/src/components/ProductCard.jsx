import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";

const ProductCard = ({ product, edit }) => {
  const navigate = useNavigate();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div
      onClick={() => navigate(`/product/${product?._id}`)}
      className="w-[300px] bg-white rounded-xl shadow-md p-3 cursor-pointer hover:shadow-lg transition relative"
    >
      <div className="w-full h-[200px] overflow-hidden rounded-lg">
        <Slider {...settings}>
          {product?.images?.map((image, i) => (
            <img
              key={i}
              src={image.url}
              alt="product"
              className="w-full h-[200px] object-cover rounded"
            />
          ))}
        </Slider>
      </div>

      <div className="mt-3">
        <div className="text-lg font-semibold">{product?.name}</div>
        <div className="text-base text-gray-700">{product?.price} ₺</div>
      </div>

      {edit && (
        <div className="absolute flex items-center gap-2 top-4 right-4">
          <AiFillEdit size={25} className="text-blue-500 " />
          <AiFillDelete size={25} className="text-red-500 " />
        </div>
      )}
    </div>
  );
};

export default ProductCard;
