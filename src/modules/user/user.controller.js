const { Router } = require('express');
const { validateError } = require('../../utils/functions');
const { findAll, save, update } = require('./user.gateway');

const getAll = async (req, res = Response) => {
    try {
        const user = await findAll();
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        const message = validateError(error);
        res.status(400).json({ message });
    }
}

const insert = async (req, res = Response) => {
    try {
        const { email, password, uid, image_profile, id_person } = req.body;
        const user = await save({ email, password, uid, image_profile, id_person });
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        const message = validateError(error);
        res.status(400).json({ message });
    }
}

const actualize = async (req, res = Response) => {
    try {
        const { id } = req.params;
        const { email, password, uid, image_profile, id_person } = req.body;
        const user = await update({ email, password, uid, image_profile, id_person }, id);
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        const message = validateError(error);
        res.status(400).json({ message });
    }
}

const userRouter = Router();
userRouter.get('/', getAll);
userRouter.post('/', insert);
userRouter.put('/:id', actualize);

module.exports = { userRouter };