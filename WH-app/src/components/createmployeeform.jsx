import React, { useState } from 'react';
import PropTypes from 'prop-types';
import FormInput from './formInput';
//import SelectInput from './selectInput'; // SelectInput provenant du dossier components
import DatePickerInput from './datePickerInput';
import Modal from './modal';
import SelectInput from 'react-custom-select-input'; //SelectInput issu d'un import npm
import { useDispatch } from 'react-redux';
import { addEmployee } from '../redux/employeesSlice';
import '../style/createmployeeform.scss';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const states = [
  { label: "Alabama", value: "AL" },
  { label: "Alaska", value: "AK" },
  { label: "Arizona", value: "AZ" },
  { label: "Arkansas", value: "AR" },
  { label: "California", value: "CA" },
  { label: "Colorado", value: "CO" },
  { label: "Connecticut", value: "CT" },
  { label: "Delaware", value: "DE" },
  { label: "Florida", value: "FL" },
  { label: "Georgia", value: "GA" },
  { label: "Hawaii", value: "HI" },
  { label: "Idaho", value: "ID" },
  { label: "Illinois", value: "IL" },
  { label: "Indiana", value: "IN" },
  { label: "Iowa", value: "IA" },
  { label: "Kansas", value: "KS" },
  { label: "Kentucky", value: "KY" },
  { label: "Louisiana", value: "LA" },
  { label: "Maine", value: "ME" },
  { label: "Maryland", value: "MD" },
  { label: "Massachusetts", value: "MA" },
  { label: "Michigan", value: "MI" },
  { label: "Minnesota", value: "MN" },
  { label: "Mississippi", value: "MS" },
  { label: "Missouri", value: "MO" },
  { label: "Montana", value: "MT" },
  { label: "Nebraska", value: "NE" },
  { label: "Nevada", value: "NV" },
  { label: "New Hampshire", value: "NH" },
  { label: "New Jersey", value: "NJ" },
  { label: "New Mexico", value: "NM" },
  { label: "New York", value: "NY" },
  { label: "North Carolina", value: "NC" },
  { label: "North Dakota", value: "ND" },
  { label: "Ohio", value: "OH" },
  { label: "Oklahoma", value: "OK" },
  { label: "Oregon", value: "OR" },
  { label: "Pennsylvania", value: "PA" },
  { label: "Rhode Island", value: "RI" },
  { label: "South Carolina", value: "SC" },
  { label: "South Dakota", value: "SD" },
  { label: "Tennessee", value: "TN" },
  { label: "Texas", value: "TX" },
  { label: "Utah", value: "UT" },
  { label: "Vermont", value: "VT" },
  { label: "Virginia", value: "VA" },
  { label: "Washington", value: "WA" },
  { label: "West Virginia", value: "WV" },
  { label: "Wisconsin", value: "WI" },
  { label: "Wyoming", value: "WY" },
];

const departments = [
  { label: "Sales", value: "Sales" },
  { label: "Marketing", value: "Marketing" },
  { label: "Engineering", value: "Engineering" },
  { label: "Human Resources", value: "Human Resources" },
  { label: "Legal", value: "Legal" },
];

/**
 * Composant React permettant de gérer le formulaire de création d'un employé.
 * Ce composant utilise Redux pour dispatcher les nouveaux employés et gère l'affichage d'une modal de confirmation.
 * @component
 * @returns {JSX.Element} Le formulaire de création d'un employé.
 */
export default function EmployeeForm() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    startDate: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    department: 'Sales',
  });

  const [formErrors, setFormErrors] = useState({});
  const [showModal, setShowModal] = useState(false);

  /**
   * Gère le changement de valeur dans les champs du formulaire.
   * @param {Object} e - L'événement déclenché par le champ de formulaire.
   */
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setFormErrors(prev => ({ ...prev, [name]: '' }));
  }

  /**
   * Valide les données du formulaire et retourne true si toutes les données sont correctes.
   * Met également à jour l'état des erreurs si nécessaire.
   * @returns {boolean} true si le formulaire est valide, false sinon.
   */
  function validateForm() {
    const errors = {};
    if (!formData.firstName.trim()) errors.firstName = 'Le prénom est requis';
    if (!formData.lastName.trim()) errors.lastName = 'Le nom est requis';
    if (!formData.dateOfBirth) errors.dateOfBirth = 'La date de naissance est requise';
    if (!formData.startDate) errors.startDate = 'La date de début est requise';
    if (!formData.street.trim()) errors.street = 'La rue est requise';
    if (!formData.city.trim()) errors.city = 'La ville est requise';
    if (!formData.state) errors.state = 'L’état est requis';
    if (!formData.zipCode.trim()) errors.zipCode = 'Le code postal est requis';
    if (!formData.department) errors.department = 'Le département est requis';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }

  /**
   * Sauvegarde les données de l'employé en les envoyant au store Redux et réinitialise le formulaire.
   */
  function saveEmployee() {
    dispatch(addEmployee(formData));
    setShowModal(true);
    setFormData({
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      startDate: '',
      street: '',
      city: '',
      state: '',
      zipCode: '',
      department: 'Sales',
    });
    setFormErrors({});
  }

  /**
   * Gère la soumission du formulaire en validant les données avant de les sauvegarder.
   * @param {Object} e - L'événement de soumission du formulaire.
   */
  function handleSubmit(e) {
    e.preventDefault();
    if (validateForm()) {
      saveEmployee();
    }
  }

  return (
    <div className="container">
      <h2 className='formTitle'>Create Employee</h2>

      <form onSubmit={handleSubmit}>
        <FormInput
          type="text"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          label="First Name"
          error={formErrors.firstName}
        />
        <FormInput
          type="text"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          label="Last Name"
          error={formErrors.lastName}
        />
        <DatePickerInput
          id="dateOfBirth"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleChange}
          label="Date of Birth"
          error={formErrors.dateOfBirth}
        />
        <DatePickerInput
          id="startDate"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          label="Start Date"
          error={formErrors.startDate}
        />

        <div className="address-container">
          <legend>Address</legend>
          <FormInput
            type="text"
            id="street"
            name="street"
            value={formData.street}
            onChange={handleChange}
            label="Street"
            error={formErrors.street}
          />
          <FormInput
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            label="City"
            error={formErrors.city}
          />
          <SelectInput
            id="state"
            name="state"
            value={formData.state}
            onChange={handleChange}
            label="State"
            placeholder="Select a state"
            options={states}
            error={formErrors.state}
          />
          <FormInput
            type="number"
            id="zipCode"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
            label="Zip Code"
            error={formErrors.zipCode}
          />
        </div>

        <SelectInput
          id="department"
          name="department"
          value={formData.department}
          onChange={handleChange}
          label="Department"
          placeholder="Select a department"
          options={departments}
          error={formErrors.department}
        />

        <div className="d-flex justify-content-center">
          <button type="submit" className="btn btn-primary mt-3 submit-button">Save</button>
        </div>
      </form>

      {showModal && (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content p-3">
              <div className="modal-header">
                <h5 className="modal-title">Employee Created!</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <p>The new employee has been added to the system.</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

EmployeeForm.propTypes = {};