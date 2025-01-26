// definicion de modelo de temas 
const { DataTypes } = require('sequelize')
module.exports = function (sequelize) {
    return sequelize.define('Comment', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        contenido: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        fechaCreacion: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },

    }, {
        timestamps: false,
    })
}