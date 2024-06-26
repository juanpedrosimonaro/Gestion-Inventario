/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./frontend/**/*.{html,js,jsx}","./index.html"],
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
        permark: ['Permanent Marker','Roboto'],
        roboto: ['Roboto']
      },
      gridTemplateAreas:{
        'info-producto':[
          'titulo titulo titulo titulo titulo titulo titulo titulo ',
          'titulo titulo titulo titulo titulo titulo titulo titulo ',
          'categoria categoria categoria categoria categoria categoria precio precio',
          'categoria categoria categoria categoria categoria categoria precio precio',
          'rating rating existencia existencia descuento descuento precio precio',
          'descripcion descripcion descripcion descripcion descripcion descripcion descripcion descripcion',
          'descripcion descripcion descripcion descripcion descripcion descripcion descripcion descripcion',
          'descripcion descripcion descripcion descripcion descripcion descripcion descripcion descripcion',
        ],
        'info-usuario':[
          'nombre apellido',
          'correo correo',
          'rol telefono',
          'direccion direccion',
          'direccion direccion',
        ],
        'producto-layout':[
          'imagen',
          'info-pro'
        ]
      },
      gridTemplateColumns:{
        'info-producto':'1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr',
        'info-usuario':'1fr 1fr',
        'producto-layout':'283px'
      },
      gridTemplateRows:{
        'info-producto':'1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr',
        'info-usuario':'1fr 1fr 1fr 1fr 1fr',
        'producto-layout':'113px 149px'
      }
    }

  },
  plugins: [require('@savvywombat/tailwindcss-grid-areas')],
}
