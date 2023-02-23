const { Router } = require('express');
const { validateError } = require('../../utils/functions');
const { findAll, update } = require('./department.gateway');

const getAll = async (req, res = Response) => {
    try {
        const department = await findAll();
        res.status(200).json(department);
    } catch (error) {
        console.log(error);
        const message = validateError(error);
        res.status(400).json({ message });
    }
}

const actualize = async (req, res = Response) => {
    try {
        const { id } = req.params;
        const { rating, total_rating } = req.body;
        const department = await update({ rating, total_rating }, id);
        res.status(200).json(department);
    } catch (error) {
        console.log(error);
        const message = validateError(error);
        res.status(400).json({ message });
    }
}

const departmentRouter = Router();
departmentRouter.get('/', getAll);
departmentRouter.put('/:id', actualize);

module.exports = { departmentRouter };