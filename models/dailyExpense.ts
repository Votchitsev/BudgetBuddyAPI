import { DataTypes } from 'sequelize'
import type { Sequelize } from 'sequelize'

export default function (sequelizeInstance: Sequelize) {
    return sequelizeInstance.define(
        'DailyExpense',
        {
            amount: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            date: {
                type: DataTypes.DATEONLY,
                allowNull: false,
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            }
        }
    )
}
