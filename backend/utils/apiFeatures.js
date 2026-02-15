class ApiFeatures {
  // query ==> await Product.find();
  // queryString  ==> req.query
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  // specific product search() =>
  search() {
    //queryString.keyword => https://example.com/path/to/page?name=ferret&color=purple [here => name and color are keyword]
    const keyword = this.queryString.keyword
      ? {
          name: {
            $regex: this.queryString.keyword,
            $options: "i", // for case insenstiveness
          },
        }
      : {};

    this.query = this.query.find({ ...keyword }); // here query ==> await Product.find(); we know that

    return this;
  }

  // filter() the product ==> filetr work base on category
  filter() {
    const queryCopy = { ...this.queryString }; // making the new object of queryString
    //  Removing some fields for category

    const removeFields = ["keyword", "page", "limit"]; // here we are filtering data based on other query like category , price so we are removing other query => "keyword", "page", "limit"

    removeFields.forEach((key) => delete queryCopy[key]); // remove unwanted query

    // Convert flat bracket notation to nested object
    // e.g., price[$gte]=0 becomes price: { $gte: 0 }
    const filterObj = {};
    for (const [key, value] of Object.entries(queryCopy)) {
      const match = key.match(/^(\w+)\[\$?(\w+)\]$/); // matches "price[$gte]" or "price[gte]"
      if (match) {
        const [, field, operator] = match;
        if (!filterObj[field]) {
          filterObj[field] = {};
        }
        // Ensure value is a number if it's a price or rating
        const numValue = isNaN(value) ? value : Number(value);
        filterObj[field][`$${operator}`] = numValue;
      } else {
        // For other fields like category
        filterObj[key] = value;
      }
    }

    //console.log("Original queryCopy:", queryCopy);
   // console.log("Filter object:", filterObj);
    
    this.query = this.query.find(filterObj);

    return this;
  }

  // Pagintaion =>
  
  Pagination(resulltPrrPage) {
  
    // we are shwoing products resulltPrrPage{eg :5 item} in every page
    const currentPage = Number(this.queryString.page) || 1; // if there is no page value in query then show first page
    const skip = resulltPrrPage * (currentPage - 1); // here lets say we have 50 total product and we are showing 10 product  in one page so if page value is 2 then => 10 * (2-1) =  10, we will skip first 10 product for showing second page
    this.query = this.query.limit(resulltPrrPage).skip(skip); // limit is query of mongoose set limit to retrun product and skip is how manny starting product we want to skip for next page number
    return this;
  }
}
module.exports = ApiFeatures;
