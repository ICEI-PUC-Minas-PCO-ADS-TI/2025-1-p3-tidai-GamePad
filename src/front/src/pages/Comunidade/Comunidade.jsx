import React from 'react';
import './Comunidade.css';
import { Link } from 'react-router-dom';

function Comunidade() {
    return (
        <div className="container">
            <h1 className="titulo">Regras da nossa Comunidade</h1>

            <div className="blocoRegras">
                <div className="listaRegras">
                    <p>
                        <strong>1. Sem linguagem ofensiva</strong><br />
                        Nossa plataforma não tolera discurso de ódio, mantenha uma boa linguagem para tornar o ambiente da nossa comunidade melhor.
                    </p>
                    <p>
                        <strong>2. Sem difamação</strong><br />
                        Por favor, não faça comentários que possam causar dano à imagem de outros usuários e evite problemas judiciais.
                    </p>
                    <p>
                        <strong>3. Sem spam</strong><br />
                        Não reposte comentários que você já fez ou que os outros já tenham feito.
                    </p>
                    <p>
                        <strong>4. Sem informações pessoais</strong><br />
                        Não divulgue seus dados pessoais aqui, mesmo que outra pessoa tenha lhe pedido.<br />
                        <strong>OBS:</strong> Nossa equipe jamais irá solicitar seus dados!
                    </p>
                    <p>
                        <strong>5. Sem links de terceiros</strong><br />
                        A divulgação de links externos ao do nosso site é proibida, então por favor não inclua links em seus comentários na plataforma.
                    </p>
                </div>
            </div>

            <button className="botaoFeed">Ir para o feed</button>
        </div>
    );
}

export default Comunidade;
