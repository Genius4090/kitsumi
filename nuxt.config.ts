export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  css: [
    '~/assets/main.css'
  ],

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/image',
    '@nuxt/fonts',
    'motion-v/nuxt'
  ],

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      title: "Kitsumi Sushi",
      link: [
        {
          rel: "icon",
          type: "image/png",
          href: "/icons/website__logo__mini.png"
        }
      ],
      meta: [
        {
            name: "description",
            content: "Premium sushi restaurant."
        }
      ],
      script: [
        {
          // Runs before first paint: hides the intro overlay for repeat
          // visitors (no flash) and locks scroll for first-time visitors.
          tagPosition: 'head',
          innerHTML:
            `(function(){try{var c=document.documentElement.classList;` +
            `if(sessionStorage.getItem('kitsumi_intro_played')){c.add('intro-played')}` +
            `else{c.add('intro-active')}}catch(e){}})();`
        }
      ]
    }
  },

  fonts: {
    families: [
      { name: 'Roboto', provider: 'google', weights: [400, 500, 700] },
      { name: 'Forum', provider: 'google', weights: [400] }
    ]
  }
})