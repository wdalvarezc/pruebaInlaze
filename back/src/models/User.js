// definicion de modelo de temas 
const { DataTypes } = require('sequelize')
module.exports = function (sequelize) {
    return sequelize.define('User', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        admin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },

    }, {
        timestamps: false,
    })
}