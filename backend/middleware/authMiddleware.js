const jwt = require('jsonwebtoken');
const User = require('../models/User');
//protect
const identifyUser = async (req, res, next) => {
  let token;
  token = req.cookies.jwt;
  
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select('-password');
      
      next();
    } catch (error) {
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  } else {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
};

const adminPermission = (req, res, next) => { 
  if (req.user.role === 'admin') {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized');
  }
};

const classListPermission = async (req, res, next) => {
  if (req.user.role === 'admin' || req.user.role === 'teacher' && req.user.subject[0] == req.params.subjectId) {
    next()
  } else {
    res.status(401);
    throw new Error('Not authorized');
  }
};

const studentCoursesPermission = async (req, res, next) => {
  if (req.user.role === 'admin' || req.user._id == req.query.studentid) {
    next()
  } else {
    res.status(401);
    throw new Error('Not authorized');
  }
};

const studentPermission = async (req, res, next) => {
  if (req.user._id == req.params.studentId) {
    next()
  } else {
    res.status(401);
    throw new Error('Not authorized');
  }
};

const teacherPermission = async (req, res, next) => {
  if (req.user.role === 'teacher' && req.user.subject[0] == req.body.subjectId || req.user.subject[0] == req.body.subjectId[0]) {
    next()
  } else {
    res.status(401);
    throw new Error('Not authorized');
  }
};

module.exports = {identifyUser, adminPermission, classListPermission, studentCoursesPermission, studentPermission, teacherPermission}