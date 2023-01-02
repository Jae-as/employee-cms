const Employee = require('./employee');
const Department = require('./department');
const Role = require('./role');
const Orgchart = require('./orgchart');

Department.hasOne(Role, {
    foreignKey: 'department_id',
    onDelete: 'CASCADE'
});

Role.belongsTo(Department, {
    foreignKey: 'department_id',
});

Role.hasOne(Employee, {
    foreignKey: 'role_id',
    onDelete: 'CASCADE'
});

Employee.belongsTo(Role, {
    foreignKey: 'role_id',
    onDelete: 'CASCADE'
});

Employee.hasOne(Orgchart, {
    foreignKey: 'manager_id',
    onDelete: 'CASCADE'
});

Orgchart.belongsTo(Employee, {
    foreignKey: 'manager_id',
    onDelete: 'CASCADE'
});

module.exports = {Employee, Role, Department, Orgchart};