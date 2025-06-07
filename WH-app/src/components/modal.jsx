import React from 'react';
import PropTypes from 'prop-types';

/**
 * Composant modal.
 * Affiche une fenêtre modale Bootstrap avec un contenu dynamique.
 *
 * @param {Object} props - Les propriétés du composant.
 * @param {string|React.ReactNode} props.content - Le contenu à afficher dans la modale.
 * @returns {JSX.Element} Le composant modale.
 */
export default function modal({ content }) {
  return (
    <div>
        <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div class="modal-content">
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    
                    <div className="modal-body">
                        <p>{content}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}

modal.propTypes = {
  content: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]).isRequired,
};