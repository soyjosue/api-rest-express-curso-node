const debug = require('debug')('app:inicio');
// const dbDebug = require('debug')('app:db');
const usuarios = require('./routes/usuarios');
const express = require('express');
const config = require('config');
// const logger = require('./logger');
const morgan = require('morgan');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
app.use('/api/usuarios', usuarios);

app.get('/', (req,res) => {
    res.send('Hola Mundo desde Express.');
}); 

//Configuración de entornos
console.log('Aplicación: ' + config.get('nombre'));
console.log('BD server: ' + config.get('configDB.host'));

//Uso de middleware de tercero - Morgan
if(app.get('env') === 'development'){ 
    app.use(morgan('tiny')); 
    //console.log('Morgan habilitado');
    debug('Morgan esta habilitado.');
}

// Trabajos con la base de datos
debug('Conectando con la bd...');

// app.use(logger);
// app.use(function(req, res, next) {
//     console.log('Autenticando...');
//     next();
// });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Escuchando en el puerto ${PORT}...`);
});
