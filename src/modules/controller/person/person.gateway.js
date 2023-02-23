const { query }  = require('../../../utils/mysql');

const save = async (person) => {
    if (!person.fullname || !person.birthday) throw Error("Missing required fields");
    const sql = `INSERT INTO persons (fullname, birthday) VALUES (?,?)`;
    const { insertId } = await query(sql, [person.fullname, person.birthday]);
    return {...person, id: insertId};
}

module.exports = {
    save
}