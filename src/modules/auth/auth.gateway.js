const { query } = require('../../utils/mysql')
const { generateToken } = require('../../config/jwt')
const { validatePassword } = require('../../utils/functions')

const Login = async ( user ) => {
    const { email, password } = user;
    if (!email || !password) throw Error("Missing requiered fields")
    const sql = `SELECT * FROM users WHERE email = ?`;
    const existUser = await query(sql, [email]);
    if(await validatePassword(password, existUser[0].password)) return generateToken({
        id:existUser[0].id,
        email:email,
        isLogged:true
    });
    throw Error('Password mismatch')
};

module.exports = {
    Login
}