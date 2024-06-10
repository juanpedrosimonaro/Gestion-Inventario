import {useState,useEffect} from 'react';
import {useAuth} from './AuthProvider';
import ReactPaginate from 'react-paginate';
import Producto from './Producto.jsx';
import PlusLogo from './PlusLogo.jsx';
import axios from 'axios'

function ListaProductos({productos,setProductos,busqueda,opcionesFiltro,setMessage,setError,criterio}){

  const [favoritos, setFavoritos] = useState([])
  const { usuarioData, authToken } = useAuth();

  // Paginacion
  const [currentProductos, setCurrentProductos] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [productoOffset, setProductoOffset] = useState(0);
  
  useEffect(()=>{
    if(usuarioData != null && usuarioData.rol == "usuario"){
      axios.get("/api/favoritos",{headers: {"Authorization": `Bearer ${authToken}`}}).then(res=>setFavoritos(res.data.map(fav=>fav.productoId))).catch(e=>setError(e));}
  },[])

  // Paginacion
  useEffect(() => {
    var productosFiltrados = productos.filter(producto=>(usuarioData != null && usuarioData.rol === 'administrador') ? true : producto.existencia > 0)
    .filter(producto=>producto[criterio].toLowerCase().includes(busqueda.toLowerCase()))
    .filter(producto=>Object.keys(opcionesFiltro).reduce((prev,cur)=> prev && opcionesFiltro[cur].some(op=>cur != "categoria" ? op.split(" - ").every((v,i)=> i==0 ? v >= producto[cur] : v <= producto[cur] )  : op == producto[cur]),true));
    const endOffset = productoOffset + 5;
    setCurrentProductos(productosFiltrados.slice(productoOffset, endOffset));
    setPageCount(Math.ceil(productosFiltrados.length / 5));
  }, [productos,productoOffset,busqueda, opcionesFiltro,criterio]);

  const handlePageClick = (event) => {
    const newOffset = event.selected * 5 % productos.length;
    setProductoOffset(newOffset);
  }; 

  const editarProducto = (productoEditado,index,callback)=>{
    axios.put(`/api/producto/${productoEditado._id}`,productoEditado,{headers: {"Authorization": `Bearer ${authToken}`}}).then(res=>{ 
      setProductos(prevProductos=>[...prevProductos.slice(0,index),res.data,...prevProductos.slice(index+1)]);
      setMessage("El Producto se ha editado exitosamente");
      setTimeout(() => setMessage(''), 5000);
      callback();
    }).catch(e=>setError(e))
  }

  const establecerFavorito = (productoId)=>{
    axios.post("/api/favorito",{productoId},{headers: {"Authorization": `Bearer ${authToken}`}}).then(res=>{setFavoritos(prevFavoritos=>[...prevFavoritos,res.data.productoId])}).catch(e=>setError(e))
  }

  const eliminarFavorito = (productoId)=>{
    const index = favoritos.indexOf(productoId);
    axios.delete(`/api/favorito/${productoId}`,{headers: {"Authorization": `Bearer ${authToken}`}}).then(res=>setFavoritos(prevFavoritos=>[...prevFavoritos.slice(0,index),...prevFavoritos.slice(index+1)])).catch(e=>setError(e))
  }

  const eliminarProducto = (index)=>{
    axios.delete(`/api/producto/${productos[index]._id}`,{headers: {"Authorization": `Bearer ${authToken}`}}).then(res=>{
      setProductos(prevProductos=>[...prevProductos.slice(0,index),...prevProductos.slice(index+1)]);
      setMessage("El Producto se ha borrado exitosamente");
      setTimeout(() => setMessage(''), 5000);
    }).catch(e=>setError(e))
  }

  const handleSubmit = (e)=>{
    e.preventDefault()
    const nuevoProducto = {
      imagen:e.target.imagen.value,
      titulo:e.target.titulo.value,
      precio:Number(e.target.precio.value),
      categoria:e.target.categoria.value,
      rating:Number(e.target.rating.value),
      existencia:Number(e.target.existencia.value),
      descuento:Number(e.target.descuento.value),
      descripcion:e.target.descripcion.value
    }
    axios.post("/api/producto",nuevoProducto,{headers: {"Authorization": `Bearer ${authToken}`}}).then(res=>{
      setProductos(prevProductos=>[...prevProductos,res.data])
      e.target.imagen.value="";
      e.target.titulo.value="";
      e.target.precio.value="";
      e.target.categoria.value="";
      e.target.rating.value="";
      e.target.existencia.value="";
      e.target.descuento.value="";
      e.target.descripcion.value="";
      setMessage("El Producto se ha agregado exitosamente");
      setTimeout(() => setMessage(''), 5000);
    }).catch(e=>setError(e))
  }

  // filtrar opcionesBusqueda
/*  var productosFiltrados = productos.filter(producto=>(usuarioData != null && usuarioData.rol === 'administrador') ? true : producto.existencia > 0)
    .filter(producto=>producto[criterio].toLowerCase().includes(busqueda.toLowerCase()))
    .filter(producto=>Object.keys(opcionesFiltro).reduce((prev,cur)=> prev && opcionesFiltro[cur].some(op=>cur != "categoria" ? op.split(" - ").every((v,i)=> i==0 ? v >= producto[cur] : v <= producto[cur] )  : op == producto[cur]),true)); */

  return (
    <>
    <ul className="flex flex-row flex-wrap w-[968px] p-[30px] gap-[25px]">
      { /*productos productosFiltrados*/ currentProductos.length != 0 ? /*productos productosFiltrados*/ currentProductos.map((producto,index)=>(<Producto producto={producto} index={index} eliminarProducto={eliminarProducto} editarProducto={editarProducto} setMessage={setMessage} establecerFavorito={establecerFavorito} eliminarFavorito={eliminarFavorito} esFavorito={favoritos.includes(producto._id)} />)) : <li key="no-result">No hay resultados que mostrar</li>} 
      <li>
       {usuarioData != null && usuarioData.rol == "administrador" && (
        <form className="grid grid-areas-producto-layout grid-cols-producto-layout grid-rows-producto-layout relative gap-[2px] font-permark text-[12px] bg-cl2 border-cl3 overflow-hidden" onSubmit={handleSubmit}>
          <input type="text" id="imagen" name="imagen" placeholder="Imagen" className="grid-in-imagen" />
          <div className="grid grid-in-info-pro grid-areas-info-producto grid-cols-info-producto grid-rows-info-producto p-[5px]">
            <input type="text" id="titulo" name="titulo" placeholder="Titulo" className="grid-in-titulo overflow-hidden" />
            <input type="text" id="precio" name="precio" placeholder="Precio" className="grid-in-precio flex justify-content-center items-center text-center" />
            <input type="text" id="categoria" name="categoria" placeholder="Categoria" className="grid-in-categoria" />
            <input type="text" id="rating" name="rating" placeholder="Rating" className="grid-in-rating" />
            <input type="text" id="existencia" name="existencia" placeholder="Existencia" className="grid-in-existencia" />
            <input type="text" id="descuento" name="descuento" placeholder="Descuento" className="grid-in-descuento" />
            <input type="text" id="descripcion" name="descripcion" placeholder="Descripcion" className="grid-in-descripcion overflow-hidden text-[8px]" />
          </div>
          <div className="absolute top-0 right-0 flex flex-row gap-[10px]">
            <button type="submit" className="all-unset" >
              <PlusLogo classN="text-cl5 fill-current w-[20px] cursor-pointer hover:text-cl4"  />
            </button>
          </div>
        </form>
        )}

      </li>
    </ul>
            <ReactPaginate 
              nextLabel="Siguiente >"
              onPageChange={handlePageClick}
              pageRangeDisplayed={3}
              marginPagesDisplayed={2}
              pageCount={pageCount}
              previousLabel="< Previo"
              pageClassName="page-item"
              pageLinkClassName="py-2 px-3 mx-1 transition-colors duration-200 transform rounded-md cl5 hover:cl4 focus:outline-none focus:cl3"
              previousClassName="page-item"
              previousLinkClassName="py-2 px-3 mx-1 transition-colors duration-200 transform rounded-md cl5 hover:cl4 focus:outline-none focus:cl3"
              nextClassName="page-item"
              nextLinkClassName="py-2 px-3 mx-1 transition-colors duration-200 transform rounded-md cl5 hover:cl4 focus:outline-none focus:cl3"
              breakLabel="..."
              breakClassName="page-item"
              breakLinkClassName="page-link"
              containerClassName="flex flex-row"
              //disabledLinkClassName="py-2 px-3 mx-1 bg-cl5 text-gray-300 rounded-md"
              activeClassName="py-2 px-3 mx-1 bg-cl3 text-white rounded-md"
              renderOnZeroPageCount={null}
            />
            </>
  )

}

export default ListaProductos
