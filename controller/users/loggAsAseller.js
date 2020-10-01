const hapijoiStoreCreate = require("../../auth/joiCreateStore");
const authbcrypt = require("../../auth/bcrypt");
const users = require("../../models/sql/sqlpools");
const jwt = require("../../auth/jwt");
const localStorage = require("localStorage");

const createNewStoreAccount = async (req, res, next) => {
  try {
    const date = new Date();
    localStorage.setItem("isRemember", req.body.remember);
    let checkemail = await users.cheakStoreName(req.body.store_name);
    if (checkemail[0].length > 0) {
      req.session.err = "store name is alredy in used";
      res.redirect("/login");
    }
    let data = await hapijoiStoreCreate.createSellerSchemalogin(req.body);
    let hash = await authbcrypt.hashPassport(data.password);
    let token = await jwt.makeToken({ hash: hash });

    let insertToBigBase = await users.insertallStore(
      data.store_idcart,
      data.store_name,
      data.store_email,
      data.store_view,
      hash,
      token,
      date
    );

    if (insertToBigBase) {
      let store = await users.cheakStoreName(data.store_name);
      req.session.clientNumber = store[0][0].store_number;
      req.session.userStoreData = data;
      req.session.loginName = data.store_name;
      req.session.idcart = data.store_idcart;
      (req.session.view = data.store_view), (req.session.jwtToken = token);
      req.session.message = "loged in";
      console.log(req.session.clientNumber);
      res.redirect("/store");
    } else {
      console.log("problem with insert probebly internet problem");
    }
  } catch (e) {
    req.session.err = e.message;
    console.log("error while creating the store", e);
    res.status(404);

    res.redirect("/login");
  }
};

module.exports.createNewStoreAccount = createNewStoreAccount;
