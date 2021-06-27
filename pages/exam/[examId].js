import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import Header from "../../components/Header";
import CardQues from "../../components/CardQues";
import { getExamDetail } from "../../api";
import { Container, Row } from "reactstrap";
import { initExam } from "../../data/initExam";

export default function getExam() {
  const { query } = useRouter();
  const router = useRouter();
  const { examId } = query;

  const [exam, setExam] = useState([]);

  useEffect(() => {
    const localToken = localStorage.getItem("token");
    examId && handleGetExam(localToken, examId);
    return setExam(initExam);
  }, [examId]);

  const handleGetExam = async (token, examId) => {
    if (!token || !examId) {
      return router.push("/login");
    }
    try {
      const { data } = await getExamDetail(token, examId);
      setExam(data?.data);
    } catch (error) {
      router.push("/login");
    }
  };

  const renderAnswer = (exam) => {
    const cpyExam = [...initExam];
    for (let i = 0; i < exam.length; i++) {
      cpyExam[i] = exam[i];
    }
    return cpyExam.map((ex, index) => (
      <CardQues index={index + 1} exam={ex} examId={examId} key={index} />
    ));
  };

  return (
    <div>
      <Header title="Chi tiết đề thi" />
      <Container>
        <Row style={{ textAlign: "center" }}>
          <h1>DANH SÁCH CÂU HỎI</h1>
        </Row>
        {renderAnswer(exam)}
      </Container>
    </div>
  );
}
