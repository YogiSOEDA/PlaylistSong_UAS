/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('playlist_songs',{
        id : {
            type : 'VARCHAR(50)',
            primaryKey : true
        },
        playlist_id : {
            type: 'VARCHAR(50)',
            reference : 'playlists',
            onDelete: 'cascade',
            onUpdate: 'cascade',
            notNull: true
        },
        song_id : {
            type: 'VARCHAR(50)',
            reference: 'songs',
            onDelete: 'cascade',
            onUpdate: 'cascade',
            notNull: true
        },
        created_at: {
            type: 'TEXT',
            notNull: true
        },
        updated_at: {
            type: 'TEXT',
            notNull: true
        }
    });
};

exports.down = pgm => {
    pgm.dropTable('playlist_songs');
};
