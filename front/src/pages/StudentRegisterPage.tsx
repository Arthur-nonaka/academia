import { useState } from "react";
import { Breadcrumb, Button, Col, Container, Form, Row } from "react-bootstrap";
import { createStudent } from "../services/StudentServices";
import { useNavigate } from "react-router-dom";

const StudentRegisterPage = () => {
  const [data, setData] = useState({
    nome: "",
    email: "",
    telefone: "",
    cpf: "",
    dataNascimento: "",
    endereco: "",
  });

  const navigate = useNavigate();

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

    try {
      const response = await createStudent(data);
      alert("Aluno registrado com sucesso!");
      console.log("Student created:", response);
      setData({
        nome: "",
        email: "",
        telefone: "",
        cpf: "",
        dataNascimento: "",
        endereco: "",
      });
      navigate("/alunos");
    } catch (error) {
      console.error("Erro ao registrar aluno:", error);
      alert("Erro ao registrar aluno. Tente novamente.");
    }
  };

  return (
    <Container>
      <Breadcrumb>
        <Breadcrumb.Item href="/alunos">Alunos</Breadcrumb.Item>
        <Breadcrumb.Item active>Registrar Aluno</Breadcrumb.Item>
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
                onChange={handleChange}
                placeholder="(00) 00000-0000"
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
                onChange={handleChange}
                placeholder="CPF"
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
        <Row>
          <Form.Group className="mb-3">
            <Form.Label>Endereço</Form.Label>
            <Form.Control
              type="text"
              name="endereco"
              value={data.endereco}
              onChange={handleChange}
              placeholder="Endereço"
            />
          </Form.Group>
        </Row>

        <Button variant="primary" type="submit">
          Registrar
        </Button>
      </Form>
    </Container>
  );
};

export default StudentRegisterPage;
