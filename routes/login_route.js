const md5 = require('md5')

module.exports = function(app, db) {
    app.post('/api/login', (req, res) => {

        const {email, password} = req.body;

        db.collection('usersData').findOne({email, password}, (err, result) => {
            if (err) {
                res.send({
                    code: 502,
                    error: 'Something gone wrong'
                })
            }

            if (result) {
                res.send({
                    code: 200,
                    error: null,
                    body: {
                        authToken: result.authToken,
                        weightData: result.weight,
                    }
                })
            } else {
                res.send({
                    code: 200,
                    error: 'Email or password is incorrect',
                })
            }
        })
    });
};