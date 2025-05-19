import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addAdminProducts,
  getAdminProducts,
} from "../redux/slice/productSlice";
import ProductCard from "../components/ProductCard";
import Button from "../components/Button";
import { openModalFunc } from "../redux/slice/generalSlice";
import Modal from "../components/Modal";
import Input from "../components/Input";

const Admin = () => {
  const { adminProducts } = useSelector((state) => state.products);
  const { openModal } = useSelector((state) => state.general);
  const dispatch = useDispatch();
  const [data, setData] = useState({
    name: "",
    description: "",
    rating: "",
    price: "",
    stock: "",
    category: "",
    images: [],
  });

  useEffect(() => {
    dispatch(getAdminProducts());
  }, [dispatch]);

  const addProduct = () => {
    dispatch(openModalFunc());
  };

  const productHandle = (e) => {
    if (e.target.name === "images") {
      const files = Array.from(e.target.files);
      const imageArray = [];

      files.forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.readyState === 2) {
            imageArray.push(reader.result);
            setData((prev) => ({
              ...prev,
              images: [...prev.images, ...imageArray],
            }));
          }
        };
        reader.readAsDataURL(file);
      });
    } else {
      setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };

  const content = (
    <div className="space-y-4">
      <Input
        onChange={productHandle}
        name="name"
        placeholder="Ürün Adı"
        type="text"
        value={data.name}
      />
      <Input
        onChange={productHandle}
        name="description"
        placeholder="Ürün Açıklaması"
        type="text"
        value={data.description}
      />
      <Input
        onChange={productHandle}
        name="price"
        placeholder="Ürün Fiyatı"
        type="number"
        value={data.price}
      />
      <Input
        onChange={productHandle}
        name="stock"
        placeholder="Ürün Stoğu"
        type="number"
        value={data.stock}
      />
      <Input
        onChange={productHandle}
        name="rating"
        placeholder="Ürün Puanı"
        type="number"
        value={data.rating}
      />
      <Input
        onChange={productHandle}
        name="category"
        placeholder="Ürün Kategorisi"
        type="text"
        value={data.category}
      />
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Ürün Görselleri
        </label>
        <Input onChange={productHandle} name="images" type="file" multiple />
      </div>
    </div>
  );

  const modalAddFunc = async () => {
    await dispatch(addAdminProducts(data));

    dispatch(openModalFunc());
  };

  return (
    <div className="min-h-screen p-6">
      <div className="mb-5">
        <Button text="Ürün Ekle" onClick={addProduct} />
      </div>

      {adminProducts?.products && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {adminProducts.products.map((product, key) => (
            <ProductCard edit={true} product={product} key={key} />
          ))}
        </div>
      )}

      {openModal && (
        <Modal
          title="Ürün Ekle"
          content={content}
          btnName="Ürünü Kaydet"
          onClick={modalAddFunc}
        />
      )}
    </div>
  );
};

export default Admin;
