import HttpError from 'http-errors';

export const errorHandler = (error, req, res, next) => {
  const { status = 500, message = 'Something went wrong' } = error;

  if (error instanceof HttpError) {
    res.status(error.status).json({
      status: error.status,
      message: error.name,
      data: error,
    });
    return;
  }

  res.status(status).json({
    status: status,
    message: message,
    data: error.message,
  });
};
