import { useState } from "react";
import { Breadcrumb, Button, Col, Container, Form, Row } from "react-bootstrap";

const StudentRegisterPage = () => {
  const [data, setData] = useState({
    nome: "",
    email: "",
    telefone: "",
    cpf: "",
    dataNascimento: "",
    endereco: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const isFormValid = Object.values(data).every(
      (value) => value.trim() !== ""
    );

    if (!isFormValid) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    createStudent();
  };

  async function createStudent() {
    try {
      const response = await fetch("http://127.0.0.1:3001/api/student", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error: any) {
      console.error("Error creating student:", error.message);
      throw error;
    }
  }

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
                name="dataNasciment"
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
