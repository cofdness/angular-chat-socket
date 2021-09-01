export const success = (res, entity) => {
  if (entity) {
   res.status(200).json(entity)
  }
  return null
}

export const notSuccess = (res, err) => {
  res.status(404).json(err)
  return null
}
