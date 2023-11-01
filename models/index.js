const Comments = require('./comments');
const Posts = require('./posts');
const Users = require('./users');

Users.hasMany(Posts, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Users.hasMany(Comments, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Posts.hasMany(Comments, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE'
});

Comments.belongsTo(Users, {
    foreignKey: 'user_id',
});

Comments.belongsTo(Comments, {
    foreignKey: 'post_id',
});

module.exports = { Users, Posts, Comments };