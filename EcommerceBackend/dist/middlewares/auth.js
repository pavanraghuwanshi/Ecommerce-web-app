import { User } from "../models/user.js";
import ErrorHandler from "../utils/utility-class.js";
import { TryCatch } from "./error.js";
// middleware to make sure only admin is allowed
export const adminOnly = TryCatch(async (req, res, next) => {
    const { id } = req.query;
    if (!id)
        return next(new ErrorHandler("admin please login first", 401));
    const user = await User.findById(id);
    if (!user)
        return next(new ErrorHandler("please enter correct ID of admin", 401));
    if (user.role !== "admin")
        return next(new ErrorHandler("you are note a admin", 403));
    next();
});
