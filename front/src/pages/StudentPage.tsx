import { Breadcrumb, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const StudentPage = () => {
  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item>Alunos</Breadcrumb.Item>
      </Breadcrumb>
      <Nav>
        <Nav.Link as={Link} to="registrar">
          Registrar Aluno
        </Nav.Link>
      </Nav>
    </div>
  );
};

export default StudentPage;
