import { DataTypes } from 'sequelize'
import type { Sequelize } from 'sequelize'

export default function (sequelize: Sequelize) {
    return sequelize.define(
        'PlannedBudget',
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
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
