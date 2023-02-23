const { query }  = require('../../../utils/mysql');

const save = async (user) => {
    if (!user.email || !user.password || !user.uid || !user.image_profile || !user.id_person) throw Error("Missing required fields");
    const sql = `INSERT INTO users (email, password, uid, image_profile, id_person) VALUES (?,?,?,?,?)`;
    const { insertId } = await query(sql, [user.email, user.password, user.uid, user.image_profile, user.id_person]);
    return {...user, id: insertId};
}

module.exports = {
    save
}