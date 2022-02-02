import * as UI from './interface.js';
import Api from './api.js';
UI.formularioBuscar.addEventListener('submit', buscarCancion);
function buscarCancion(event) {
  event.preventDefault();
  const artista = document.querySelector('#artista').value;
  const cancion = document.querySelector('#cancion').value;
  // la validación de los campos del formulario 
  if( artista ==='' || cancion === '') {
    UI.divMensaje.textContent = 'Error.. campos requeridos!';
    UI.divMensaje.classList.add('error');

    setTimeout(() => {
      UI.divMensaje.textContent = '';
      UI.divMensaje.classList.remove('error');
    }, 3000);
    return; // termina la ejecucion
  }
  // Si pasamos la validación
  const busqueda = new Api(artista, cancion);
  const resultadoApi = busqueda.consultarApi();
  const informacion = busqueda.mostrarInformacion();
  renderizado(resultadoApi, informacion)
}

const renderizado  = async (result, info) => {
  const resultado = await result;
  // Comprobación de que exista la canción
  if(resultado.lyrics) {
    const {lyrics} = resultado;
    // lyrics.slice(22, lyrics.length)
    // console.log(lyrics.split('\r\n').pop());
    const cancion = lyrics.split('\r\n').pop();
    UI.divResultado.textContent = cancion;
    UI.headingResultado.textContent = info;
  } else {
    UI.divMensaje.textContent = 'La canción existe, prueba con otra busqueda';
    UI.divMensaje.classList.add('error');
    
    setTimeout( () => {
      UI.divMensaje.textContent = '';
      UI.divMensaje.classList.remove('error');
    }, 3000)
  }
};