const { Model, DataTypes} = require('sequelize');
class Employee extends Model{}

// CREATE TABLE employees (
//     employee_id INT(5) NOT NULL AUTO_INCREMENT PRIMARY KEY,
//     employee_firstname VARCHAR(50) NOT NULL,
//     employee_lastname VARCHAR(50) NOT NULL,
//     role_id INT(3),
//     FOREIGN KEY (role_id) REFERENCES roles(role_id),
//     manager_id INT(5),
//     FOREIGN KEY (manager_id) REFERENCES orgchart(employee_id)

// );

Employee.init(
    {
        employee_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        employee_firstname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        employee_lastname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'role',
                key: 'role_id'
            }
        },
        manager_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'orgchart',
                key: 'manager_id'
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
    
module.exports = Employee;