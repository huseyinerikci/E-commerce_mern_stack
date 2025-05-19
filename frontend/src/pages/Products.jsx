import React, { useEffect, useState } from "react";
import Filter from "../layout/Filter";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../redux/slice/productSlice";
import ProductCard from "../components/ProductCard";
import ReactPaginate from "react-paginate";

const Products = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.products);
  const { keyword } = useSelector((state) => state.general);

  const [price, setPrice] = useState({ min: 0, max: 5000 });
  const [rating, setRating] = useState(0);
  const [category, setCategory] = useState("");
  const [itemOffset, setItemOffset] = useState(0);

  const itemsPerPage = 6;
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = products?.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(products?.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % products.length;
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

    dispatch(getProducts(filters));
  }, [dispatch, keyword, price, rating, category]);

  return (
    <div className="min-h-screen p-5 bg-gray-50">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Filtre alanı */}
        <aside className="w-full max-w-[260px]">
          <Filter
            setPrice={setPrice}
            setRating={setRating}
            setCategory={setCategory}
          />
        </aside>

        {/* Ürün listesi */}
        <main className="flex-1">
          {loading ? (
            <div className="flex justify-center items-center h-64 text-xl font-semibold text-gray-700">
              Yükleniyor...
            </div>
          ) : (
            <>
              {products?.length === 0 ? (
                <p className="text-center text-gray-600 mt-20 text-lg">
                  Ürün bulunamadı.
                </p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {currentItems?.map((product, key) => (
                    <ProductCard product={product} key={key} />
                  ))}
                </div>
              )}

              {/* Pagination */}
              {products?.length > itemsPerPage && (
                <div className="flex justify-center mt-10">
                  <ReactPaginate
                    breakLabel="..."
                    nextLabel="›"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    pageCount={pageCount}
                    previousLabel="‹"
                    containerClassName="flex gap-2 list-none"
                    pageClassName="px-3 py-1 rounded cursor-pointer hover:bg-blue-500 hover:text-white transition"
                    activeClassName="bg-blue-600 text-white font-bold"
                    previousClassName="px-3 py-1 rounded cursor-pointer hover:bg-blue-500 hover:text-white transition"
                    nextClassName="px-3 py-1 rounded cursor-pointer hover:bg-blue-500 hover:text-white transition"
                    disabledClassName="opacity-50 cursor-not-allowed"
                  />
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default Products;
