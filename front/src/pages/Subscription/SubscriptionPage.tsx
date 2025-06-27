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
import {
  getSubscriptions,
  deleteSubscription,
} from "../../services/SubscriptionServices";
import { getStudents } from "../../services/StudentServices";
import { getPlans } from "../../services/PlanServices";
import { getPersonals } from "../../services/PersonalServices";

const SubscriptionPage = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [filters, setFilters] = useState({
    idAluno: "",
    idPersonal: "",
    idPlano: "",
  });
  type Aluno = { id: string; nome: string };
  type Personal = { id: string; nome: string };
  type Plano = { id_plano: string; nome: string };

  const [prevData, setPrevData] = useState<{
    alunos: Aluno[];
    personals: Personal[];
    planos: Plano[];
  }>({
    alunos: [],
    personals: [],
    planos: [],
  });

  const navigate = useNavigate();

  const fetchSubscriptions = useCallback(async () => {
    try {
      const data = await getSubscriptions(filters);
      setSubscriptions(data);
    } catch (error) {
      console.error("Erro ao buscar matriculas:", error);
      alert("Erro ao carregar a lista de matriculas.");
    }
  }, [filters]);

  useEffect(() => {
    fetchSubscriptions();

    const fetchStudentsData = async () => {
      try {
        const students = await getStudents();
        setPrevData((prev) => ({ ...prev, alunos: students }));
      } catch (err) {
        console.log("Error fetching students: " + err);
        alert("Erro ao buscar alunos.");
      }
    };

    const fetchPersonals = async () => {
      try {
        const personals = await getPersonals();
        setPrevData((prev) => ({ ...prev, personals }));
      } catch (err) {
        console.log("Error fetching personals: " + err);
        alert("Erro ao buscar personal.");
      }
    };

    const fetchPlans = async () => {
      try {
        const plans = await getPlans();
        setPrevData((prev) => ({ ...prev, planos: plans }));
      } catch (err) {
        console.log("Error fetching plans: " + err);
        alert("Erro ao buscar planos.");
      }
    };

    fetchStudentsData();
    fetchPersonals();
    fetchPlans();
  }, [fetchSubscriptions, filters]);

  const handleDelete = async (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir este matricula?")) {
      try {
        await deleteSubscription(id);
        fetchSubscriptions();
      } catch (error) {
        console.error("Erro ao excluir matricula:", error);
        alert("Erro ao excluir o matricula.");
      }
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setPrevData({ ...prevData, [name]: value });
  };

  const handleUpdate = async (id: string) => {
    navigate(`/assinaturas/atualizar/${id}`);
  };

  const handleRefresh = () => {
    fetchSubscriptions();
  };

  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item>Matriculas</Breadcrumb.Item>
      </Breadcrumb>
      <Nav>
        <Nav.Link as={Link} to="registrar">
          <Button value={"Registrar matricula"}>Registrar matricula</Button>
        </Nav.Link>
      </Nav>
      <Form className="mt-3">
        <h3>Filtros</h3>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Aluno</Form.Label>
              <Form.Select
                name="idAluno"
                value={filters.idAluno}
                onChange={handleChange}
              >
                <option value={""}>Selecione o Aluno</option>
                {prevData.alunos.map((aluno) => {
                  return (
                    <option key={aluno.id_aluno} value={aluno.id_aluno}>
                      {aluno.nome}
                    </option>
                  );
                })}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Professor</Form.Label>
              <Form.Select
                name="idPersonal"
                value={filters.idPersonal}
                onChange={handleChange}
              >
                <option value={""}>Selecione o Professor</option>
                {prevData.personals.map((aluno) => {
                  return (
                    <option key={aluno.id_professor} value={aluno.id_professor}>
                      {aluno.nome}
                    </option>
                  );
                })}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Plano</Form.Label>
              <Form.Select
                name="idPlano"
                value={filters.idPlano}
                onChange={handleChange}
              >
                <option value={""}>Selecione o Plano</option>
                {prevData.planos.map((aluno) => {
                  return (
                    <option key={aluno.id_plano} value={aluno.id_plano}>
                      {aluno.nome}
                    </option>
                  );
                })}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>
            <Button
              variant="secondary"
              onClick={() => {
                setFilters({
                  idAluno: "",
                  idPersonal: "",
                  idPlano: "",
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
            <th>Aluno</th>
            <th>Professor</th>
            <th>Plano</th>
            <th>Data Matricula</th>
            <th>Status</th>
            <th>
              {" "}
              <Button variant="secondary" onClick={handleRefresh}>
                ⟳
              </Button>{" "}
            </th>
          </tr>
        </thead>
        <tbody>
          {subscriptions.map((Subscription: any, index: number) => (
            <tr key={Subscription.id_matricula}>
              <td>
                {prevData.alunos.find(
                  (a) => a.id === Subscription.idAluno
                )?.nome || Subscription.idAluno}
              </td>
              <td>
                {prevData.personals.find(
                  (p) => p.id === Subscription.idPersonal
                )?.nome || Subscription.idPersonal}
              </td>
              <td>
                {prevData.planos.find(
                  (pl) => pl.id_plano === Subscription.idPlano
                )?.nome || Subscription.idPlano}
              </td>
              <td>{Subscription.dataMatricula}</td>
              <td>{Subscription.status}</td>
              <td>
                <Button
                  variant="warning"
                  onClick={() => handleUpdate(Subscription.id)}
                >
                  ✏️
                </Button>{" "}
                <Button
                  variant="danger"
                  onClick={() => handleDelete(Subscription.id)}
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

export default SubscriptionPage;
