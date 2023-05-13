import './Home.css'
import React, { useState } from 'react';

const Home = () => {
  const [searchValue, setSearchValue] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async (event) => {
    event.preventDefault();
    const response = await fetch(`http://127.0.0.1:5000/buscar_registros/${searchValue}`);
    const data = await response.json();
    setResults(data);
  };


  return (
    <div>
      <div class="input-group mb-3">
        <input type="text" value={searchValue} onChange={e => setSearchValue(e.target.value)} class="form-control" placeholder="Buscar datos" aria-label="Recipient's username" aria-describedby="button-addon2" />
        <button onClick={handleSearch} class="btn btn-outline-success" type="button" id="button-addon2">Buscar</button>
      </div>

      <table class="table table-dark table-striped">
        <thead>
          <tr>
            <th>Clave cliente</th>
            <th>Nombre contacto</th>
            <th>Correo</th>
            <th>Teléfono contacto</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result, index) => (
            <tr key={index}>
              <td >{result["Clave cliente"]}</td>
              <td >{result["   Nombre Contacto "]}</td>
              <td >{result["Correo "]}</td>
              <td >{result["Teléfono Contacto  "]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Home;