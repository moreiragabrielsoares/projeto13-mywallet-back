import { db, objectId } from '../db/mongo.js';

async function validateUser(req, res, next) {
  const { authorization } = req.headers;

  const token = authorization?.replace('Bearer ', '');
  
  const session = await db.collection('sessions').findOne({ token });

  if (!session) {
    res.status(401).send('É necessário fazer login!');
    return;
  }

  res.locals.session = session;

  next();
}

export default validateUser;