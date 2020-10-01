const SetMyItem = require("../../models/db/mongoSal");

const fs = require("fs");
const path = require("path");

const setitemintosal = async (req, res, next) => {
  try {
    const setItem = await new SetMyItem({
      ID: req.params.itemID,
      itemName: req.session.dicvar.itemName,
      itemDiscription: req.session.dicvar.itemDiscription,
      itemPrice: req.session.dicvar.itemPrice,
      itemTopic: req.session.dicvar.itemTopic,
      idcart: req.session.dicvar.idcart,
      StoreName: req.session.dicvar.StoreName,
      clientName: req.session.loginName,
      ClientNumber: req.session.clientNumber,
      sum: req.body.sum,
      file: req.session.dicvar.file,
    });
    setItem
      .save()
      .then((result) => {
        next();
      })
      .catch((err) => console.log(err));
  } catch (e) {
    console.log("error while edit item", e);
    req.session.err = e.message;
    res.redirect("/profile");
  }
};

module.exports.setitemintosal = setitemintosal;
