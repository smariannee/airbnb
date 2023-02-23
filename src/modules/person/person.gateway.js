const { query }  = require('../../utils/mysql');

const findAll = async () => {
    const sql = `SELECT * FROM persons`;
    return await query(sql,[]);
}

const save = async (person) => {
    if(!person.fullname || !person.birthday) throw new Error('Missing requiered fields');
    const sql = `INSERT INTO persons (fullname, birthday) VALUES (?,?)`;
    const { insertId } = await query(sql, [person.fullname, person.birthday]);
    return { ...person, id: insertId };
}

const update = async (person, id) => {
    if(!id) throw Error('Missing requiered field');
    if(Number.isNaN(id)) throw Error('Wrong type of field');
    if(!person.fullname || !person.birthday) throw new Error('Missing requiered fields');
    const sql = `UPDATE persons SET fullname = ?, birthday = ? WHERE id = ?`;
    await query(sql, [person.fullname, person.birthday, id]);
    return { ...person, id: id };
}

module.exports = { findAll, save, update }