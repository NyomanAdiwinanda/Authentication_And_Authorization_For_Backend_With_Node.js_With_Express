module.exports = (err, req, res, next) => {
  if (err.name === 'SequelizeUniqueConstaintError' || err.name === 'SequelizeValidationError') {
    const errorValidations = err.errors.map(element => element.message)
    res.status(400).json({ errors: errorValidations})
  } else if (err.name === 'CustomError') {
    res.status(err.status).json({errors: err.msg})
  } else {
    res.status(500).json({ errors: 'Internal Server Error'})
  }
}