import { useEffect, useState } from "react";
import { Breadcrumb, Button, Col, Container, Form, Row } from "react-bootstrap";
import {
  createSubscription,
  getSubscriptionById,
  updateSubscription,
} from "../../services/SubscriptionServices";
import { getStudents } from "../../services/StudentServices";
import { getPlans } from "../../services/PlanServices";
import { getPersonals } from "../../services/PersonalServices";
import { useNavigate, useParams } from "react-router-dom";

const SubscriptionRegisterPage = () => {
  const [data, setData] = useState({
    status: "",
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

  console.log(prevData);
  console.log(data);

  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchSubscription = async (id: string) => {
      try {
        const result = await getSubscriptionById(id);
        const subscription = result[0];
        console.log(subscription);
        setData({
          status: subscription.status || "",
          idAluno: subscription.idAluno || "",
          idPersonal: subscription.idPersonal || "",
          idPlano: subscription.idPlano || "",
        });
      } catch (err) {
        console.log("Error fetching Subscription: " + err);
        alert("Erro ao buscar matricula.");
      }
    };

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

    if (id) {
      fetchSubscription(id);
    }

    fetchStudentsData();
    fetchPersonals();
    fetchPlans();
  }, [id]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!data.status || !data.idAluno || !data.idPersonal || !data.idPlano) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    if (id) {
      try {
        await updateSubscription(id, data);
        setData({
          status: "",
          idAluno: "",
          idPersonal: "",
          idPlano: "",
        });
        navigate("/assinaturas");
      } catch (err) {
        console.log("Erro ao atualizar matricula: " + err);
        alert("Erro ao atualizar matricula." + err);
      }
    } else {
      try {
        const response = await createSubscription(data);
        console.log("Subscription created:", response);
        setData({
          status: "",
          idAluno: "",
          idPersonal: "",
          idPlano: "",
        });
        navigate("/assinaturas");
      } catch (error) {
        console.error("Erro ao registrar matricula:", error);
        alert("Erro ao registrar aluno. Tente novamente.");
      }
    }
  };

  return (
    <Container>
      <Breadcrumb>
        <Breadcrumb.Item href="/assinaturas">Matriculas</Breadcrumb.Item>
        <Breadcrumb.Item active>
          {id ? "Atualizar" : "Registrar"} Matricula
        </Breadcrumb.Item>
      </Breadcrumb>

      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select
                name="status"
                value={data.status}
                onChange={handleChange}
              >
                <option value={""}>Selecione o Status</option>
                <option value={"Ativo"}>Ativo</option>
                <option value={"Finalizado"}>Finalizado</option>
                <option value={"Descontinuado"}>Descontinuado</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Aluno</Form.Label>
              <Form.Select
                name="idAluno"
                value={data.idAluno}
                onChange={handleChange}
              >
                <option value={""}>Selecione o Aluno</option>
                {prevData.alunos.map((aluno) => {
                  return (
                    <option key={aluno.id} value={aluno.id}>
                      {aluno.nome}
                    </option>
                  );
                })}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Professor</Form.Label>
              <Form.Select
                name="idPersonal"
                value={data.idPersonal}
                onChange={handleChange}
              >
                <option value={""}>Selecione o Professor</option>
                {prevData.personals.map((personal) => {
                  return (
                    <option key={personal.id} value={personal.id}>
                      {personal.nome}
                    </option>
                  );
                })}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Plano</Form.Label>
              <Form.Select
                name="idPlano"
                value={data.idPlano}
                onChange={handleChange}
              >
                <option value={""}>Selecione o Plano</option>
                {prevData.planos.map((planos) => {
                  return (
                    <option key={planos.id_plano} value={planos.id_plano}>
                      {planos.nome}
                    </option>
                  );
                })}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <Button variant="primary" type="submit">
          {id ? "Atualizar" : "Registrar"}
        </Button>
      </Form>
    </Container>
  );
};

export default SubscriptionRegisterPage;
