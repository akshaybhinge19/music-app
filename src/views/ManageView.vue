<template>
  <main>
  <!-- Main Content -->
  <section class="container mx-auto mt-6">
    <div class="absolute inset-0 w-full h-full bg-contain introduction-bg"
      style="background-image: url(assets/img/user-header.png)">
    </div>
    <div class="md:grid md:grid-cols-3 md:gap-4">
      <div class="col-span-1">
        <upload-file @addSong="addSong" />
      </div>
      <div class="col-span-2">
        <div class="bg-white rounded border border-gray-200 relative flex flex-col">
          <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
            <span class="card-title">My Songs</span>
            <i class="fa fa-compact-disc float-right text-green-400 text-2xl"></i>
          </div>
          <div class="px-6 pt-6">
            <!-- Composition Items -->
            <CompositionItem
              v-for="(song, index) in songs"
              :key="song.docId"
              :song="song"
              :updateSong="updateSong"
              :removeSong="removeSong"
              :updateUnsavedChanges="updateUnsavedChanges"
              :index="index"
            />
          </div>
          <div class="italic px-6 pb-6 opacity-80" v-if="!songs.length"> 
            <p>Your music library is empty. Please upload songs to get started!</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</main>
</template>

<script>
// import userUserStore from '@/stores/user'
import UploadFile from '@/components/UploadFile.vue'
import { songsCollection, auth } from '@/includes/firebase'
import CompositionItem from '@/components/CompositionItem.vue'
export default {
  name: 'ManageView',
  components: {
    UploadFile,
    CompositionItem
  },
  data() {
    return {
      songs: [],
      unsavedChanges: false
    }
  },
  async created() {
    const snapshot = await songsCollection.where('uid', '==', auth.currentUser.uid).get()
    snapshot.forEach(this.addSong)
  },
  methods: {
    addSong(document) {
      const song = {
        ...document.data(),
        docId: document.id
      }
      this.songs.push(song)
    },
    updateSong(i, values) {
      // this.songs[i] = {...values}
      this.songs[i].modified_name = values.modified_name
      this.songs[i].genre = values.genre
    },
    removeSong(i) {
      this.songs.splice(i, 1)
    },
    updateUnsavedChanges(value) {
      this.unsavedChanges = value
    }
  },
  beforeRouteLeave(to, from, next) {
    if (!this.unsavedChanges) {
      next()
    } else {
      const leave = confirm('You have unsaved changes. Are you sure you want to leave?')
      next(leave)
    }
  }
  // beforeRouteEnter(to, from, next) {
  //     console.log("manage route component")
  //     const store = userUserStore();
  //     if (store.userLoggedIn) {
  //         next()
  //     } else {
  //         console.error("user is not authenticated!")
  //         next({ name: 'home' })
  //     }
  // }
}
</script>
