import EmployeeListTable from '../components/employeeListTable';
import { Link } from 'react-router-dom';
import '../style/EmployeeList.scss';

export default function employeeList() {
 
  return(
    <section>
        <EmployeeListTable />
        <Link to="/" className="text-decoration-none home-link">Home</Link>
    </section>
    
  );
}