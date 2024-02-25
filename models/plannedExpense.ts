import { DataTypes } from 'sequelize'
import type { Sequelize } from 'sequelize'
import { models } from '@utils'

export default function (sequelize: Sequelize) {
    return sequelize.define(
        'PlannedExpense',
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
            plannedBudgetId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: models.PlannedBudget,
                    key: 'id',
                }
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            }
        }
    )
}
