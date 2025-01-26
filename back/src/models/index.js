// este index lleva las relaciones de las tablas y la connexion a la base de datos inicializando sequelize
const { Sequelize } = require('sequelize')
const { dbUser, dbName, dbPassword,host } = require('../utils/config/index')
const ProyectFactory = require('./Proyect');
const TaskFactory = require('./Task');
const UserFactory = require('./User');
const ComentFactory = require('./Comment');
const TeamFactory = require('./Team');
const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  dialect: 'postgres',
  host: host,
  logging: false,
});

const Proyects = ProyectFactory(sequelize);
const Tasks = TaskFactory(sequelize);
const Users = UserFactory(sequelize);
const Comments = ComentFactory(sequelize);
const Teams = TeamFactory(sequelize);

//usuarios  <=> Equipos M:N
Teams.belongsToMany(Users, {through: 'TeamUsers'}); 
Users.belongsToMany(Teams, {through: 'TeamUsers'}); 

//Equipos <=> Proyectos M:N
Proyects.belongsToMany(Teams, {through: 'ProyectTeams'});

//Proyectos <=> Tareas 1:M
Proyects.hasMany(Tasks);
Tasks.belongsTo(Proyects); 

//Tareas <=> Comentarios 1:M
Tasks.hasMany(Comments);
Comments.belongsTo(Tasks);

//Usuarios <=> Tareas 1:M
Users.hasMany(Tasks);
Tasks.belongsTo(Users);

//Usuarios <=> Comentarios 1:M
Users.hasMany(Comments); //proyecto tiene muchos usuarios
Comments.belongsTo(Users); // una usuario tiene muchos proyectos

module.exports = {
  conn: sequelize,
  Proyects,
  Tasks,
  Teams,
  Users,
  Comments
}