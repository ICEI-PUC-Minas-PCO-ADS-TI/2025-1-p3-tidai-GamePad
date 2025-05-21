import React from 'react';
import './Comunidade.css';
import { Link } from 'react-router-dom';

function Comunidade() {
    return (
        <div className="container">
            <h1 className="titulo">Regras da nossa Comunidade</h1>

            <div>
                <ol className="listaRegras">
                    <li>
                        <strong>Sem linguagem ofensiva</strong><br />
                        Nossa plataforma não tolera discurso de ódio, mantenha uma boa linguagem para tornar o ambiente da nossa comunidade melhor.
                    </li>
                    <li>
                        <strong>Sem difamação</strong><br />
                        Por favor, não faça comentários que possam causar dano à imagem de outros usuários e evite problemas judiciais.
                    </li>
                    <li>
                        <strong>Sem spam</strong><br />
                        Não reposte comentários que você já fez ou que os outros já tenham feito.
                    </li>
                    <li>
                        <strong>Sem informações pessoais</strong><br />
                        Não divulgue seus dados pessoais aqui, mesmo que outra pessoa tenha lhe pedido.<br />
                        <strong>OBS:</strong> Nossa equipe jamais irá solicitar seus dados!
                    </li>
                    <li>
                        <strong>Sem links de terceiros</strong><br />
                        A divulgação de links externos ao do nosso site é proibida, então por favor não inclua links em seus comentários na plataforma.
                    </li>
                </ol>
            </div>

            <button className="botaoFeed">Ir para o feed</button>
        </div>
    );
}

export default Comunidade;