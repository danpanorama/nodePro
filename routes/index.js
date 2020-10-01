var express = require("express");
const darkLite = require("../middleware/darkLite");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  err = undefined;
  massage = undefined;
  res.render("index", {
    title: "Express",
    ...req.infoNav,
    view: req.session.view,
    massage: req.session.msg,
    err: req.session.err,
  });
});

router.post("/darklite/:page", darkLite, function (req, res, next) {
  res.redirect("/" + req.params.page);
});

module.exports = router;
