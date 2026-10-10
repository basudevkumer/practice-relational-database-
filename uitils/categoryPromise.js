
const SubCat = require("../models/practiceVendorSubCategory");


let attachSubCategories = async (data) => {
  return await Promise.all(
    data.map(async (item) => {
      let sub = await SubCat.find({ parentCategory: item._id }).lean();
      return { ...item, subcategory: sub };
    }),
  );
};


module.exports =  attachSubCategories