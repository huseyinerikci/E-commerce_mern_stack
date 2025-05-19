import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";

const ProductCard = ({ product, edit }) => {
  const navigate = useNavigate();

  const settings = {
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <div
      onClick={() => navigate(`/product/${product?._id}`)}
      className="bg-white rounded-2xl shadow hover:shadow-xl transition-all duration-300 cursor-pointer relative overflow-hidden"
    >
      {/* Slider alanı */}
      <div className="w-full h-[200px] overflow-hidden rounded-lg">
        {product?.images?.length > 1 ? (
          <Slider {...settings}>
            {product.images.map((image, i) => (
              <img
                key={i}
                src={image.url}
                alt="product"
                className="w-full h-[200px] object-cover rounded"
              />
            ))}
          </Slider>
        ) : (
          <img
            src={product.images[0]?.url}
            alt="product"
            className="w-full h-[200px] object-cover rounded"
          />
        )}
      </div>

      {/* İçerik alanı */}
      <div className="p-4 z-10 bg-white">
        <h3 className="text-lg font-semibold text-gray-800 truncate">
          {product?.name || "Ürün Adı"}
        </h3>
        <p className="text-gray-600 mt-1">
          {product?.price ? `${product.price} ₺` : "Fiyat bilgisi yok"}
        </p>
      </div>

      {/* Edit ikonları */}
      {edit && (
        <div className="absolute top-3 right-3 flex space-x-2 z-20">
          <AiFillEdit size={22} className="text-blue-600 hover:text-blue-800" />
          <AiFillDelete size={22} className="text-red-600 hover:text-red-800" />
        </div>
      )}
    </div>
  );
};

export default ProductCard;
