import { db } from '../db/mongo.js';
import joi from 'joi';
import dayjs from 'dayjs'




const registerSchema = joi.object({
    value: joi.number().required(),
    description: joi.string().required(),
});



export async function getRegisters(req, res) {

    const session = res.locals.session;

    const registers = await db
    .collection('registers')
    .find({ userId: new objectId(session.userId) })
    .toArray();

    res.send(posts);

};

export async function registerIncome(req, res) {

    const register = req.body;
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');

    const { error } = registerSchema.validate(register);

    if (error) {
        res.sendStatus(422);
        return;
    }

    const session = await db.collection('sessions').findOne({ token });

    if (!session) {
        res.sendStatus(401);
        return;
    }

    const date = dayjs(Date.now()).format('DD/MM');

    await db.collection('registers').insertOne({ ...register, userId: session.userId, type: "income", date: date });
    res.status(201).send('Registro criado com sucesso');


};

export async function registerExpense(req, res) {

    const register = req.body;
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');

    const { error } = registerSchema.validate(register);

    if (error) {
        res.sendStatus(422);
        return;
    }

    const session = await db.collection('sessions').findOne({ token });

    if (!session) {
        res.sendStatus(401);
        return;
    }

    const date = dayjs(Date.now()).format('DD/MM');

    await db.collection('registers').insertOne({ ...register, userId: session.userId, type: "expense", date: date });
    res.status(201).send('Registro criado com sucesso');

};