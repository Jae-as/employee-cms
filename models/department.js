const { Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');
class Deparment extends Model{}

// CREATE TABLE departments (
//     department_id INT(4) NOT NULL AUTO_INCREMENT PRIMARY KEY,
//     department_name VARCHAR(50) NOT NULL
// );


Deparment.init(
{
    department_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    department_name: {
        type: DataTypes.STRING,
        allowNull: false
    }

},
{
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'department'
});

module.exports = Deparment;