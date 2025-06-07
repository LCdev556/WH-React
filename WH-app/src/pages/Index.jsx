import EmployeeForm from '../components/createmployeeform';
import { Link } from 'react-router-dom';

export default function Index() {
  
  return(
    <section>
      <Link to="/employeelist" className="text-decoration-none employeeForm-link">View Current Employees</Link>
      <EmployeeForm />
    </section>
  );
}