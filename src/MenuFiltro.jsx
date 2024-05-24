import { useEffect } from 'react'
function obtenerRangos(array){
  var tamArray = array.length
  var tamRango = 0;
  var divisiones = 0;
  tamArray/5 >= 2 ? divisiones = 5 : tamArray/4 >= 2 ? divisiones = 4 : tamArray/3 >= 2 ? divisiones = 3 : tamArray/2 >= 2 ? divisiones = 2 : divisiones = 1
  tamRango = tamArray/divisiones;
  var inferior;
  var superior;
  var rangos = []
  for (var i=0; i < divisiones; i++){
    if(i!=0){
      inferior = superior - 1
    }
    else {
     inferior = array[0]}
    if (i==divisiones-1){
     superior = array[tamArray-1]
    }else{
    superior = Math.floor((array[Math.round((i+1)*tamRango)-2]+array[Math.round((i+1)*tamRango-1)])/2)}
    rangos.push(`${inferior}-${superior}`)
  }
  return rangos
}
function MenuFiltro(productos,opcionesFiltro,setOpcionesFiltro){
  caracteristicasDatos = {};
  productos.forEach(el=>Object.keys(el).forEach(c=>caracteristicasDatos[c] != undefined ? !caracteristicasDatos[c].includes(el[c]) && caracteristicasDatos[c].push(el[c]) : caracteristicasDatos[c]=[el[c]]));
  var caractRangos = ["precio","descuento","rating"].reduce((prev,cur)=>prev[cur]=obtenerRangos(caracteristicasDatos[cur].sort((a,b)=>b-a)),{})
  caractRangos.categoria = caracteristicasDatos.categoria 
  const changeHandler = (e,rango) =>{
   if(e.target.checked){
    
   } 
  }
  return (
    <>
      {Object.keys(caractRangos).map(caract=>(
        <>
          <h2>caract</h2>
          <ul>
            {caractRangos[caract].map(rango=>(
              <li key={rango}>
                <input type="checkbox" onChange={(e)=>changeHandler(e,rango)}>{rango}
              </li>
            ))}
          </ul>
        </>
        )) 
      }
    </>
  ) 
}

export default MenuFiltro
