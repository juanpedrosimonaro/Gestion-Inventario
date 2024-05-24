import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Logo from './Logo.jsx'
import FilterLogo from './FilterLogo.jsx'
import PackagesLogo from './PackagesLogo.jsx'
import EditLogo from './EditLogo.jsx'
import TrashLogo from './TrashLogo.jsx'
import MenuFiltro from './MenuFiltro.jsx'
import ListaProductos from './ListaProductos.jsx'
import useLocalStorage from './useLocalStorage.jsx'

const ajustarProductos = (data)=>data.map(datum=>(
    {
      titulo:datum.title,
      precio:datum.price,
      descripcion:datum.description,
      categoria:datum.category,
      imagen:datum.image,
      rating:datum.rating.rate,
      existencia:Number(((Math.random()*(100-5))+5).toFixed(0)),
      descuento:Number(((Math.random()*(30-5))+5).toFixed(0))
    }
  ))

function App() {
  const [productos,setProductos] = useLocalStorage("productos")
  console.log(productos)
  const [opcionesFiltro,setOpcionesFiltro] = useState([])

  useEffect(()=>{
    if(productos.length == 0){
      fetch("https://fakestoreapi.com/products").then(res=>res.json()).then(json=>setProductos(ajustarProductos(json)))
    }
  }
  ,[])

  return (
    <>
      {/*<img src={gestionLogo} className="logo fill-cl3" alt="Gestion logo" />*/}
      <div className="flex flex-row place-content-center gap-[20px] items-center">
        <Logo classN="text-cl5 fill-current w-[92px]" />
        <h1 className="text-[40px] font-permark ">Gestión de Inventario</h1>
      </div>
      {/*<FilterLogo classN="text-cl5 fill-current w-[92px]" />
      <PackagesLogo classN="text-cl5 fill-current w-[92px]" />
      <EditLogo classN="text-cl5 fill-current w-[92px] cursor-pointer opacity-0 hover:opacity-100" />
      <TrashLogo classN="text-cl5 fill-current w-[92px] cursor-pointer opacity-0 hover:opacity-100" />*/}
      <div className="flex flex-row gap-[20px] ">
        <MenuFiltro productos={productos} opcionesFiltro={opcionesFiltro} setOpcionesFiltro={setOpcionesFiltro}  />
        <ListaProductos productos={productos} setProductos={setProductos} />
      </div>
    </>
  )
}

export default App
