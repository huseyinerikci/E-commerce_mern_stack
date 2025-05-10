// class ProductFilter {
//   constructor(query, queryStr) {
//     this.query = query;
//     this.queryStr = queryStr;
//   }

//   search() {
//     const keyword = this.queryStr.keyword
//       ? {
//           name: {
//             $regex: this.queryStr.keyword,
//             $options: "i",
//           },
//         }
//       : {};
//     this.query = this.query.find({ ...keyword });
//     return this;
//   }
//   filter() {
//     const queryCopy = { ...this.queryStr };
//     const deleteArea = ["keyword", "page", "limit"];
//     deleteArea.forEach((item) => delete queryCopy[item]);

//     let queryStr = JSON.stringify(queryCopy);
//     queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

//     this.query = this.query.find(JSON.parse(queryStr));
//     return this;
//   }
// filter() {
//   const queryCopy = { ...this.queryStr };
//   const deleteArea = ["keyword", "page", "limit"];
//   deleteArea.forEach((item) => delete queryCopy[item]);

//   // Boş olanları temizle
//   for (const key in queryCopy) {
//     if (
//       queryCopy[key] === "" ||
//       queryCopy[key] === undefined ||
//       queryCopy[key] === null
//     ) {
//       delete queryCopy[key];
//     }
//   }

//   let queryStr = JSON.stringify(queryCopy);
//   queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);
//   this.query = this.query.find(JSON.parse(queryStr));
//   return this;
// }

//   pagination(resultPerPage) {
//     const activePage = this.queryStr.page || 1;
//     const skip = resultPerPage * (activePage - 1);
//     this.query = this.query.limit(resultPerPage).skip(skip);
//     return this;
//   }
// }

// module.exports = ProductFilter;
class ProductFilter {
  constructor(query, queryParams) {
    this.query = query;
    this.queryParams = queryParams;
  }

  search() {
    const keyword = this.queryParams.keyword;
    if (keyword) {
      this.query = this.query.find({
        name: { $regex: keyword, $options: "i" },
      });
    }
    return this;
  }
  filter() {
    const queryCopy = { ...this.queryParams };

    // Bu alanlar filtreleme değil
    const removeFields = ["keyword", "page", "limit"];
    removeFields.forEach((key) => delete queryCopy[key]);

    // price[gte], rating[gte] gibi filtreleri dönüştür
    let queryStr = JSON.stringify(queryCopy);

    // Eğer price[gte] ve price[lte] varsa doğru şekilde dönüştür
    queryStr = queryStr.replace(
      /price\[(gte|lte)\]/g,
      (match, p1) => `price.$${p1}`
    );

    console.log("Processed Query String:", queryStr); // Güncellenmiş sorguyu logla

    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  pagination(resultsPerPage) {
    const currentPage = Number(this.queryParams.page) || 1;
    const skip = resultsPerPage * (currentPage - 1);

    this.query = this.query.limit(resultsPerPage).skip(skip);

    return this;
  }
}

module.exports = ProductFilter;
