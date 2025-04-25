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
import { getPlans, deletePlan } from "../../services/PlanServices";

const PlanPage = () => {
  const [plans, setPlans] = useState([]);
  const [filters, setFilters] = useState({
    nome: "",
    valor: "",
    descricao: "",
    duracao: "",
  });

  const navigate = useNavigate();
  const fetchPlans = useCallback(async () => {
    try {
      const data = await getPlans(filters);
      setPlans(data);
    } catch (err) {
      console.error("Error fetching plans:", err);
      alert("Erro ao carregar planos");
    }
  }, [filters]);

  useEffect(() => {
    fetchPlans();
  }, [filters, fetchPlans]);

  const handleDelete = async (id: string) => {
    try {
      await deletePlan(id);
      fetchPlans();
    } catch (err) {
      console.log("Error deleting plan:", err);
      alert("Erro ao excluir plano");
    }
  };

  const handleUpdate = async (id: string) => {
    navigate(`/planos/atualizar/${id}`);
  };

  const handleRefresh = () => {
    fetchPlans();
  };

  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item>Planos</Breadcrumb.Item>
      </Breadcrumb>
      <Nav>
        <Nav.Link as={Link} to="registrar">
          <Button>Registrar Plano</Button>
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
              <Form.Label>Valor</Form.Label>
              <Form.Control
                type="number"
                placeholder="Valor"
                value={filters.valor}
                onChange={(e) =>
                  setFilters({ ...filters, valor: e.target.value })
                }
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>
            <Form.Group>
              <Form.Label>Descricao</Form.Label>
              <Form.Control
                type="text"
                placeholder="Descricao"
                value={filters.descricao}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    descricao: e.target.value,
                  })
                }
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Duracao</Form.Label>
              <Form.Control
                type="number"
                placeholder="Duracao"
                value={filters.duracao}
                onChange={(e) =>
                  setFilters({ ...filters, duracao: e.target.value })
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
                  valor: "",
                  descricao: "",
                  duracao: "",
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
            <th>Valor</th>
            <th>Descricao</th>
            <th>Duracao</th>
            <th>
              {" "}
              <Button variant="secondary" onClick={handleRefresh}>
                ⟳
              </Button>{" "}
            </th>
          </tr>
        </thead>
        <tbody>
          {plans.map((plan: any, index: number) => (
            <tr key={plan.id}>
              <td>{plan.nome}</td>
              <td>{plan.valor}</td>
              <td>{plan.descricao}</td>
              <td>{plan.duracao}</td>
              <td>
                <Button variant="warning" onClick={() => handleUpdate(plan.id)}>
                  ✏️
                </Button>{" "}
                <Button variant="danger" onClick={() => handleDelete(plan.id)}>
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

export default PlanPage;
