/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      animation: {
        scale: 'scale 3s ease-in-out infinite',
        glow: "glow 5s ease-in-out infinite"
      },
      keyframes: {
        scale: {
          '0%, 100%': { 
            transform: 'scale(1)',
          },
          '50%': {
            transform: 'scale(1.1)',
          },
        },

        glow : {
          "0%, 100%" : {
            "filter": "drop-shadow(-1px 2px 57px rgba(255,179,30,0.76))",
          },
          "50%" : {
            "filter": "drop-shadow(-1px 2px 25px rgba(255,179,30,0.76))",
          }
        }
      },
    },
  },
  plugins: [],
}

