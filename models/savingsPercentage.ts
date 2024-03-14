import { DataTypes } from 'sequelize'
import type { Sequelize } from 'sequelize'

export default function (sequelize: Sequelize) {
    return sequelize.define(
        'SavingsPercentage',
        {
            date: {
                type: DataTypes.DATEONLY,
                allowNull: false,
            },
            percent: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            }
        }
    )
}
