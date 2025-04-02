import { Request, Response, NextFunction } from "express";

const jwt = require('jsonwebtoken');

module.exports = (req, res, next /*req:Request, res:Response, next:NextFunction*/) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).json({ message: "Access Denied" });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid Token" });
  }
};