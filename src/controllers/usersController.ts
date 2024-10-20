import { Request, Response } from 'express';
import { v4 as uuidv4, validate as isUuid } from 'uuid';
import { users } from '../models/user';

export const getUsers = (response: Response) => {
    response.status(200).json(users);
};

export const getUserById = (request: Request, response: Response) => {
  const userId = request.params.userId;
  if (!isUuid(userId)) {
    return response.status(400).json({ message: 'Invalid UUID' });
  }
  const user = users.find(user => user.id === userId);
  if (!user) {
    return response.status(404).json({ message: 'User not found' });
  }
  response.status(200).json(user);
};

export const createUser = (request: Request, response: Response) => {
  const { username, age, hobbies } = request.body;
  if (!username || !age || !Array.isArray(hobbies)) {
    return response.status(400).json({ message: 'Invalid user data' });
  }
  const newUser = { id: uuidv4(), username, age, hobbies };
  users.push(newUser);
  response.status(201).json(newUser);
};

export const updateUser = (request: Request, response: Response) => {
  const userId = request.params.userId;
  if (!isUuid(userId)) {
    return response.status(400).json({ message: 'Invalid UUID' });
  }
  const userIndex = users.findIndex(user => user.id === userId);
  if (userIndex === -1) {
    return response.status(404).json({ message: 'User not found' });
  }
  const { username, age, hobbies } = request.body;
  if (!username || !age || !Array.isArray(hobbies)) {
    return response.status(400).json({ message: 'Invalid user data' });
  }
  users[userIndex] = { id: userId, username, age, hobbies };
  response.status(200).json(users[userIndex]);
};

export const deleteUser = (request: Request, response: Response) => {
  const userId = request.params.userId;
  if (!isUuid(userId)) {
    return response.status(400).json({ message: 'Invalid UUID' });
  }
  const userIndex = users.findIndex(user => user.id === userId);
  if (userIndex === -1) {
    return response.status(404).json({ message: 'User not found' });
  }
  users.splice(userIndex, 1);
  response.status(204).send();
};
