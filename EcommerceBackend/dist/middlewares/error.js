export const errorMiddleware = ((err, req, res, next) => {
    if (err.name === "CastError")
        err.message = "Invalid ID";
    err.message || (err.message = "Internal Server Error");
    err.stateCode || (err.stateCode = 500);
    return res.status(err.stateCode).json({
        success: false,
        message: err.message,
    });
});
export const TryCatch = (func) => (req, res, next) => {
    return Promise.resolve(func(req, res, next)).catch(next);
};
