const { Model, DataTypes} = require('sequelize');
class Orgchart extends Model{}

// CREATE TABLE orgchart (
//     managerflag BOOLEAN,
//     manager_firstname VARCHAR(50) NOT NULL,
//     manager_lastname VARCHAR(50) NOT NULL,
//     employee_id INT(5),
//     FOREIGN KEY (employee_id) REFERENCES employees(employee_id)
// );

// Orgchart.init{
//     {

//     },{
//         sequelize,
//         timestamps: false,
//         freezeTableName: true,
//         underscored: true,
//         modelName: 'orgchart'
//     }
// }