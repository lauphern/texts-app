module.exports = (req, res) => {

  // res.json({
  //   body: req.body,
  //   query: req.query,
  //   cookies: req.cookies
  // })
  let check = "12345678" == req.query.pw
  res.json({check})
}