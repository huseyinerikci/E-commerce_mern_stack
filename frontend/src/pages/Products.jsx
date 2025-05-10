import React, { useEffect, useState } from "react";
import Filter from "../layout/Filter";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../redux/slice/productSlice";
import ProductCard from "../components/ProductCard";
import ReactPaginate from "react-paginate";

const Products = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.products);
  console.log("Redux Products:", products);
  const { keyword } = useSelector((state) => state.general);
  const [price, setPrice] = useState({ min: 0, max: 5000 });
  const [rating, setRating] = useState(0);
  const [category, setCategory] = useState("");
  const [itemOffset, setItemOffset] = useState(0);
  console.log("Filtered products:", products);

  const endOffset = itemOffset + 5;

  const currentItems = products?.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(products?.length / 3);
  console.log("currentItems", currentItems);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * 3) % products?.length;

    setItemOffset(newOffset);
  };

  useEffect(() => {
    setItemOffset(0);
    const filters = {};

    if (keyword?.trim()) filters.keyword = keyword;
    if (category?.trim()) filters.category = category;
    if (rating > 0) filters.rating = rating;
    if (price.min !== 0 || price.max !== 5000) {
      filters["price[gte]"] = price.min;
      filters["price[lte]"] = price.max;
    }

    dispatch(getProducts(filters)).then(() => {
      console.log("Filtered products:", products); // Burada ürünleri logla
    });
  }, [dispatch, keyword, price, rating, category]);

  return (
    <div className="min-h-screen">
      <div className="flex gap-3">
        <Filter
          setPrice={setPrice}
          setRating={setRating}
          setCategory={setCategory}
        />
        <div>
          {loading ? (
            "Loading.."
          ) : (
            <div>
              {products && (
                <div className="flex flex-wrap gap-6 my-5">
                  {currentItems?.map((product, key) => (
                    <ProductCard product={product} key={key} />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <div>
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
        />
      </div>
    </div>
  );
};

export default Products;
