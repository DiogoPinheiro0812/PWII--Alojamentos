// routes/users.js
const userRouter = require("express").Router();
const userController = require("../controllers/userController");

userRouter.post("/", userController.register);
userRouter.post("/login", userController.login);
userRouter.get("/me", userController.profile);
userRouter.get("/:id", userController.getById);
userRouter.put("/:id", userController.update);
userRouter.delete("/:id", userController.delete);

module.exports = userRouter;