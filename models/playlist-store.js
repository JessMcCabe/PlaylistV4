'use strict';

const _ = require('lodash');
const JsonStore = require('./json-store');

const playlistStore = {

  store: new JsonStore('./models/playlist-store.json', { playlistCollection: [] }),
  collection: 'playlistCollection',

  getAllPlaylists() {
    return this.store.findAll(this.collection);
  },

  getPlaylist(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },

  addPlaylist(playlist) {
    this.store.add(this.collection, playlist);
    this.store.save();
  },

  removePlaylist(id) {
    const playlist = this.getPlaylist(id);
    this.store.remove(this.collection, playlist);
    this.store.save();
  },

  removeAllPlaylists() {
    this.store.removeAll(this.collection);
    this.store.save();
  },

 addSong(id, song) {
    const playlist = this.getPlaylist(id);
    playlist.songs.push(song);

    let duration = 0;
    for (let i = 0; i < playlist.songs.length; i++) {
      duration += playlist.songs[i].duration;
    }

    playlist.duration = duration;
    this.store.save();
  },

  removeSong(id, songId) {
    const playlist = this.getPlaylist(id);
    const songs = playlist.songs;
    _.remove(songs, { id: songId});
    this.store.save();
  },
   getUserPlaylists(userid) {
    return this.store.findBy(this.collection, { userid: userid });
  },
};

module.exports = playlistStore;