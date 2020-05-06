module.exports = (sequelize, DataTypes) => {
    const Review = sequelize.define('review', {
        filmTitle: {
            type: DataTypes.STRING,
            allowNull: false
        },
        year: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        director: {
            type: DataTypes.STRING,
            allowNull: false
        },
        overallThoughts: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        rating: {
            type: DataTypes.STRING,
            allowNull: false
        },
        owner: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    })
    return Review;
}