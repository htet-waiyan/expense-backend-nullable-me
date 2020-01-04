import jwt from 'jsonwebtoken';

export const jwtAuthorize = (req, res, next) => {
  try {
    const bearerToken = req.get('authorization');
    const token = bearerToken.substring(7);
    if (!token) return res.sendStatus(401);
    const payload = jwt.verify(token, process.env.SECRET);
    req.user = payload.user;
    return next();
  } catch (error) {
    console.log('Error ', error);
    return res.sendStatus(401);
  }
};

export const queryMongo = (req, res, next) => {}