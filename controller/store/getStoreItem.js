const { number } = require("@hapi/joi");
const GetAllItem = require("../../models/db/DBallStoreData");

// פה אני מנסה לקבל את המידע שיש לי
const getItem = async (req, res, next) => {
  if (req.query.serchQuary) {
    try {
      // let datar =
      await GetAllItem.find(
        {
          $or: [
            { itemTopic: req.query.serchQuary },
            { StoreName: req.query.serchQuary },
            { itemName: req.query.serchQuary },
          ],
        },
        function (err, user) {
          if (err) throw err;
          req.itemData = user;

          res.status(202);
          next();
        }
      ).catch((err) => console.log(err));
    } catch {
      console.log("error by get query");
      res.status(500);
      next();
    }
  } else {
    try {
      // let data =
      await GetAllItem.find({}, function (err, user) {
        if (err) throw err;
        req.itemData = user;

        res.status(202);
        next();
      }).catch((err) => console.log(err));
    } catch {
      console.log("error by get data");
      res.status(500);
    }
  }
};

module.exports.getItem = getItem;
