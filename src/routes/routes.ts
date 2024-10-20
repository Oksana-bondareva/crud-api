import { getUsers, getUserById, createUser, updateUser, deleteUser } from '../controllers/usersController';
import { Request, Response, Router } from "express";

const userRouter = Router();

userRouter.get("/", (request: Request, response: Response) => {
  getUsers(request, response);
});

userRouter.get("/:id", (request: Request, response: Response) => {
  getUserById(request, response);
});

userRouter.post("/", (request: Request, response: Response) => {
  createUser(request, response);
});

userRouter.put("/:id", (request: Request, response: Response) => {
  updateUser(request, response);
});

userRouter.delete("/:id", (request: Request, response: Response) => {
  deleteUser(request, response);
});

export default userRouter;