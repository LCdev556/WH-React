import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../style/layout.scss';

/**
 * Composant Layout - Conteneur principal avec en-tête et zone principale pour afficher les enfants.
 *
 * @component
 * @param {Object} props - Propriétés du composant Layout.
 * @param {React.ReactNode} props.children - Contenu React à afficher dans la zone principale.
 *
 * @returns {JSX.Element} Un layout avec un header contenant un lien vers la page d'accueil, et une section main affichant les enfants.
 */
export default function Layout({ children }) {
  return (
    <div>
      <header style={{ padding: '1rem', background: '#007bff', color: 'white' }}>
       <Link to="/" className="text-decoration-none layout-title"><h1>HRnet</h1></Link> 
      </header>
      <main style={{ padding: '1rem' }}>
        {children}
      </main>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};