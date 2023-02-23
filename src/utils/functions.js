const bcrypt = require('bcryptjs')

const validateError = (error) => {
  switch (error.message) {
    case 'Wrong type of field':
      return 'Review request fields';
    case 'Missing requiered fields':
      return 'Validate fields';
    case 'Missing requiered field':
        return 'Validate field';
    case 'Inexistent role':
      return 'Role not registered';
    case 'Nothing found':
      return 'No data found';
    case 'Password mismatch':
      return 'Credentials mismatch';
    case 'User disabled':
      return 'User disabled';
    default:
      return 'Review request';
  }
};

const hashPassword = async(password) => {
  const salt = await bcrypt.genSalt(15);
  return await bcrypt.hash(password, salt);
} 

const validatePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
}

module.exports = { validateError, hashPassword, validatePassword };

