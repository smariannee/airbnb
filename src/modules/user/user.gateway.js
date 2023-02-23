const { query }  = require('../../utils/mysql');
const { hashPassword } = require('../../utils/functions');

const findAll = async () => {
    const sql = `SELECT * FROM users`;
    return await query(sql,[]);
}

const save = async (user) => {
    if(!user.email || !user.password || !user.uid || !user.image_profile || !user.id_person) throw new Error('Missing requiered fields');
    const sql = `INSERT INTO users (email, password, uid, image_profile, id_person) VALUES (?,?,?,?,?)`;
    const hashedPassword = await hashPassword(user.password);
    const { insertId } = await query(sql, [user.email, hashedPassword, user.uid, user.image_profile, user.id_person]);
    return { ...user, id: insertId };
}

const update = async (user, id) => {
    if(!id) throw Error('Missing requiered field');
    if(Number.isNaN(id)) throw Error('Wrong type of field');
    if(!user.email || !user.password || !user.uid || !user.image_profile || !user.id_person) throw new Error('Missing requiered fields');
    const sql = `UPDATE users SET email = ?, password = ?, uid = ?, image_profile = ?, id_person = ? WHERE id = ?`;
    const hashedPassword = await hashPassword(user.password);
    await query(sql, [user.email, hashedPassword, user.uid, user.image_profile, user.id_person, id]);
    return { ...user, id: id };
}

module.exports = { findAll, save, update }