import { useEffect, useState } from "react";
import { Breadcrumb, Nav, Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getStudents } from "../services/StudentServices";

const StudentPage = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const data = await getStudents();
        setStudents(data);
      } catch (error) {
        console.error("Erro ao buscar alunos:", error);
        alert("Erro ao carregar a lista de alunos.");
      }
    };

    fetchStudents();
  }, []);

  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item>Alunos</Breadcrumb.Item>
      </Breadcrumb>
      <Nav>
        <Nav.Link as={Link} to="registrar">
          <Button value={"Registrar Aluno"}>
            Registrar Aluno
          </Button>
        </Nav.Link>
      </Nav>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>#</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>CPF</th>
            <th>Data de Nascimento</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student: any, index: number) => (
            <tr key={student.id}>
              <td>{index + 1}</td>
              <td>{student.nome}</td>
              <td>{student.email}</td>
              <td>{student.telefone}</td>
              <td>{student.cpf}</td>
              <td>{student.dataNascimento}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default StudentPage;
