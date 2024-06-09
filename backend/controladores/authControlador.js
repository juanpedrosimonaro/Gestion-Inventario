const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Usuario = require('../modelos/usuarioModelo'); // Asumiendo que tienes un modelo de usuario

const login = async (req, res) => {
  try {
    const { correo, contrasena } = req.body;
    const usuario = await Usuario.findOne({ correo });

    if (!usuario) {
      return res.status(404).send('Usuario no encontrado');
    }

    const concuerda = await bcrypt.compare(contrasena, usuario.contrasena);
    if (!concuerda) {
      return res.status(401).send('Contraseña incorrecta');
    }

    const token = jwt.sign( usuario.toJSON(), process.env.JWT_SECRET || 'llave_ultra_super_secreta');
    res.status(200).json({ accessToken: token });

  } catch (error) {
    res.status(500).send(error);
  }
};

const registro = async (req, res) => {
  const { correo, nombre, apellido, contrasena } = req.body;
  try{
    bcrypt.hash(contrasena,10,async(err,hash)=>{
      if(!err){
        const usuario = await Usuario.create({correo,nombre,apellido,rol:"usuario",contrasena:hash});
        const token = jwt.sign(usuario.toJSON(), process.env.JWT_SECRET || 'llave_ultra_super_secreta'/*, (err, token) => {
          if (err) {
            res.sendStatus(500);
          } else {
            res.cookie('token', token, { httpOnly: true });
            // res.render('index',{title:"Pagina principal"})
            res.redirect('/')
          }
        }*/)
        res.status(200).json({ accessToken: token });
      }
    })
  } catch(error){
    console.error(error)
    res.status(300).json(error)
  }
}

const cerrarSesion = (req,res) =>{
  res.clearCookie('token');
  res.redirect('/');
}

module.exports = {
  login,
  registro,
  cerrarSesion
}
