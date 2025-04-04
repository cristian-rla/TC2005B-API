import { Request, Response, NextFunction } from "express";

const jwt = require('jsonwebtoken');

module.exports = (req, res, next /*req:Request, res:Response, next:NextFunction*/) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).json({ message: "Access Denied" });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; /*Changed to javascript since the type of request would have to be specified and I'm yet to understand this */
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid Token" });
  }
};