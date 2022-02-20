const { responseNotFound } = require("../utils/response");
const userRoutes = require("./userRoutes");

const routes = (app) => {
  app.use("/user", userRoutes);
  app.all("*", (req, res) => {
    return responseNotFound(res);
  });
};

module.exports = routes;
