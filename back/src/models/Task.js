// definicion de modelo de contenido
const { DataTypes } = require('sequelize')
module.exports = function (sequelize) {
    return sequelize.define('Task', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        titulo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        descripcion: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        estado: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        fecha_limite: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
    }, { timestamps: false, })
}