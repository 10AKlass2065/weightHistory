module.exports = function(app, db) {
    app.get('/api/getProfileInfo', (req, res) => {

        const {authToken} = req.query;

        db.collection('usersData').findOne({authToken}, (err, result) => {
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
                        weightData: result.weight,
                    }
                })
            } else {
                res.send({
                    code: 404,
                    error: 'User not found',
                })
            }
        })
    });
};