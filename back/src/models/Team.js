// definicion de modelo de Sistemas
const { DataTypes } = require('sequelize')
module.exports = function (sequelize) {
    return sequelize.define('Team', {
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
    }, { timestamps: false, })
}