class PlaylistHandler {
    constructor(service,validator) {
        this._service = service;
        this._validator = validator;

        this.addPlaylistHandler = this.addPlaylistHandler.bind(this);
        this.getAllPlaylistsHandler = this.getAllPlaylistsHandler.bind(this);
        this.getPlaylistByIdHandler = this.getPlaylistByIdHandler.bind(this);
        this.addSongToPlaylistHandler = this.addSongToPlaylistHandler.bind(this);
        this.getSongInPlaylistHandler = this.getSongInPlaylistHandler.bind(this);
    }

    async addPlaylistHandler(request,h){
        try {
            this._validator.validatePlaylistPayload(request.payload);
            const {name} = request.payload;
            const playlistsId = await this._service.addPlaylist({name});
            const response = h.response({
                status: 'success',
                message: 'Playlist berhasil disimpan',
                data: {
                    playlistsId
                }
            })
            response.code(201);
            return response;
        }catch (e) {
            return h.response({
                status: 'fail',
                message: e.message
            });
        }
    }

    async getAllPlaylistsHandler(){
        const playlists = await this._service.getPlaylists();
        return {
            status: 'success',
            data: {
                playlists
            }
        }
    }

    async getPlaylistByIdHandler(request,h){
        try {
            const {id} = request.params;
            const playlist = await this._service.getPlaylistById(id);

            return {
                status: 'success',
                data: {
                    playlist
                }
            }
        }catch (e) {
            return h.response({
                status: 'fail',
                message: e.message
            });
        }
    }

    async addSongToPlaylistHandler(request,h){
        try {
            const {id} = request.params;
            const {song_id} = request.payload;
            await this._service.addSongToPlaylist(id, {song_id});

            return {
                status: 'success',
                message: 'Lagu berhasil ditambah ke playlist'
            }
        }catch (e) {
            return h.response({
                status: 'fail',
                message: e.message
            });
        }
    }

    async getSongInPlaylistHandler(request,h){
        try {
            const {id} = request.params;
            const playlist = await this._service.getSongInPlaylist(id);

            return {
                status: 'success',
                data: {
                    playlist
                }
            }
        }catch (e) {
            return h.response({
                status: 'fail',
                message: e.message
            });
        }
    }
}

module.exports = PlaylistHandler;