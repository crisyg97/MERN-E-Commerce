const app = require('./app');


app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'), 'in', process.env.NODE_ENV, 'mode' );
});