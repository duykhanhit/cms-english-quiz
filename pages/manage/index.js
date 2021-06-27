import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "../../components/Header";
import { Container, Table, Button, Row, Col } from "reactstrap";

import { getExams, getMe } from "../../api";

export default function Manage() {
  const [user, setUser] = useState({});
  const [token, setToken] = useState("");
  const [exams, setExams] = useState([]);
  const router = useRouter();

  const handleGetMe = async (token) => {
    try {
      const { data } = await getMe(token);
      setUser(data?.data);
    } catch (error) {
      router.push("/login");
    }
  };

  useEffect(() => {
    const localToken = localStorage.getItem("token");
    if (!localToken) {
      return router.push("/login");
    }
    setToken(localToken);
    handleGetMe(localToken);
    handleGetExams(localToken);
  }, []);

  const handleGetExams = async (token) => {
    try {
      const { data } = await getExams(token);
      setExams(data?.data);
    } catch (error) {}
  };

  const renderExams = (exams) => {
    return exams.map((exam, index) => {
      return (
        <tr key={index}>
          <th scope="row">{index + 1}</th>
          <td>
            <Link href={`/exam/${exam._id}`}>
              <a>{exam.name}</a>
            </Link>
          </td>
          <td>{exam?.type}</td>
          <td>
            <Button color="danger">Xoá</Button>
          </td>
        </tr>
      );
    });
  };

  return (
    <div>
      <Header title="Trang quản lý" />
      <Container>
        <Row style={{ textAlign: "center" }}>
          <h1>Quản lý đề thi</h1>
        </Row>

        <Row>
          <Col md="10">
            <span>
              Xin chào <b>{user.name}</b> !
            </span>{" "}
          </Col>
          <Col>
            <Button color="success">
              {" "}
              <Link href="/manage/add-exam">
                <a style={{ textDecoration: "none", color: "white" }}>
                  Thêm đề mới
                </a>
              </Link>
            </Button>
          </Col>
        </Row>
      </Container>
      <Container>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Tên đề</th>
              <th>Loại đề</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>{exams && renderExams(exams)}</tbody>
        </Table>
      </Container>
    </div>
  );
}
