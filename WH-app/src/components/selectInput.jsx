// export default function SelectInput({
//   id,
//   name,
//   value,
//   onChange,
//   label,
//   placeholder,
//   options,
//   valueKey = "value",
//   labelKey = "label",
//   error,       
// }) {
//   return (
//     <div className="mb-3">
//       <label htmlFor={id} className="form-label">{label}</label>
//       <select
//         className={`form-select ${error ? 'is-invalid' : ''}`}
//         id={id}
//         name={name}
//         value={value}
//         onChange={onChange}
//       >
//         <option value="">{placeholder}</option>
//         {options.map((option) => (
//           <option key={option[valueKey]} value={option[valueKey]}>
//             {option[labelKey]}
//           </option>
//         ))}
//       </select>
//       {error && <div className="invalid-feedback">{error}</div>}
//     </div>
//   );
// }

import React from 'react';
import PropTypes from 'prop-types';

/**
 * Composant SelectInput.
 * Affiche un champ select avec un label, une liste d'options et la gestion des erreurs.
 *
 * @param {Object} props - Les propriétés du composant.
 * @param {string} props.id - L'id unique du select.
 * @param {string} props.name - Le nom du select.
 * @param {string|number} props.value - La valeur sélectionnée.
 * @param {function} props.onChange - Fonction déclenchée lors du changement de valeur.
 * @param {string} props.label - Le texte du label associé au select.
 * @param {string} props.placeholder - Le texte affiché dans l'option par défaut.
 * @param {Array<Object>} props.options - Liste des options à afficher.
 * @param {string} [props.valueKey="value"] - Clé pour récupérer la valeur dans chaque option.
 * @param {string} [props.labelKey="label"] - Clé pour récupérer le label dans chaque option.
 * @param {string} [props.error] - Message d'erreur à afficher si présent.
 * @returns {JSX.Element} Le composant SelectInput.
 */
export default function SelectInput({
  id,
  name,
  value,
  onChange,
  label,
  placeholder,
  options,
  valueKey = "value",
  labelKey = "label",
  error,
}) {
  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">{label}</label>
      <select
        className={`form-select ${error ? 'is-invalid' : ''}`}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option[valueKey]} value={option[valueKey]}>
            {option[labelKey]}
          </option>
        ))}
      </select>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
}

SelectInput.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  valueKey: PropTypes.string,
  labelKey: PropTypes.string,
  error: PropTypes.string,
};
