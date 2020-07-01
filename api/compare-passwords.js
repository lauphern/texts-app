module.exports = (req, res) => {
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  let doPasswordsMatch = process.env.PASSWORD == req.query.pw;
  res.json({ doPasswordsMatch });
};
