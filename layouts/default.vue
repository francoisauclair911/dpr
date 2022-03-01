<template>
  <v-app id="donation-receiver" class="primary" :style="bgStyle">
    <MainAppBar
      color="white"
      flat
      app
      :clipped-left="$store.state.navigations.primaryDrawer"
    />

    <v-main>
      <v-container class="h-full py-0 px-0 mx-0" fluid>
        <v-row class="fill-height" justify="center" no-gutters>
          <v-col cols="12">
            <v-card class="fill-height py-6" color="transparent" flat>
              <!-- <v-app-bar dense color="transparent" class="px-0 my-2" flat tile>
                <v-toolbar-title class="text-h6 white--text pl-0">
                  <MainBreadcrumbs />
                </v-toolbar-title>

                <v-spacer></v-spacer>
              </v-app-bar> -->

              <Nuxt />
            </v-card>
          </v-col>
        </v-row>
        <v-dialog v-model="modal" fullscreen>
          <MainAppBar color="white" flat tile>
            <v-slider v-model="backgroundZoom" max="100" min="0"></v-slider>
            <v-icon @click="toggleModal">mdi-refresh</v-icon>
          </MainAppBar>
          <v-card
            v-if="modal"
            ref="bg_img_container"
            tile
            color="primary"
            class="grey"
            :style="style"
            @mousedown="mouseDown"
          >
            <!-- <pre>
            style
            {{ style }}
          </pre
            >
            <pre>
            calculatedPos
            {{ calculatedPos }}
          </pre
            > -->
          </v-card>
        </v-dialog>
      </v-container>
    </v-main>
    <!-- <v-footer>
      <v-row>
        <v-spacer></v-spacer>
        <v-chip-group>
          <v-chip v-show="$config.APP_VERSION_V2" small color="primary"
            >v {{ $config.APP_VERSION_V2 }}</v-chip
          >
          <v-chip
            v-show="$config.GIT_COMMIT_SHA"
            class="ml-2"
            small
            color="secondary"
          >
            {{ $config.GIT_COMMIT_SHA }}</v-chip
          >
        </v-chip-group>
      </v-row>
    </v-footer> -->
    <MainSnackbarNotification />
  </v-app>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'DefaultLayout',
  data() {
    return {
      modal: false,
      imgSrc: 'https://i.picsum.photos/id/316/3000/1700.jpg',

      mouse: {
        originalX: null,
        originalY: null,
        currentX: null,
        currentY: null,
      },
      containerWidth: 0,
      backgroundX: 0,
      backgroundY: 0,
      backgroundZoom: 100,
    }
  },

  computed: {
    ...mapGetters('pages', ['settings']),
    bgStyle() {
      if (this.settings) {
        return {
          backgroundColor: 'grey',
          backgroundImage: `url("${this.settings.background_src}")`,
          // backgroundImage: `url("https://cdn.shortpixel.ai/client/q_lossy,ret_wait/${this.settings.background_src}")`,
          backgroundSize: `cover`,
        }
      }
      return {
        // backgroundColor: 'grey',
      }
    },
    style() {
      return {
        width: '100%',
        height: '100%',
        backgroundColor: 'grey',
        backgroundImage: `url("https://images.unsplash.com/photo-1514565131-fce0801e5785")`,
        // backgroundSize: `${this.backgroundZoom}%`,
        backgroundSize: `cover`,
        backgroundPosition: `${this.roundNearest(
          this.backgroundX + this.calculatedPos.x
        )}px ${this.roundNearest(this.backgroundY + this.calculatedPos.y)}px`,
        // backgroundPosition: `${this.calculatedPos.x}% ${this.calculatedPos.y}%`,
        // backgroundPosition: `0% -25%`,
      }
    },
    calculatedPos() {
      return {
        x: this.mouse.currentX - this.mouse.originalX,
        y: this.mouse.currentY - this.mouse.originalY,
      }
      // return {
      //   x:
      //     (100 * (this.mouse.currentX - this.mouse.originalX)) /
      //     this.containerWidth,
      //   y:
      //     (100 * (this.mouse.currentY - this.mouse.originalY)) /
      //     this.containerWidth,
      // }
    },
  },
  mounted() {
    document.addEventListener('mouseup', (e) => {
      document.removeEventListener('mousemove', this.mouseMove)
    })
    ;(function (w, d) {
      const b = d.getElementsByTagName('head')[0]
      const s = d.createElement('script')
      const v = 'IntersectionObserver' in w ? '' : '-compat'
      s.async = true // This includes the script as async.
      s.src =
        'https://cdn.shortpixel.ai/assets/js/bundles/spai-lib' +
        v +
        '.1.0.min.js'
      w.spaiData = {
        key: 'jsai',
        quality: 'lossy', // can be lossy, glossy or lossless
        sizeFromImageSuffix: true, // deactivate this if you have images that end in, for example: "-100x100.jpg", but the numbers don't mean the pixels width or height of the image
      }
      b.appendChild(s)
    })(window, document)
  },
  methods: {
    mouseMove(event) {
      console.log('\x1b[32;1m%s\x1b[0m  ', '=> mouseMove', event)
      console.log('\x1b[32;1m%s\x1b[0m  ', '=> width', event.target.clientWidth)
      this.mouse.currentX = event.pageX
      this.mouse.currentY = event.pageY
      if (this.mouse.currentX !== this.mouse.originalX) {
        console.log('calculating')
        this.backgroundX = this.mouse.currentX - this.mouse.originalX
        this.backgroundY = this.mouse.currentY - this.mouse.originalY
      }
    },
    roundNearest(number, roundTo = 10) {
      console.log('\x1b[32;1m%s\x1b[0m  ', '=> number', number)
      const rounded = Math.ceil(number / roundTo) * roundTo
      console.log('\x1b[32;1m%s\x1b[0m  ', '=> rounded', rounded)
      return rounded
    },
    mouseDown(event) {
      console.log('\x1b[32;1m%s\x1b[0m  ', '=> mouseDown', event)

      this.containerWidth = event.target.clientWidth
      this.mouse.originalX = event.pageX
      this.mouse.originalY = event.pageY
      // event.target.addEventListener('mousemove', this.mouseMove)
      document.addEventListener('mousemove', this.mouseMove)
    },

    toggleModal() {
      this.modal = false
      this.modal = true
    },
  },
}
</script>
<style>
.h-full {
  height: 100%;
}
/* .row {
  margin: 0;
}*/
.col-xl,
.col-xl-auto,
.col-xl-12,
.col-xl-11,
.col-xl-10,
.col-xl-9,
.col-xl-8,
.col-xl-7,
.col-xl-6,
.col-xl-5,
.col-xl-4,
.col-xl-3,
.col-xl-2,
.col-xl-1,
.col-lg,
.col-lg-auto,
.col-lg-12,
.col-lg-11,
.col-lg-10,
.col-lg-9,
.col-lg-8,
.col-lg-7,
.col-lg-6,
.col-lg-5,
.col-lg-4,
.col-lg-3,
.col-lg-2,
.col-lg-1,
.col-md,
.col-md-auto,
.col-md-12,
.col-md-11,
.col-md-10,
.col-md-9,
.col-md-8,
.col-md-7,
.col-md-6,
.col-md-5,
.col-md-4,
.col-md-3,
.col-md-2,
.col-md-1,
.col-sm,
.col-sm-auto,
.col-sm-12,
.col-sm-11,
.col-sm-10,
.col-sm-9,
.col-sm-8,
.col-sm-7,
.col-sm-6,
.col-sm-5,
.col-sm-4,
.col-sm-3,
.col-sm-2,
.col-sm-1,
.col,
.col-auto,
.col-12,
.col-11,
.col-10,
.col-9,
.col-8,
.col-7,
.col-6,
.col-5,
.col-4,
.col-3,
.col-2,
.col-1 {
  padding-bottom: 0.5rem;
  padding-top: 0.5rem;
}
</style>
