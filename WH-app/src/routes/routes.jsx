import {Index, EmployeeList } from "./index";
import { Routes, Route } from "react-router-dom";

/**
 * Composant contenant la configuration des routes de l'application.
 * @returns {JSX.Element} Routes de l'application.
 */
const AppRoutes = () => {
    return (
      <Routes>
        <Route path="/" element={<Index />} />
        {<Route path="/employeelist" element={<EmployeeList/>} />}
      </Routes>
    );
  };
  
  export default AppRoutes;