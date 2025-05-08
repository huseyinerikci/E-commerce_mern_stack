import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../redux/slice/productSlice";
import ProductCard from "../components/ProductCard";
const Home = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <>
      <div>
        <img className="w-full" src="./banner.jpg" alt="banner" />
      </div>
      {loading ? (
        "Loading.."
      ) : (
        <div>
          {products?.products && (
            <div className="flex items-center justify-center gap-5 my-5 flex-wrap">
              {products?.products?.map((product, key) => (
                <ProductCard product={product} key={key} />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Home;
