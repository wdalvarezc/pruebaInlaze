const express = require('express');
const cors =require('cors')
const app = express();
const morgan = require('morgan');
const router = require('./src/routes/index')
const errorHandler = require('./src/utils/middlewares/errorHandler')
const setHeaders = require('./src/utils/middlewares/setHeaders')
const { conn } = require('./src/models/index')
const { port } = require('./src/utils/config/index')

/// HEADERS
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(morgan('dev'));
app.use(setHeaders)

// enrutador hacia el index de src que es el que tiene las rutas y funciones del backend 
app.use('/api',router)

// control de errores en el backend

app.use(errorHandler)

conn.sync({force:false})
.then(()=>{
    console.log('ya hay conexion a la base de datos')
    app.listen(port,()=>{
        console.log(`escuchando en el puerto ${port}`);
    })
})
/// INICIO DE SERVIDOR BACKEND