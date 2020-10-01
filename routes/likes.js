var express = require("express");
const tokenMiddleware = require("../middleware/tokenMiddleware");
const LikeOne = require("../controller/store/LikeController");
const unLike = require("../controller/store/unLikeController");
const badcommend = require("../controller/store/badComm");

var router = express.Router();

router.post(
  "/:itemID",
  tokenMiddleware.tryGetIn,
  LikeOne.likeone,
  (req, res) => {
    res.redirect("/store/" + req.params.itemID);
  }
);

router.post(
  "/unLike/:itemID",
  tokenMiddleware.tryGetIn,
  unLike.unLike,
  (req, res) => {
    res.redirect("/store/" + req.params.itemID);
  }
);

router.post(
  "/baynow/:itemID",
  tokenMiddleware.tryGetIn,
  LikeOne.bayone,
  (req, res) => {
    res.redirect("/store");
  }
);

router.post(
  "/badcommend/:itemID",
  tokenMiddleware.tryGetIn,
  badcommend.baddcomm,
  (req, res) => {
    res.redirect("/store/" + req.params.itemID);
  }
);

module.exports = router;
