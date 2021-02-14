module.exports = function(app, db) {
    app.post('/api/makeWeightRecord', (req, res) => {

        const {authToken} = req.query;
        const {weight, date} = req.body;

        db.collection('usersData').findOne({authToken}, (err, result) => {
           if (err) {
               res.send({
                   code: 502,
                   error: 'Something gone wrong'
               })
           }

           if (result) {

               const preparedDate = new Date(date.substring(0,10)).toJSON()

               if (Object.values(result.weight).find(record => record.date === preparedDate)) {
                   res.send({
                       code: 200,
                       error: 'Record for this day already exists',
                   })

                   return;
               }

               const preparedWeightDataRecord = {
                   readableDate: date.substring(0,10),
                   date: preparedDate,
                   weight: Number(weight),
               }

               const preparedWeightData = [...result.weight, preparedWeightDataRecord].sort((a,b) => new Date(a.date) - new Date(b.date))

               db.collection('usersData').update({authToken},{$set :{weight: preparedWeightData}});
               res.send({
                   code: 200,
                   error: null,
                   body: {
                       weightData: preparedWeightData
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