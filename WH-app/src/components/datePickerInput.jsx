// export default function DatePickerInput({ id, name, value, onChange, label, error }) {
//   return (
//     <div className="mb-3">
//       <label htmlFor={id} className="form-label">{label}</label>
//       <input
//         type="date"
//         className={`form-control ${error ? 'is-invalid' : ''}`}
//         id={id}
//         name={name}
//         value={value}
//         onChange={onChange}
//         aria-describedby={`${id}Feedback`}
//       />
//       {error && <div id={`${id}Feedback`} className="invalid-feedback">{error}</div>}
//     </div>
//   );
// }

import React from 'react';
import PropTypes from 'prop-types';

/**
 * Composant champ de saisie de type date avec gestion des erreurs d'affichage.
 *
 * @component
 * @param {Object} props - Les propriétés du composant.
 * @param {string} props.id - L'identifiant unique du champ input.
 * @param {string} props.name - Le nom du champ input.
 * @param {string} props.value - La valeur actuelle du champ.
 * @param {function} props.onChange - La fonction appelée lors de la modification de la valeur.
 * @param {string} props.label - Le texte du label affiché au-dessus du champ.
 * @param {string} [props.error] - Le message d'erreur à afficher sous le champ si présent.
 * @returns {JSX.Element} Le composant de champ date personnalisé.
 */
export default function DatePickerInput({ id, name, value, onChange, label, error }) {
  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">{label}</label>
      <input
        type="date"
        className={`form-control ${error ? 'is-invalid' : ''}`}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        aria-describedby={`${id}Feedback`}
      />
      {error && <div id={`${id}Feedback`} className="invalid-feedback">{error}</div>}
    </div>
  );
}

DatePickerInput.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  error: PropTypes.string,
};