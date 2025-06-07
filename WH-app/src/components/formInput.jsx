// export default function FormInput({ type, id, name, value, onChange, label, error }) {
//   return (
//     <div className="mb-3">
//       <label htmlFor={id} className="form-label">{label}</label>
//       <input
//         type={type}
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

import PropTypes from 'prop-types';

/**
 * Composant FormInput - Champ de formulaire contrôlé réutilisable avec gestion d'erreur.
 *
 * @component
 * @param {Object} props - Propriétés du composant FormInput.
 * @param {string} props.type - Type du champ input (ex : "text", "email", "number").
 * @param {string} props.id - Identifiant unique utilisé pour l'attribut id et l'accessibilité.
 * @param {string} props.name - Nom du champ input.
 * @param {string|number} props.value - Valeur actuelle du champ.
 * @param {function} props.onChange - Fonction appelée lors du changement de valeur.
 * @param {string} props.label - Libellé affiché au-dessus du champ.
 * @param {string} [props.error] - Message d'erreur affiché en cas de validation invalide (optionnel).
 *
 * @returns {JSX.Element} Un champ input stylisé avec Bootstrap, son label et un message d'erreur optionnel.
 */
export default function FormInput({ type, id, name, value, onChange, label, error }) {
  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">{label}</label>
      <input
        type={type}
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

FormInput.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  error: PropTypes.string,
};

FormInput.defaultProps = {
  error: '',
};