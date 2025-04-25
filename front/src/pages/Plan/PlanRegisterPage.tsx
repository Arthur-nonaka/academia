import { useEffect, useState } from "react";
import { Breadcrumb, Button, Col, Container, Form, Row } from "react-bootstrap";
import {
  createPlan,
  getPlanById,
  updatePlan,
} from "../../services/PlanServices";
import { maskCPF, maskPhone } from "../../utils/maskUtils";
import { useNavigate, useParams } from "react-router-dom";

const PlanRegisterPage = () => {
  const [data, setData] = useState({
    nome: "",
    valor: "",
    descricao: "",
    duracao: "",
  });

  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchPlan = async (id: string) => {
      try {
        const result = await getPlanById(id);
        const plan = result[0];
        setData({
          nome: plan.nome || "",
          valor: plan.valor || "",
          descricao: plan.descricao || "",
          duracao: plan.duracao || "",
        });
      } catch (err) {
        console.log("Error fetching plan: " + err);
        alert("Erro ao buscar plano.");
      }
    };

    if (id) {
      fetchPlan(id);
    }
  }, [id]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const isFormValid = Object.values(data).every(
      (value) => value.trim() !== ""
    );

    if (!isFormValid) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    if (id) {
      try {
        await updatePlan(id, data);
        setData({
          nome: "",
          valor: "",
          duracao: "",
          descricao: "",
        });
        navigate("/planos");
      } catch (err) {
        console.log("Erro ao atualizar plano: " + err);
        alert("Erro ao atualizar plano." + err);
      }
    } else {
      try {
        const response = await createPlan(data);
        console.log("Plan created:", response);
        setData({
          nome: "",
          valor: "",
          descricao: "",
          duracao: "",
        });
        navigate("/planos");
      } catch (error) {
        console.error("Erro ao registrar plano:", error);
        alert("Erro ao registrar plano. Tente novamente.");
      }
    }
  };

  return (
    <Container>
      <Breadcrumb>
        <Breadcrumb.Item href="/planos">Planos</Breadcrumb.Item>
        <Breadcrumb.Item active>
          {id ? "Atualizar" : "Registrar"} Plano
        </Breadcrumb.Item>
      </Breadcrumb>

      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                name="nome"
                value={data.nome}
                onChange={handleChange}
                placeholder="Nome"
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Valor</Form.Label>
              <Form.Control
                type="text"
                name="valor"
                value={data.valor}
                onChange={handleChange}
                placeholder="Valor"
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Descricao</Form.Label>
              <Form.Control
                type="text"
                name="descricao"
                value={data.descricao}
                onChange={(e) =>
                  setData({ ...data, descricao: maskPhone(e.target.value) })
                }
                placeholder="Descricao"
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Duração</Form.Label>
              <Form.Control
                type="text"
                name="duracao"
                value={data.duracao}
                onChange={(e) => setData({ ...data, duracao: e.target.value })}
                placeholder="Duração"
              />
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
export default PlanRegisterPage;
