import React, { useState, useMemo } from 'react';
//import SelectInput from './selectInput'; // SelectInput provenant du dossier components
import SelectInput from '@lcdev556/react-select-input'; //SelectInput issu d'un import npm
import { useSelector } from 'react-redux';

/**
 * Composant `EmployeeListTable`
 * 
 * Ce composant affiche un tableau interactif de la liste des employés avec :
 * - tri des colonnes en cliquant sur les en-têtes
 * - pagination configurable
 * - recherche en texte libre
 * 
 * Les données sont récupérées depuis le store Redux via `useSelector`.
 * Aucun props n'est attendu par ce composant.
 * 
 * @component
 * @returns {JSX.Element} Le tableau des employés avec ses contrôles.
 */
export default function EmployeeListTable() {
  const employees = useSelector((state) => state.employees.employees);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  /**
   * Filtre les employés en fonction de la recherche utilisateur.
   * 
   * @type {Array<Object>}
   */
  const filteredData = useMemo(() => {
    if (!employees) return [];
    return employees.filter((employee) =>
      Object.values(employee)
        .join(' ')
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
  }, [employees, searchQuery]);

  /**
   * Trie les données filtrées selon la clé et direction définies.
   * 
   * @type {Array<Object>}
   */
  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filteredData;
    return [...filteredData].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
  }, [filteredData, sortConfig]);

  const totalEntries = sortedData.length;
  const totalPages = Math.ceil(totalEntries / entriesPerPage);

  /**
   * Découpe les données triées selon la page et le nombre d'entrées par page.
   * 
   * @type {Array<Object>}
   */
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * entriesPerPage;
    return sortedData.slice(start, start + entriesPerPage);
  }, [sortedData, currentPage, entriesPerPage]);

  /**
   * Gère la demande de tri sur une colonne.
   * 
   * @param {string} key - La clé de la colonne à trier.
   */
  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  /**
   * Retourne les icônes de tri à afficher à côté du nom de colonne.
   * 
   * @param {string} key - La clé de la colonne.
   * @returns {JSX.Element} Les icônes de tri.
   */
  const getSortIcon = (key) => {
    const isActive = sortConfig.key === key;
    const upClass = isActive && sortConfig.direction === 'ascending' ? 'text-primary' : 'text-white';
    const downClass = isActive && sortConfig.direction === 'descending' ? 'text-primary' : 'text-white';

    return (
      <span className="ms-2">
        <i className={`bi bi-caret-up-fill ${upClass}`} style={{ fontSize: '0.75rem' }}></i>
        <i className={`bi bi-caret-down-fill ${downClass}`} style={{ fontSize: '0.75rem' }}></i>
      </span>
    );
  };

  /**
   * Passe à la page précédente.
   */
  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  /**
   * Passe à la page suivante.
   */
  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  /**
   * Déclare les colonnes du tableau avec leur clé et libellé.
   * 
   * @type {Array<{key: string, label: string}>}
   */
  const columns = [
    { key: 'firstName', label: 'First Name' },
    { key: 'lastName', label: 'Last Name' },
    { key: 'startDate', label: 'Start Date' },
    { key: 'department', label: 'Department' },
    { key: 'dateOfBirth', label: 'Date of Birth' },
    { key: 'street', label: 'Street' },
    { key: 'city', label: 'City' },
    { key: 'state', label: 'State' },
    { key: 'zipCode', label: 'Zip Code' },
  ];

  // Rendu JSX du composant
  return (
    <div className="employeeList-container container mt-4">
      {/* Contrôles pagination et recherche */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <SelectInput
          id="entriesPerPage"
          name="entriesPerPage"
          label="Show entries"
          value={entriesPerPage}
          onChange={(e) => {
            setEntriesPerPage(Number(e.target.value));
            setCurrentPage(1);
          }}
          options={[
            { value: 5, label: '5' },
            { value: 10, label: '10' },
            { value: 25, label: '25' },
            { value: 50, label: '50' },
          ]}
          placeholder="Select number"
        />
        <div className="mb-3">
          <label htmlFor="searchInput" className="form-label me-2">Search :</label>
          <input
            id="searchInput"
            type="text"
            className="form-control d-inline-block w-auto"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Tableau des employés */}
      <table className="table table-hover table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                onClick={() => requestSort(col.key)}
                style={{ cursor: 'pointer', userSelect: 'none' }}
              >
                {col.label}
                {getSortIcon(col.key)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((employee, index) => (
            <tr key={index}>
              {columns.map((col) => (
                <td key={col.key}>{employee[col.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="d-flex justify-content-between align-items-center">
        <div>
          Showing {Math.min((currentPage - 1) * entriesPerPage + 1, totalEntries)} to{' '}
          {Math.min(currentPage * entriesPerPage, totalEntries)} of {totalEntries} entries
        </div>
        <div className="previous_next-container">
          <button
            className="btn btn-outline-primary me-2"
            onClick={handlePrevious}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button
            className="btn btn-outline-primary"
            onClick={handleNext}
            disabled={currentPage === totalPages || totalPages === 0}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}