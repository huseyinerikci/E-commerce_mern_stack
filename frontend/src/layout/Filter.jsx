import React from "react";

const Filter = ({ setPrice, setRating, setCategory }) => {
  const categoryList = ["Telefon", "Bilgisayar", "Çanta", "Ayakkabı", "Elbise"];
  const ratingList = [1, 2, 3, 4, 5];

  return (
    <div className="bg-white rounded-md p-4 shadow-md sticky top-5 max-w-[220px] w-full">
      <h2 className="text-lg font-semibold mb-3">Filtreleme</h2>

      {/* Fiyat Aralığı */}
      <div className="mb-6">
        <label className="block mb-1 font-medium">Fiyat Aralığı</label>
        <div className="flex gap-3">
          <input
            onChange={(e) =>
              setPrice((prev) => ({ ...prev, min: Number(e.target.value) }))
            }
            className="border border-gray-300 rounded px-3 py-1 w-full focus:outline-blue-400"
            type="number"
            placeholder="Min"
            min={0}
          />
          <input
            onChange={(e) =>
              setPrice((prev) => ({ ...prev, max: Number(e.target.value) }))
            }
            className="border border-gray-300 rounded px-3 py-1 w-full focus:outline-blue-400"
            type="number"
            placeholder="Max"
            min={0}
          />
        </div>
      </div>

      {/* Kategori */}
      <div className="mb-6">
        <div className="font-medium mb-2">Kategori</div>
        <div className="flex flex-col gap-2 max-h-[200px] overflow-y-auto">
          {categoryList.map((category, idx) => (
            <button
              key={idx}
              onClick={() => setCategory(category)}
              className="text-left px-3 py-1 rounded hover:bg-blue-100 transition-colors whitespace-nowrap"
              type="button"
            >
              {category}
            </button>
          ))}
          <button
            onClick={() => setCategory("")}
            className="text-left px-3 py-1 rounded text-red-600 hover:bg-red-100 transition-colors mt-2"
            type="button"
          >
            Kategoriyi Temizle
          </button>
        </div>
      </div>

      {/* Puanlama */}
      <div>
        <div className="font-medium mb-2">Puanlama</div>
        <div className="flex flex-wrap gap-2 max-w-full">
          {ratingList.map((rating, idx) => (
            <button
              key={idx}
              onClick={() => setRating(rating)}
              className="flex items-center justify-center gap-1 px-3 py-1 rounded border border-gray-300 hover:bg-yellow-400 hover:text-white transition-colors whitespace-nowrap text-sm"
              type="button"
            >
              {rating} <span>⭐</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filter;
