import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Logo from './Logo.jsx'
import FilterLogo from './FilterLogo.jsx'
import PackagesLogo from './PackagesLogo.jsx'
import EditLogo from './EditLogo.jsx'
import TrashLogo from './TrashLogo.jsx'
import MenuFiltro from './MenuFiltro.jsx'
import useLocalStorage from './useLocalStorage.jsx'

function App() {
  const [count, setCount] = useState(0)
  const [productos, setProductos] = useLocalStorage("https://fakestoreapi.com/products","productos", data=>data.map(datum=>(
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
  )))
  const [opcionesFiltro,setOpcionesFiltro] = useState([])

  return (
    <>
      {/*<img src={gestionLogo} className="logo fill-cl3" alt="Gestion logo" />*/}
      <Logo classN="text-cl5 fill-current w-[92px]" />
      <FilterLogo classN="text-cl5 fill-current w-[92px]" />
      <PackagesLogo classN="text-cl5 fill-current w-[92px]" />
      <EditLogo classN="text-cl5 fill-current w-[92px] cursor-pointer opacity-0 hover:opacity-100" />
      <TrashLogo classN="text-cl5 fill-current w-[92px] cursor-pointer opacity-0 hover:opacity-100" />
      <MenuFiltro productos={productos} opcionesFiltro={opcionesFiltro} setOpcionesFiltro={setOpcionesFiltro}  />
      {/*<ListaProductos productos={productos} setProductos={setProductos} />*/}
    </>
  )
}

export default App
