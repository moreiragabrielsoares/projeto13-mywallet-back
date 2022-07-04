import { db , objectId } from '../db/mongo.js';
import joi from 'joi';
import dayjs from 'dayjs'




const registerSchema = joi.object({
    value: joi.string().required(),
    description: joi.string().required(),
});



export async function getRegisters(req, res) {

    const session = res.locals.session;

    const registers = await db
    .collection('registers')
    .find({ userId: new objectId(session.userId) })
    .toArray();

    let netResult = 0;
    let typeNetResult = "";

    for (let i = 0 ; i < registers.length ; i ++) {
        let aux = parseFloat(registers[i].value.replace(",","."));
        if (registers[i].type === "expense") {
            netResult -= aux;
        } else {
            netResult += aux;
        }
    }

    if (netResult >=0) {
        typeNetResult = "positive";
    } else {
        typeNetResult = "negative";
    }

    netResult = (Math.round(netResult * 100) / 100).toFixed(2);
    netResult = netResult.replace(".", ",");

    const response = {registers: registers , netResult: netResult , typeNetResult: typeNetResult};

    res.send(response);

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

    try {

        const session = await db.collection('sessions').findOne({ token });

        if (!session) {
            res.sendStatus(401);
            return;
        }

        const date = dayjs(Date.now()).format('DD/MM');

        await db.collection('registers').insertOne({ ...register, userId: session.userId, type: "income", date: date });
        res.status(201).send('Registro criado com sucesso');
        return;

    } catch (error) {

        res.sendStatus(500);
    }

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

    try {

        const session = await db.collection('sessions').findOne({ token });

        if (!session) {
            res.sendStatus(401);
            return;
        }

        const date = dayjs(Date.now()).format('DD/MM');

        await db.collection('registers').insertOne({ ...register, userId: session.userId, type: "expense", date: date });
        res.status(201).send('Registro criado com sucesso');
        return;

    } catch (error) {

        res.sendStatus(500);
    }

};