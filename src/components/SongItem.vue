<template>
  <li
    class="flex justify-between items-center p-3 pl-6 cursor-pointer transition duration-300 hover:bg-gray-50"
  >
    <div>
      <router-link :to="{ name: 'song', params: { id: song.docId } }" 
        class="font-bold block text-gray-600">
        {{ song.modified_name }}
      </router-link>
      <span class="text-gray-500 text-sm">{{ song.display_name }}</span>
    </div>

    <div class="flex text-gray-600 text-lg">
      <button type="button" @click.prevent="currentPlaying ? toggleAudio() : newSong(song)">
        <i class="fas text-gray-500 text-xl pr-4 pl-1" :class="{ 'fa-play': !currentPlaying, 'fa-pause': currentPlaying}"></i>
      </button>
      <router-link custom :to="{ name: 'song', params: { id: song.docId }, hash: '#comments' }"
        v-slot="{ navigate }">
        <span class="comments" @click="navigate">
          <i class="fa fa-comments text-gray-600"></i>
          {{ song.comment_count }}
        </span>
      </router-link>
    </div>
  </li>
</template>

<script>
import usePlayerStore from '@/stores/player'
import { mapState, mapActions } from 'pinia';

export default {
  name: 'SongItem',
  props: ['song'],
  computed: {
    ...mapState(usePlayerStore,['playing','current_song']),
    currentPlaying() {
      return this.playing && this.current_song.docId === this.song.docId;
    }
  },
  methods: {
    ...mapActions(usePlayerStore,['newSong','toggleAudio'])
  },
}
</script>
