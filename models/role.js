const { Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Role extends Model{}

// CREATE TABLE roles (
//     role_id INT(3) NOT NULL AUTO_INCREMENT PRIMARY KEY,
//     title VARCHAR(50) NOT NULL,
//     salary DECIMAL NOT NULL,
//     department_id INT(4),
//     FOREIGN KEY (department_id) REFERENCES department(department_id)
// );

Role.init(
    {
        role_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        salary: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        department_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'department',
                key: 'department_id'
            }
        },
        department_name: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'department',
                key: 'department_name'
            }
        }
    },{    
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'department'
    }
)


module.exports = Role;