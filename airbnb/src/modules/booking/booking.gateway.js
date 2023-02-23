const { query }  = require('../../utils/mysql');

const findAll = async () => {
    const sql = `SELECT * FROM bookings`;
    return await query(sql,[]);
}

const save = async (booking) => {
    if(!booking.description || !booking.rating || !booking.check_in || !booking.check_out || !booking.total_price || !booking.department_id || !booking.user_id) throw new Error('Missing requiered fields');
    const sql = `INSERT INTO bookings (description, rating, check_in, check_out, total_price, department_id, user_id) VALUES (?,?,?,?,?,?,?)`;
    const { insertId } = await query(sql, [booking.description, booking.rating, booking.check_in, booking.check_out, booking.total_price, booking.department_id, booking.user_id]);
    return { id: insertId, ...booking };
}

const update = async (booking, id) => {
    if(!id) throw Error('Missing requiered field');
    if(Number.isNaN(id)) throw Error('Wrong type of field');
    if(!booking.description || !booking.rating || !booking.check_in || !booking.check_out || !booking.total_price || !booking.department_id || !booking.user_id) throw new Error('Missing requiered fields');
    const sql = `UPDATE bookings SET description = ?, rating = ?, check_in = ?, check_out = ?, total_price = ?, department_id = ?, user_id = ? WHERE id = ?`;
    await query(sql, [booking.description, booking.rating, booking.check_in, booking.check_out, booking.total_price, booking.department_id, booking.user_id, id]);
    return { ...booking, id: id };
}

module.exports = { findAll, save, update }