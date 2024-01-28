import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Remover = () => {
  // Extrai o ID do produto da URL usando o hook useParams do React Router
  const productId = window.location.pathname.split("/").pop();
  // Hook para navegar entre páginas
  const Navegar = useNavigate();
  // Estado para armazenar os detalhes do produto
  const [produtosLista, setProdutosLista] = useState({});

  // useEffect para buscar os detalhes do produto quando o componente é montado ou quando productId muda
  useEffect(() => {
    console.log("Buscando dados para o productId: " + productId);
    const buscarProdutos = async () => {
      try {
        // Obtém o token de autenticação do localStorage
        const token = localStorage.getItem("token");
        // Endpoint da API para buscar os detalhes do produto
        const url = `http://localhost:9000/restaurante/produto/${productId}`;
        // Envia uma solicitação GET para buscar os detalhes do produto
        const response = await axios.get(url, {
          headers: {
            Authorization: token,
          },
        });
        const data = response.data;
        console.log("Resposta da API:", data);
        // Se a solicitação da API for bem-sucedida, atualiza o estado com os detalhes do produto
        if (data.success) {
          setProdutosLista(data.produto); // Supondo que o produto está aninhado sob a chave 'produto'
          console.log("Dados do produto definidos:", data.produto);
        } else {
          console.error(
            "A solicitação da API para produtos não foi bem-sucedida"
          );
        }
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    };
    // Chama a função buscarProdutos
    buscarProdutos();
  }, [productId]);

  // useEffect para registrar os dados do produto quando o estado de produtosLista muda
  useEffect(() => {
    console.log("Dados do produto definidos:", produtosLista);
  }, [produtosLista]);

  // Função para lidar com a remoção do produto
  const lidarComRemover = async () => {
    try {
      // Obtém o token de autenticação do localStorage
      const token = localStorage.getItem("token");
      // Endpoint da API para excluir o produto
      const url = `http://localhost:9000/restaurante/produto/${productId}`;
      // Envia uma solicitação DELETE para remover o produto
      const response = await axios.delete(url, {
        headers: {
          Authorization: token,
        },
      });
      const data = response.data;
      console.log("Resposta da API:", data);
      // Se a solicitação da API for bem-sucedida, navega de volta para a página anterior
      if (data.success) {
        Navegar(-1);
      } else {
        console.error(
          "A solicitação da API para produtos não foi bem-sucedida"
        );
      }
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  };

  // JSX para renderizar o componente
  return (
    <div className="container">
      <div className="NomeDoRestaurante">
        {produtosLista.itemName ? (
          <>
            {/* Exibe os detalhes do produto, se disponíveis */}
            <h1>
              {produtosLista.itemName}
              <img
                src={`http://localhost:9000/sistema/imagem/${produtosLista._id}`}
                className="LogoDoRestaurante"
                alt="Logo do Produto"
              />
            </h1>
            <h6>{produtosLista.itemPrice}</h6>
            <h6>{produtosLista.itemDescription}</h6>
            {/* Botão para lidar com a remoção do produto */}
            <button onClick={lidarComRemover}>Remover</button>
            {/* Botão para navegar de volta */}
            <button onClick={() => Navegar(-1)}>Voltar</button>
          </>
        ) : (
          // Exibe uma mensagem de carregamento enquanto aguarda os detalhes do produto
          <p>Carregando...</p>
        )}
      </div>
    </div>
  );
};

export default Remover;
