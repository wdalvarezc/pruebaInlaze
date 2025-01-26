/// traer las rutas de backend declaradas en src para tener modularizado el backend 
const {Router} = require('express');
const router = Router();
const Taskroutes = require('./Task');
const Commentsroutes = require('./Comment');
const Teamroutes = require('./Team');
const Userroutes = require('./User');
const Proyectroutes = require('./Proyect');

router.use('/proyectos',Proyectroutes);
router.use('/tareas',Taskroutes);
router.use('/usuarios',Userroutes);
router.use('/equipos',Teamroutes);
router.use('/comentarios',Commentsroutes);


module.exports = router;