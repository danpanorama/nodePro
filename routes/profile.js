var express = require("express");
const updateUser = require("../controller/users/updateUser");
const updateStore = require("../controller/store/updateStoreInfo");
const tokenandName = require("../middleware/tokenMiddleware");
const finderProducts = require("../middleware/profileStorePassing");
const findeUserItems = require("../middleware/profileUserPAssing");

var router = express.Router();

/* GET home page. */
router.get(
  "/",
  tokenandName.tryGetIn,
  finderProducts.findeProd,
  findeUserItems.findUserItems,
  function (req, res) {
    res.render("profile", {
      title: "Express",
      ...req.infoNav,
      err: req.session.err,
      storePass: req.session.idcart,
      items: req.profileProduct,
      userAllData: req.session.userAllData,
      userStoreData: req.session.userStoreData,
      loginName: req.session.loginName,
      view: req.session.view,
      userNumber: req.session.clientNumber,
    });
  }
);

router.post("/updateUser", updateUser.update, function (req, res) {
  console.log("update");
  res.redirect("/profile");
});

router.post("/updateStore", updateStore.update, function (req, res) {
  console.log("update");
  res.redirect("/profile");
});

module.exports = router;
