import { useCallback, useEffect, useState } from "react";
import {
  Breadcrumb,
  Nav,
  Table,
  Button,
  Form,
  Col,
  Row,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { getStudents, deleteStudent } from "../../services/StudentServices";
import { maskCPF, maskPhone } from "../../utils/maskUtils";

const StudentPage = () => {
  const [students, setStudents] = useState([]);
  const [filters, setFilters] = useState({
    nome: "",
    email: "",
    telefone: "",
    cpf: "",
    dataNascimento: "",
  });

  const navigate = useNavigate();

  const fetchStudents = useCallback(async () => {
    try {
      const data = await getStudents(filters);
      setStudents(data);
    } catch (error) {
      console.error("Erro ao buscar alunos:", error);
      alert("Erro ao carregar a lista de alunos.");
    }
  }, [filters]);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents, filters]);

  const handleDelete = async (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir este aluno?")) {
      try {
        await deleteStudent(id);
        fetchStudents();
      } catch (error) {
        console.error("Erro ao excluir aluno:", error);
        alert("Erro ao excluir o aluno.");
      }
    }
  };

  const handleUpdate = async (id: string) => {
    navigate(`/alunos/atualizar/${id}`);
  };

  const handleRefresh = () => {
    fetchStudents();
  };

  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item>Alunos</Breadcrumb.Item>
      </Breadcrumb>
      <Nav>
        <Nav.Link as={Link} to="registrar">
          <Button value={"Registrar Aluno"}>Registrar Aluno</Button>
        </Nav.Link>
      </Nav>
      <Form className="mt-3">
        <h3>Filtros</h3>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nome"
                value={filters.nome}
                onChange={(e) =>
                  setFilters({ ...filters, nome: e.target.value })
                }
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="email"
                value={filters.email}
                onChange={(e) =>
                  setFilters({ ...filters, email: e.target.value })
                }
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>
            <Form.Group>
              <Form.Label>Telefone</Form.Label>
              <Form.Control
                type="text"
                placeholder="Telefone"
                value={filters.telefone}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    telefone: maskPhone(e.target.value),
                  })
                }
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>CPF</Form.Label>
              <Form.Control
                type="text"
                placeholder="CPF"
                value={filters.cpf}
                onChange={(e) =>
                  setFilters({ ...filters, cpf: maskCPF(e.target.value) })
                }
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Data de Nascimento</Form.Label>
              <Form.Control
                type="date"
                value={filters.dataNascimento}
                onChange={(e) =>
                  setFilters({ ...filters, dataNascimento: e.target.value })
                }
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>
            <Button
              variant="secondary"
              onClick={() => {
                setFilters({
                  nome: "",
                  email: "",
                  telefone: "",
                  cpf: "",
                  dataNascimento: "",
                });
              }}
            >
              Limpar Filtros
            </Button>
          </Col>
        </Row>
      </Form>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>CPF</th>
            <th>Data de Nascimento</th>
            <th>Cadastro</th>
            <th>
              {" "}
              <Button variant="secondary" onClick={handleRefresh}>
                ⟳
              </Button>{" "}
            </th>
          </tr>
        </thead>
        <tbody>
          {students.map((student: any, index: number) => (
            <tr key={student.id}>
              <td>{student.nome}</td>
              <td>{student.email}</td>
              <td>{student.telefone}</td>
              <td>{student.cpf}</td>
              <td>{student.dataNascimento}</td>
              <td>{student.dataCadastro}</td>
              <td>
                <Button
                  variant="warning"
                  onClick={() => handleUpdate(student.id)}
                >
                  ✏️
                </Button>{" "}
                <Button
                  variant="danger"
                  onClick={() => handleDelete(student.id)}
                >
                  🗑️
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default StudentPage;
