const { Model, DataTypes} = require('sequelize');
class Deparment extends Model{}

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