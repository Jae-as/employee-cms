const { Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Orgchart extends Model{}

// CREATE TABLE orgchart (
//     managerflag BOOLEAN,
//     manager_firstname VARCHAR(50) NOT NULL,
//     manager_lastname VARCHAR(50) NOT NULL,
//     employee_id INT(5),
//     FOREIGN KEY (employee_id) REFERENCES employees(employee_id)
// );

Orgchart.init (
    {
        managerflag: {
            type: DataTypes.BOOLEAN,

        },
        manager_firstname: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'employee',
                key: 'employee_firstname'
            }
        },
        manager_lasstname: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'employee',
                key: 'employee_lastname'
            }
        },
        employee_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'employee',
                key: 'employee_id'
            }
        }
    
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'employee'
    });

    module.exports = Orgchart;