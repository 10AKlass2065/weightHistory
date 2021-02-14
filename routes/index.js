const register = require('./register_route');
const login = require('./login_route');
const getProfileInfo = require('./get_profile_info_route');
const makeWeightRecord = require("./make_weight_record");

module.exports = function(app, db) {
    register(app, db);
    login(app, db);
    getProfileInfo(app, db);
    makeWeightRecord(app, db);
};