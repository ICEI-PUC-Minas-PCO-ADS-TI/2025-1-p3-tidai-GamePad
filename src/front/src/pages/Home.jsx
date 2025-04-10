import { Link } from 'react-router-dom'
import { Footer } from '../components/Footer/Footer.jsx';
import { Navbar } from '../components/NavBar/Navbar.jsx';
import "./Home.css";
import img2 from '../assets/gameplay2.jpg'


export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <div class="Header">
          <h1>Especifique, filtre e jogue </h1>
          <Link to='/register' class="link">
            <button class="HeaderBtn">Cadastrar</button>
          </Link>
        </div>

        <section class="mainContent">
          <div class="subContent">
            <div class="content">
              <h2 class="titulo">Jogos da semana</h2>
              <div class="cardsRow">
                <div class="gameCard">
                  <img src="https://cdn.cloudflare.steamstatic.com/steam/apps/730/header.jpg" alt="CS2" />
                  <button class="confiraBtn">Confira</button>
                </div>
                <div class="gameCard">
                  <img src="https://cdn.cloudflare.steamstatic.com/steam/apps/1172470/header.jpg" alt="Apex Legends" />
                  <button class="confiraBtn">Confira</button>
                </div>
                <div class="gameCard">
                  <img src="https://cdn.cloudflare.steamstatic.com/steam/apps/570/header.jpg" alt="Dota 2" />
                  <button class="confiraBtn">Confira</button>
                </div>
                <div class="gameCard">
                  <img src="https://cdn.cloudflare.steamstatic.com/steam/apps/812140/header.jpg" alt="AC Odyssey" />
                  <button class="confiraBtn">Confira</button>
                </div>
              </div>

            </div>
          </div>
        </section>

        <section class="etapas">
          <div class="filtro">
            <h1 id="textBanner">Fique atento no dia a dia dos games!</h1>
            <Link to='/noticias' class="link">
              <button class="etapasBtn">Notícias</button>
            </Link>
          </div>
        </section>

        <section class="mainContent">
          <div class="subContent">
            <div class="content">
              <h2 class="titulo">Noticias do dia</h2>
              <div class="cardsRowNoticias">
                <div class="noticiasCard">
                  <img src="https://www.flowgames.gg/wp-content/uploads/2025/04/l-kv-pic-1044x535.jpg" alt="CS2" />
                  <p>Preço do Nintendo Switch 2 na Noruega assusta jogadores</p>
                  <button class="confiraBtn">Confira</button>
                </div>
                <div class="noticiasCard">
                  <img src="https://www.flowgames.gg/wp-content/uploads/2023/03/TLOS2.png" alt="Apex Legends" />
                  <p>The Last of Us 3: diretor finalmente dá pista quente</p>
                  <button class="confiraBtn">Confira</button>
                </div>
                <div class="noticiasCard">
                  <img src="https://www.flowgames.gg/wp-content/uploads/2025/04/charles-sims-QHha7JOJYnw-unsplash-1-1044x695.jpg" alt="Dota 2" />
                  <p>Novos temas animados estão chegando ao Hub do PS5</p>
                  <button class="confiraBtn">Confira</button>
                </div>
                
              </div>

            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
