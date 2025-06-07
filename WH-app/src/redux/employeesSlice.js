import { createSlice } from '@reduxjs/toolkit';

/**
 * État initial du slice employees.
 * @property {Array<Object>} employees - Liste des employés.
 * @property {boolean} loading - Indique si le chargement est en cours.
 * @property {string|null} error - Message d'erreur éventuel.
 */
const initialState = {
  employees: [],
  loading: false,
  error: null,
};

/**
 * Slice Redux pour gérer la liste des employés.
 * Contient l'état initial, les reducers et les actions associées.
 */
const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    /**
     * Remplace la liste des employés par une nouvelle.
     * @param {Object} state - État actuel.
     * @param {Object} action - Action contenant la nouvelle liste dans action.payload.
     */
    setEmployees(state, action) {
      state.employees = action.payload;
    },

    /**
     * Ajoute un employé à la liste existante.
     * @param {Object} state - État actuel.
     * @param {Object} action - Action contenant le nouvel employé dans action.payload.
     */
    addEmployee(state, action) {
      state.employees.push(action.payload);
    },
  },
});

// Export des actions créées par createSlice
export const { setEmployees, addEmployee } = employeesSlice.actions;

// Export du reducer à utiliser dans le store Redux
export default employeesSlice.reducer;