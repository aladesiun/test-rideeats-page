// https://nuxt.com/docs/api/configuration/nuxt-config
const path = require('path');
export default defineNuxtConfig({
  alias:{
  '@': path.resolve(__dirname, './')
  },
  env: {
    APP_BASE_URL: process.env.APP_BASE_URL,
    // Add more environment variables here
  },
  modules: [
    '@nuxtjs/tailwindcss',
    [
      '@pinia/nuxt',
      {
        autoImports: [
          // automatically imports `defineStore`
          'defineStore', // import { defineStore } from 'pinia'
          // automatically imports `defineStore` as `definePiniaStore`
          ['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia'
        ],
      },
    ],
  ],
  css: [
    '~/assets/css/tailwind.css',
    path.resolve(__dirname, 'node_modules/vue-multiselect/dist/vue-multiselect.css'),
    '~/assets/css/main.css',
        
  ],
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    // '~/plugins/google-maps-autocomplete'
  ],
  
  routes:{
    '/api/**': { cors: true },
    '/': {prerender: true}
  },
  app: {
    head: {
      title: 'Rideeats',
      htmlAttrs: {
        lang: 'en'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: '' },
        { name: 'format-detection', content: 'telephone=no' }
      ],

      link: [

        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: "stylesheet", href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css", crossorigin: "anonymous", referrerpolicy: "no-referrer" },
        {rel: "stylesheet", href: "https://cdn.jsdelivr.net/npm/swiper@9/swiper-bundle.min.css"},
        {rel: "stylesheet", href: 'https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.6/flowbite.min.css'}

        
      ],
      script: [
        { src: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyC95TwjwvsAZEGBlvmoyRjkiLCrpEr84uk&libraries=places' },
        {src:"https://cdn.jsdelivr.net/npm/swiper@9/swiper-bundle.min.js"},
        {src: "https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.6/flowbite.min.js"}
      ]
    }
  },
  runtimeConfig:{
    public:{
      FILESTACK_APIKEY: 'APC6a96aWQyK9cOfNGLoZz',
      APP_BASE_URL: process.env.APP_BASE_URL
    }
  },
  
  privateRuntimeConfig:{
    
  }, 
  nitro: {
    output: {
      publicDir: path.join(__dirname, 'dist')
    }
  }
})
