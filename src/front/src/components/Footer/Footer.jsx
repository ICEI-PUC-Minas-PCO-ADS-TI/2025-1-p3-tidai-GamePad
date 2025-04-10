import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './Footer.css'
import { faInstagram, faFacebook, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faCopyright }  from "@fortawesome/free-regular-svg-icons";


export const Footer = () => {
  return (
    <footer>
        <div id="footer_content">
            <div className="footer_contacts">
                <h1>Redes sociais</h1>
                <p>Acompanhe nosso projeto nas redes abaixo</p>
                <div id="footer_social_media">
                    <a href="#" className="footer-link" id="instagram">
                        <i><FontAwesomeIcon icon = {faInstagram} /></i>
                    </a>
                    <a href="#" className="footer-link" id="facebook">
                        <i ><FontAwesomeIcon icon = {faFacebook} /></i>
                    </a>
                    <a href="#" className="footer-link" id="whatsapp">
                        <i ><FontAwesomeIcon icon = {faWhatsapp} /></i>
                    </a>
                </div>
            </div>

            <ul className="footer_list">
                <li>
                    <h3>Categorias</h3>
                </li>
                <li>
                    <a href="explore.html" className="footer-link">Explorar</a>
                </li>
                <li>
                    <a href="login.html" className="footer-link">Login</a>
                </li>
                <li>
                    <a href="signup.html" className="footer-link">Registrar</a>
                </li>
                
            </ul>
            <ul className="footer_list">
                <li>
                    <h3>Sobre nós</h3>
                </li>
                <li>
                    <p className="footer-link">Sobre</p>
                </li>
                <li>
                    <p className="footer-link">Politicas & Privacidade </p>
                </li>
                
            </ul>

            <div id="footer_subscribe">
                <h3>Sugestões</h3>

                <p>
                    Nos de um feedback ou uma sugestão de melhoria.
                </p>

                <div id="input_group">
                    <input type="email" id="email"/>
                    <button>
                        <i><FontAwesomeIcon icon={faEnvelope}/></i>
                    </button>
                </div>
            </div>
        </div>

        <div id="footer_copyright">
            <p><FontAwesomeIcon icon={faCopyright} /></p>
            <p>2024 todos os direitos reservados</p>
        </div>

    </footer>
  )
}

