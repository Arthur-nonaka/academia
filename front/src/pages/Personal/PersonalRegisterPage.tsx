import { useEffect, useState } from "react";
import { Breadcrumb, Button, Col, Container, Form, Row } from "react-bootstrap";
import {
  createPersonal,
  getPersonalById,
  updatePersonal,
} from "../../services/PersonalServices";
import { maskCPF, maskPhone } from "../../utils/maskUtils";
import { useNavigate, useParams } from "react-router-dom";

const PersonalRegisterPage = () => {
  const [data, setData] = useState({
    nome: "",
    email: "",
    telefone: "",
    cpf: "",
    dataNascimento: "",
  });

  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchPersonal = async (id: string) => {
      try {
        const result = await getPersonalById(id);
        const personal = result[0];
        setData({
          nome: personal.nome || "",
          email: personal.email || "",
          telefone: personal.telefone || "",
          cpf: personal.cpf || "",
          dataNascimento: personal.dataNascimento || "",
        });
      } catch (err) {
        console.log("Error fetching Personal: " + err);
        alert("Erro ao buscar personal.");
      }
    };

    if (id) {
      fetchPersonal(id);
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
        await updatePersonal(id, data);
        setData({
          nome: "",
          email: "",
          telefone: "",
          cpf: "",
          dataNascimento: "",
        });
        navigate("/personals");
      } catch (err) {
        console.log("Erro ao atualizar personal: " + err);
        alert("Erro ao atualizar personal." + err);
      }
    } else {
      try {
        const response = await createPersonal(data);
        console.log("Personal created:", response);
        setData({
          nome: "",
          email: "",
          telefone: "",
          cpf: "",
          dataNascimento: "",
        });
        navigate("/personals");
      } catch (error) {
        console.error("Erro ao registrar personal:", error);
        alert("Erro ao registrar personal. Tente novamente.");
      }
    }
  };

  return (
    <Container>
      <Breadcrumb>
        <Breadcrumb.Item href="/personals">Personal</Breadcrumb.Item>
        <Breadcrumb.Item active>
          {id ? "Atualizar" : "Registrar"} personal
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
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                name="email"
                value={data.email}
                onChange={handleChange}
                placeholder="Email"
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Telefone</Form.Label>
              <Form.Control
                type="text"
                name="telefone"
                value={data.telefone}
                onChange={(e) =>
                  setData({ ...data, telefone: maskPhone(e.target.value) })
                }
                placeholder="(00) 00000-0000"
                maxLength={15}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>CPF</Form.Label>
              <Form.Control
                type="text"
                name="cpf"
                value={data.cpf}
                onChange={(e) =>
                  setData({ ...data, cpf: maskCPF(e.target.value) })
                }
                placeholder="CPF"
                maxLength={14}
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group className="mb-3">
              <Form.Label>Data de Nascimento</Form.Label>
              <Form.Control
                type="date"
                name="dataNascimento"
                value={data.dataNascimento}
                onChange={handleChange}
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

export default PersonalRegisterPage;
