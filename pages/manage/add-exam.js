import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import {
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Button,
  Row,
  Col,
  Alert,
} from "reactstrap";
import { createExam, getMe } from "../../api";
import Header from "../../components/Header";

export default function AddExam() {
  const [exam, setExam] = useState({
    name: "",
    type: "vocabulary",
  });
  const [isSuccess, setIsSuccess] = useState(false);
  const [token, setToken] = useState("");
  const router = useRouter();

  useEffect(() => {
    const localToken = localStorage.getItem("token");
    if (!localToken) {
      return router.push("/login");
    }
    setToken(localToken);
    handleGetMe(localToken);
  }, []);

  const handleGetMe = async (token) => {
    try {
      const { data } = await getMe(token);
    } catch (error) {
      router.push("/login");
    }
  };

  const handleOnChange = (e) => {
    const value = e.target.value;
    setExam({
      ...exam,
      [e.target.name]: value,
    });
  };

  const handleCreateExam = async (e) => {
    try {
      const { data } = await createExam(token, exam);
      router.push(`/exam/${data.data._id}`);
    } catch (error) {
      setIsSuccess(true);
    }
    e.preventDefault();
  };

  console.log(exam);

  return (
    <>
      <Header title="Thêm đề kiểm tra" />
      <Container>
        <Row>
          <Col sm="12" md={{ size: 4, offset: 4 }}>
            <Form>
              {isSuccess && <Alert color="danger">Tạo mới thất bại</Alert>}
              <FormGroup>
                <Label>Tên đề:</Label>
                <Input
                  name="name"
                  value={exam.name}
                  onChange={handleOnChange}
                />
              </FormGroup>
              <FormGroup>
                <Label>Loại đề:</Label>
                <Input
                  type="select"
                  value={exam.type}
                  name="type"
                  onChange={handleOnChange}
                >
                  <option value="vocabulary">Vocabulary</option>
                  <option value="grammar">Grammar</option>
                </Input>
              </FormGroup>

              <Button
                className="mt-2"
                color="primary"
                onClick={(e) => handleCreateExam(e)}
              >
                Tạo
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}
