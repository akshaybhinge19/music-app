<template>
  <main class="-mb-16">
  <section class="mb-0 py-20 text-white text-center relative">
    <div class="absolute inset-0 w-full h-full bg-contain introduction-bg"
      style="background-image: url(assets/img/user-header.png)">
    </div>
    <div class="container mx-auto">
      <div class="text-white main-header-content">
        <h1 class="font-bold text-5xl mb-5">Listen to Great Music!</h1>
        <p class="w-full md:w-8/12 mx-auto">
          Welcome to SwaraSangam – your ultimate destination for music lovers!
        </p>
        <div class="inner-container">
          <div class="about-section">
            <p>
              At SwaraSangam, we're passionate about bringing people together through the power of music. 
              Whether you're an aspiring artist looking to share your latest creations or a music enthusiast seeking new sounds to discover, 
              we've got you covered.
            </p>
            <p>
              Our platform allows users to upload their own music, 
              create personalized playlists, and explore a vast library of tracks from various genres and artists. 
              With our intuitive interface and seamless streaming experience, you can enjoy your favorite tunes anytime, anywhere.
            </p>
            <p>
              SwaraSangam is more than just a music app – it's a community. 
              Join us as we celebrate the universal language of music and connect people from all walks of life through shared experiences and shared playlists.
            </p>          
            <p>
              So go ahead, hit play, and let the music take you on a journey like never before. We're thrilled to have you with us!
            </p>
            <button class="button" @click.prevent="toggleAuthModal">Get Started</button>
          </div>
        </div>
      </div>
    </div>

    <img class="block mx-auto mt-0 -mb-20 w-auto max-w-full"
      src="../assets/img/introduction-users.png" />
  </section>
  </main>
</template>

<script>
import { mapState, mapStores, mapActions } from 'pinia';
import useModalStore from '@/stores/modal'
import useUserStore from '@/stores/user'

export default {
  name: 'AboutView',
  computed: {
    ...mapState(useUserStore, ['userLoggedIn']),
    ...mapStores(useModalStore)
  },
  methods: {
    ...mapActions(useModalStore, {
      toggleModal: 'toggleAuthModal'
    }),
    toggleAuthModal() {
      if (!this.userLoggedIn) this.toggleModal();
      else this.$router.push({ path: '/manage-music'})
    },
  },
}
</script>
<style scoped>
  body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f8f8f8;
  }
  .inner-container {
    max-width: 900px;
    margin: 0 auto;
    padding: 20px;
  }
  h1 {
    color: #333;
    text-align: center;
    margin-bottom: 20px;
  }
  .about-section {
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 30px;
  }
  .about-section p {
    color: #666;
    line-height: 1.6;
    margin-bottom: 15px;
  }
  .about-section p:last-child {
    margin-bottom: 0;
  }
  .button {
    display: inline-block;
    background-color: #4CAF50;
    color: white;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    border-radius: 5px;
    transition: background-color 0.3s ease;
  }
  .button:hover {
    background-color: #45a049;
    transform: scale(1.01);
    transition: 0.3s ease;
  }
</style>