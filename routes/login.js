var express = require("express");
const loginController = require("../controller/users/loginCreatUser");
const storeSetController = require("../controller/users/login");
const logAsAsellerController = require("../controller/users/loggAsAseller");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  err = undefined;
  massage = undefined;
  res.render("login", {
    ...req.infoNav,
    err: req.session.err,
    view: req.session.view,
    massage: req.session.msg,
  });
});
router.post("/signup", loginController.createNewAccount);
router.post("/", storeSetController.logedin);
router.post("/logout", storeSetController.logute);
router.post("/logasseller", logAsAsellerController.createNewStoreAccount);

module.exports = router;
