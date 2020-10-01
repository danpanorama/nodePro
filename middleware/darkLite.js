module.exports = async (req, res, next) => {
  try {
    if (req.session.view && req.session.view == "D") {
      req.session.view = "L";
      next();
    } else {
      req.session.view = "D";
      next();
    }
  } catch (e) {
    console.log(e);
  }
};
