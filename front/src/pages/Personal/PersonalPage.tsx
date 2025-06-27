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
import { getPersonals, deletePersonal } from "../../services/PersonalServices";
import { maskCPF, maskPhone } from "../../utils/maskUtils";

const PersonalPage = () => {
  const [personals, setPersonals] = useState([]);
  const [filters, setFilters] = useState({
    nome: "",
    email: "",
    telefone: "",
    cpf: "",
    dataNascimento: "",
  });

  const navigate = useNavigate();

  const fetchPersonals = useCallback(async () => {
    try {
      const data = await getPersonals(filters);
      console.log("Personals fetched:", data);
      setPersonals(data);
    } catch (error) {
      console.error("Erro ao buscar personals:", error);
      alert("Erro ao carregar a lista de personals.");
    }
  }, [filters]);

  useEffect(() => {
    fetchPersonals();
  }, [fetchPersonals, filters]);

  const handleDelete = async (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir este personal?")) {
      try {
        await deletePersonal(id);
        fetchPersonals();
      } catch (error) {
        console.error("Erro ao excluir personal:", error);
        alert("Erro ao excluir o personal.");
      }
    }
  };

  const handleUpdate = async (id: string) => {
    navigate(`/personals/atualizar/${id}`);
  };

  const handleRefresh = () => {
    fetchPersonals();
  };

  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item>personals</Breadcrumb.Item>
      </Breadcrumb>
      <Nav>
        <Nav.Link as={Link} to="registrar">
          <Button value={"Registrar personal"}>Registrar personal</Button>
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
            <th>Admissao</th>
            <th>
              {" "}
              <Button variant="secondary" onClick={handleRefresh}>
                ⟳
              </Button>{" "}
            </th>
          </tr>
        </thead>
        <tbody>
          {personals.map((personal: any, index: number) => (
            <tr key={personal.id}>
              <td>{personal.nome}</td>
              <td>{personal.email}</td>
              <td>{personal.telefone}</td>
              <td>{personal.cpf}</td>
              <td>{personal.dataNascimento}</td>
              <td>{personal.dataAdmissao}</td>
              <td>
                <Button
                  variant="warning"
                  onClick={() => handleUpdate(personal.id)}
                >
                  ✏️
                </Button>{" "}
                <Button
                  variant="danger"
                  onClick={() => handleDelete(personal.id)}
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

export default PersonalPage;
