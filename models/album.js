module.exports = (sequelize, DataTypes) => {
    const Album = sequelize.define('album', {
        albumTitle: {
            type: DataTypes.STRING,
            allowNull: false
        },
        artist: {
            type: DataTypes.STRING,
            allowNull: false
        },
        numberOfSongs: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        songs: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
    return Album
}