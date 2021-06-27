import Header from "../../components/Header";
import {
  Col,
  Container,
  Form,
  Row,
  FormGroup,
  Label,
  Input,
  Button,
  Alert,
} from "reactstrap";
import { useEffect, useState } from "react";

import { getMe, login } from "../../api";
import { useRouter } from "next/dist/client/router";
// import axios from "axios";

export default function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  const handleGetMe = async (token) => {
    try {
      const { data } = await getMe(token);
      router.push("/manage");
    } catch (error) {
      router.push("/login");
    }
  };

  useEffect(() => {
    const localToken = localStorage.getItem("token");

    handleGetMe(localToken);
  }, []);

  const handleOnChange = (e) => {
    const value = e.target.value;
    setUser({
      ...user,
      [e.target.name]: value,
    });
  };

  const handleLogin = async (e) => {
    try {
      const { data } = await login(user);
      localStorage.setItem("token", data.token);
      router.push("/manage");
    } catch (error) {
      setIsSuccess(true);
    }
    e.preventDefault();
  };

  return (
    <div>
      <Header title="Đăng nhập hệ thống" />
      <Container className="center">
        <Row style={{ textAlign: "center" }}>
          <Col>
            <h1>ĐĂNG NHẬP HỆ THỐNG</h1>
          </Col>
        </Row>
        <Row>
          <Col sm="12" md={{ size: 4, offset: 4 }}>
            <Form>
              {isSuccess && <Alert color="danger">Đăng nhập thất bại</Alert>}
              <FormGroup>
                <Label>Email:</Label>
                <Input
                  type="text"
                  name="email"
                  value={user.email}
                  onChange={handleOnChange}
                  placeholder="Enter email"
                />
              </FormGroup>
              <FormGroup>
                <Label>Password:</Label>
                <Input
                  type="password"
                  name="password"
                  value={user.password}
                  onChange={handleOnChange}
                  placeholder="Enter password"
                />
              </FormGroup>
              <div style={{ textAlign: "center" }}>
                <Button
                  className="mt-3"
                  color="primary"
                  onClick={(e) => handleLogin(e)}
                >
                  Đăng nhập
                </Button>{" "}
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
