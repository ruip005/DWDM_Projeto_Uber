import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Search.module.css";
import axios from "axios";

const Search = () => {
  // Estado para armazenar o valor da pesquisa
  const [search, setSearch] = useState("");

  // Estado para armazenar os resultados filtrados
  const [filteredResults, setFilteredResults] = useState([]);

  // Estado para controlar se a dropdown está aberta ou fechada
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Referência para o elemento da dropdown
  const dropdownRef = useRef(null);

  // Estado para indicar se os dados foram buscados do servidor
  const [dataFetched, setDataFetched] = useState(false);

  // Função para obter os nomes dos restaurantes com base na pesquisa
  const getRestaurantNames = async () => {
    try {
      const url = `http://localhost:9000/user/restaurants/name?campanyName=${search}`;
      const response = await axios.get(url);
      const data = response.data;

      // Extrair os nomes dos restaurantes da resposta
      const restaurantes = data.restaurantes || [];
      const restaurantNames = restaurantes.map((restaurante) => ({
        id: restaurante._id,
        name: restaurante.campanyName,
      }));

      // Atualizar o estado com os nomes dos restaurantes e abrir a dropdown
      setFilteredResults(restaurantNames);
      setIsDropdownOpen(true);
      setDataFetched(true);
    } catch (error) {
      console.error("Erro ao obter restaurantes:", error);
    }
  };

  // Função chamada quando o valor da caixa de pesquisa é alterado
  const onChangeHandler = (e) => {
    const searchValue = e.target.value;
    setSearch(searchValue);

    if (!dataFetched) {
      // Se os dados ainda não foram buscados, chama a função para buscar
      getRestaurantNames();
    } else {
      // Se os dados já foram buscados, filtrar localmente os resultados
      const filtered = filteredResults.filter((result) =>
        result.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredResults(filtered);
      setIsDropdownOpen(true);
    }
  };

  // Função chamada quando o botão "Encontrar" é clicado
  const onBtnClickEvent = () => {
    getRestaurantNames(); // Ao clicar no botão, chamamos a função de busca
  };

  // Função chamada quando ocorre um clique fora da dropdown
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      // Fechar a dropdown se o clique ocorrer fora dela
      setIsDropdownOpen(false);
    }
  };

  // Efeito que adiciona e remove o evento de clique ao montar e desmontar o componente
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // Função chamada quando um restaurante é clicado
  const handleRestaurantClick = (id) => {
    // Navegar para a página do restaurante com o ID
    window.location.href = `/restaurantes/${id}`;
    setIsDropdownOpen(false); // Fechar a dropdown após o clique
  };

  // Renderização do componente
  return (
    <div className={styles["search-container"]}>
      {/* Caixa de pesquisa */}
      <input
        className={styles.search}
        name="procura"
        type="text"
        placeholder="Procurar..."
        value={search}
        onChange={onChangeHandler}
      />

      {/* Botão "Encontrar" */}
      <button className={styles["botao-feio"]} onClick={onBtnClickEvent}>
        Encontrar
      </button>

      {/* Dropdown de resultados (renderizada quando a dropdown está aberta) */}
      {isDropdownOpen && (
        <ul ref={dropdownRef} className={styles.results}>
          {/* Mapeia os resultados para elementos da lista */}
          {filteredResults.map((result) => (
            <li key={result.id}>
              {/* Link para a página do restaurante */}
              <Link
                to={`/restaurantes/${result.id}`}
                onClick={() => handleRestaurantClick(result.id)}
              >
                {result.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Search;
