import { DataTypes } from 'sequelize'
import type { Sequelize } from 'sequelize'
import { models } from '@utils'

export default function (sequelize: Sequelize) {
    return sequelize.define(
        'PlannedExpense',
        {
            amount: {
                type: DataTypes.INTEGER,
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
