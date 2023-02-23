const { query }  = require('../../utils/mysql');

const findAll = async () => {
    const sql = `SELECT * FROM departments`;
    return await query(sql,[]);
}

const update = async (department, id) => {
    if(!id) throw Error('Missing requiered field');
    if(Number.isNaN(id)) throw Error('Wrong type of field');
    if(!department.rating || !department.total_rating) throw new Error('Missing requiered fields');
    const sql = `UPDATE departments SET rating = ?, total_rating = ? WHERE id = ?`;
    await query(sql, [department.rating, department.total_rating, id]);
    return { ...department, id: id };
}

module.exports = {
    findAll,
    update
}