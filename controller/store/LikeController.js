const Mogoallitems = require("../../models/db/DBallStoreData");

const likeone = async (req, res, next) => {
  try {
    let array = {
      name: req.session.loginName,
      number: req.session.clientNumber,
    };

    let item = await Mogoallitems.findOneAndUpdate(
      { _id: req.params.itemID },
      { $push: { userLikes: array } }
    ).catch((err) => console.log(err));

    next();
  } catch (e) {
    console.log("error while adit new item", e);
    res.status(404);
  }
};

const bayone = async (req, res, next) => {
  try {
    console.log(req.params.itemID);
    let like = await Mogoallitems.updateOne(
      { _id: req.params.itemID },
      { $inc: { sold: 1 } }
    );

    next();
  } catch (e) {
    console.log("error baying", e);
    res.status(404);
  }
};

module.exports.likeone = likeone;
module.exports.bayone = bayone;
