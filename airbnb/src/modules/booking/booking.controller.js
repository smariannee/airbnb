const { Router } = require('express');
const { validateError } = require('../../utils/functions');
const { findAll, save, update } = require('./booking.gateway');

const getAll = async (req, res = Response) => {
    try {
        const booking = await findAll();
        res.status(200).json(booking);
    } catch (error) {
        console.log(error);
        const message = validateError(error);
        res.status(400).json({ message });
    }
}

const insert = async (req, res = Response) => {
    try {
        const { description, rating, check_in, check_out, total_price, department_id, user_id } = req.body;
        const booking = await save({ description, rating, check_in, check_out, total_price, department_id, user_id });
        res.status(200).json(booking);
    } catch (error) {
        console.log(error);
        const message = validateError(error);
        res.status(400).json({ message });
    }
}

const actualize = async (req, res = Response) => {
    try {
        const { id } = req.params;
        const { description, rating, check_in, check_out, total_price, department_id, user_id } = req.body;
        const booking = await update({ description, rating, check_in, check_out, total_price, department_id, user_id }, id);
        res.status(200).json(booking);
    } catch (error) {
        console.log(error);
        const message = validateError(error);
        res.status(400).json({ message });
    }
}

const bookingRouter = Router();
bookingRouter.get('/', getAll);
bookingRouter.post('/', insert);
bookingRouter.put('/:id', actualize);

module.exports = { bookingRouter };