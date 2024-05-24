/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}","./index.html"],
  theme: {
    extend: {
      colors: {
        cl1:"#fcfdeb",
        cl2:"#e3cebd",
        cl3:"#c1a2a0",
        cl4:"#725b75",
        cl5:"#322030"
      },
      fontFamily: {
        permark: ['Permanent Marker','Roboto']
      }
    },

  },
  plugins: [],
}
