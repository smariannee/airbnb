const { Router } = require('express');
const { validateError } = require('../../utils/functions');
const { findAll, save, update } = require('./person.gateway');

const getAll = async (req, res = Response) => {
    try {
        const person = await findAll();
        res.status(200).json(person);
    } catch (error) {
        console.log(error);
        const message = validateError(error);
        res.status(400).json({ message });
    }
}

const insert = async (req, res = Response) => {
    try {
        const { fullname, birthday } = req.body;
        const person = await save({ fullname, birthday });
        res.status(200).json(person);
    } catch (error) {
        console.log(error);
        const message = validateError(error);
        res.status(400).json({ message });
    }
}

const actualize = async (req, res = Response) => {
    try {
        const { id } = req.params;
        const { fullname, birthday } = req.body;
        const person = await update({ fullname, birthday }, id);
        res.status(200).json(person);
    } catch (error) {
        console.log(error);
        const message = validateError(error);
        res.status(400).json({ message });
    }
}

const personRouter = Router();
personRouter.get('/', getAll);
personRouter.post('/', insert);
personRouter.put('/:id', actualize);

module.exports = { personRouter };