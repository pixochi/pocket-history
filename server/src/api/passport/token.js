import jwt from 'jsonwebtoken';

import config from '../../config.json';


export const createToken = (userId) => {
  return jwt.sign({
    id: userId
  }, config.tokenSecret,
  {
    expiresIn: '25h'//hours
  });
};

export const generateToken = (req, res, next) => {
  req.token = createToken(req.user.id);
  next();
};

export const sendToken = (req, res) => {
  res.setHeader('x-auth-token', req.token);
  res.status(200).send(req.user);
};