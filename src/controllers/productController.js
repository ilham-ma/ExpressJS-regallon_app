const prisma = require("../utils/prisma");
const { responseSuccess } = require("../utils/response");

const getAllProduct = async (req, res) => {
  try {
    const allProducts = await prisma.product.findMany();
    return responseSuccess(res, allProducts);
  } catch (err) {}
};

module.exports = { getAllProduct };
