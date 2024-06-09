function obtenerRangos(array){
  for(var escala=0; !array.every(num=>(Math.pow(10,escala)*num)%1==0); escala++){};
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
      inferior = (superior - (1/Math.pow(10,escala))).toFixed(escala);
    }
    else {
     inferior = array[0]}
    if (i==divisiones-1){
     superior = array[tamArray-1];
    }else{
      superior = (Math.floor(Math.pow(10,escala)*(array[Math.round((i+1)*tamRango)-2]+array[Math.round((i+1)*tamRango-1)])/2)/Math.pow(10,escala)).toFixed(escala);
    }
    rangos.push(`${inferior} - ${superior}`);
    //rangos.push({max:Number(inferior),min:Number(superior)});
  }
  return rangos
}

function MenuFiltro({productos,opcionesFiltro,setOpcionesFiltro}){

  var caracteristicasDatos = {};
  productos.forEach(el=>Object.keys(el).forEach(c=>caracteristicasDatos[c] != undefined ? !caracteristicasDatos[c].includes(el[c]) && caracteristicasDatos[c].push(el[c]) : caracteristicasDatos[c]=[el[c]]));
  var caractRangos = Object.keys(caracteristicasDatos).length!=0 && ["precio","descuento","rating"].reduce((prev,cur)=>{  prev[cur]=obtenerRangos(caracteristicasDatos[cur].sort((a,b)=>b-a)); return prev},{})

  const changeHandler = (e,opcion,caracteristica) =>{
   if(e.target.checked){
     setOpcionesFiltro({...opcionesFiltro,[caracteristica]: opcionesFiltro[caracteristica] ? [...opcionesFiltro[caracteristica],opcion] : [opcion]})
   }else{
     var opcionFiltrada = opcionesFiltro[caracteristica].filter(op=>op!=opcion)
     opcionFiltrada.length != 0 ? 
       setOpcionesFiltro({...opcionesFiltro,[caracteristica]:  opcionFiltrada }) :
       setOpcionesFiltro(Object.keys(opcionesFiltro).filter(op=>op!=caracteristica).reduce((prev,cur)=>{prev[cur]=opcionesFiltro[cur]; return prev},{}))     
   } 
  }

  return (
    <div className="bg-cl2 text-cl4 rounded-xl w-[277px] font-roboto flex flex-col items-center pb-[20px] shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]">
      <h1 className="font-permark text-[30px] text-cl5">Filtrar por...</h1>
      {Object.keys(caractRangos).map(caract=>(
        <>
          <h2 className="text-[25px]">{caract[0].toUpperCase()+caract.slice(1)}</h2>
          <ul>
            {caractRangos[caract].map(rango=>(
              <li key={rango} className="text-[10px]">
                <input type="checkbox" onChange={(e)=>changeHandler(e,rango,caract)}/> {rango}
              </li>
            ))}
          </ul>
        </>
        )) 
      }
      <h2 className="text-[25px]">Categoria</h2>
      <ul>
        {caracteristicasDatos.categoria && caracteristicasDatos.categoria.map(cat=>(
          <li key={cat} className="text-[10px]"><input type="checkbox" onChange={(e)=>changeHandler(e,cat,"categoria")}/> {cat}</li>
        ))}
      </ul>
    </div>
  ) 
}

export default MenuFiltro
