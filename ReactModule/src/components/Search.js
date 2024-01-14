import React, { useState } from "react";
import styles from "./Search.module.css";
import { Navigate } from "react-router-dom";

// Components
const Search = () => {
  // States & Functions
  const [search, setSearch] = useState("");

  const onChangeHandler = (e) => {
    setSearch(e.target.value);
  };

  const onBtnClickEvent = () => {
    console.log(search);
  };

  const onSearchHandler = async (restaurantName) => {
    try {
      const result = await fetch(
        "localhost:3000/users/restaurants/" + restaurantName
      );
      const data = await result.json();
      {
        data
          ? Navigate("/restaurantes/" + data.id) // Enviar os dados para a pagina do restaurante (PROPS)
          : Navigate("/notfound");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Render
  return (
    <div className={styles["search-container"]}>
      <input
        className={styles.search}
        name="procura"
        type="text"
        placeholder="Procurar..."
        value={search}
        onChange={onChangeHandler}
      />
      <button onClick={onBtnClickEvent}>Encontrar</button>
    </div>
  );
};

export default Search;
