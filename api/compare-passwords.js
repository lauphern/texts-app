module.exports = (req, res) => {
  let doPasswordsMatch = process.env.PASSWORD == req.query.pw
  res.json({ doPasswordsMatch })
}