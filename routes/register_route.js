const md5 = require('md5')

module.exports = function(app, db) {
    app.post('/api/register', (req, res) => {

        const authToken = md5(new Date().toISOString())

        const newUser = {
            email: req.body.email,
            password: req.body.password,
            authToken: authToken,
            weight: [],
        }

        db.collection('usersData').findOne({email: req.body.email}, (err, result) => {
            if (result) {
                res.send({
                    code: 200,
                    error: 'Email already exists',
                })
            } else {
                db.collection('usersData').insert(newUser, (err, results) => {
                    if (err) {
                        res.send({
                            code: 502,
                            error: 'Something gone wrong',
                        })
                    } else {
                        res.send({
                            code: 200,
                            error: null,
                            body: {
                                authToken,
                            }
                        })
                    }
                })
            }
        })
    });
};