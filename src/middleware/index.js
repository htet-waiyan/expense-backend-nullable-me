import jwt from 'jsonwebtoken';

export const jwtAuthorize = (req, res, next) => {
  try {
    const bearerToken = req.get('authorization');
    const token = bearerToken.substring(7);
    console.log('Token ', token);
    if (!token) return res.sendStatus(401);
    const payload = jwt.verify(token, process.env.SECRET);
    console.log('Jwt payload ', payload);
    req.user = payload.user;
    return next();
  } catch (error) {
    return res.sendStatus(401);
  }
};

export const queryMongo = (req, res, next) => {}