const hapijoi = require("../../auth/joiCreat");
const authbcrypt = require("../../auth/bcrypt");
const users = require("../../models/sql/sqlpools");
const mongoos = require("../../models/db/mongoSal");
const jwt = require("../../auth/jwt");
const localStorage = require("localStorage");

const update = async (req, res, next) => {
  try {
    let data = req.body;
    let usersarray = await users.selectUser();

    let filterUsers = await usersarray.filter((user) => {
      return user.client_number != req.body.userID;
    });
    let validName = await filterUsers.filter((user) => {
      user.client_fullName = req.body.client_fullName;
    });
    if (validName.length > 0) {
      res.err = "user name alredy exist";
      res.status(201);
      next();
    }

    let makenewhash = await authbcrypt.hashPassport(data.password);

    data.password = makenewhash;

    let updatcomp = await users.updateUser(
      data.password,
      data.client_fullName,
      data.client_email,
      data.client_phon,
      data.client_view,
      data.userID
    );

    let dbupdate = await mongoos
      .updateMany(
        { clientName: req.session.loginName },
        { $set: { clientName: data.client_fullName } },
        function (err, user) {
          if (err) throw err;
          res.status(201);
          req.session.view = data.client_view;
          req.session.loginName = data.client_fullName;
          req.session.userAllData = data;

          next();
        }
      )
      .catch((err) => console.log(err));
  } catch (e) {
    console.log("error while updating user");
    res.status(500);
    console.log(e);
  }
};

module.exports.update = update;
