const { bookingRouter } = require('./booking/booking.controller');
const { departmentRouter } = require('./department/department.controller');
const { personRouter } = require('./person/person.controller');
const { userRouter } = require('./user/user.controller');
const { authRouter } = require('./auth/auth.controller');

module.exports = {
    bookingRouter,
    departmentRouter,
    personRouter,
    userRouter,
    authRouter
}