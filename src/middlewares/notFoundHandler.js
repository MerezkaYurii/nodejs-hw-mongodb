export const notFoundHandler = (req, res) => {
  res.status(404).json({
    status: 404,
    massege: 'Route not found',
  });
};
