import { useEffect, useState } from "react";
import { Col, Row, Input, Button, FormGroup, Label } from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import { createAnswers, createQuestion } from "../api";

export default function CardQues(props) {
  const [question, setQuestion] = useState({
    _id: "",
    exam_id: "",
    content: "",
  });

  const { exam, examId } = props;

  const [ans, setAns] = useState([
    {
      _id: "",
      question_id: "",
      content: "",
      isCorrect: false,
    },
  ]);

  const notifySuccess = () => toast("Thêm thành công!");
  const notifyFail = () => toast("Lỗi khi thêm. Vui lòng F5 để làm lại.");

  useEffect(() => {
    setQuestion(exam);
    exam.answers.length && setAns(exam.answers);
  }, [exam] || [ans]);

  const handleOnChangeQuestion = (e) => {
    const value = e.target.value;
    setQuestion({
      ...question,
      exam_id: examId,
      [e.target.name]: value,
    });
  };

  const handleOnchangeSelect = (e) => {
    const isCorrect = e.target.checked ? true : false;
    let newAns = [...ans];
    newAns[e.target.alt] = {
      ...ans[e.target.alt],
      isCorrect,
    };
    newAns.forEach((a, i) => {
      if (i != e.target.alt) {
        a.isCorrect = false;
      }
    });
    setAns(newAns);
  };

  const handleOnchangeAnswer = (e) => {
    let newAns = [...ans];
    newAns[e.target.alt] = {
      ...ans[e.target.alt],
      content: e.target.value,
    };
    setAns(newAns);
  };

  const onSubmitAnswer = async (e) => {
    const newAns = [...ans];
    newAns.forEach((a) => {
      a.question_id = question._id;
      if (!a._id) {
        delete a._id;
      }
    });
    if (newAns.length !== 4) {
      return notifyFail();
    }
    try {
      const token = localStorage.getItem("token");
      await createAnswers(token, newAns);
      notifySuccess();
    } catch (error) {
      notifyFail();
    }
    e.preventDefault();
    console.log("a", ans);
  };

  const onSubmitQuestion = async (e) => {
    try {
      const token = localStorage.getItem("token");
      if (question._id) {
        await createQuestion(token, {
          _id: question._id,
          exam_id: question.exam_id,
          content: question.content,
        });
      } else {
        const { data } = await createQuestion(token, {
          exam_id: question.exam_id,
          content: question.content,
        });

        setQuestion({
          ...question,
          _id: data.data._id,
        });
      }

      notifySuccess();
    } catch (error) {
      notifyFail();
    }
    e.preventDefault();
  };

  return (
    <div>
      <Row>
        <b>Câu {props.index}:</b>
      </Row>
      <Row className="mb-5">
        <Col md="5" className="mt-2">
          <Input
            value={question.content}
            name="content"
            onChange={handleOnChangeQuestion}
          />
        </Col>
        <Col md="1" className="mt-2">
          <Button onClick={onSubmitQuestion} color="success">
            Sửa
          </Button>
        </Col>
        <Col md="5">
          {ans.map((e, i) => {
            return (
              <FormGroup key={i} check>
                <Label check>
                  <Input
                    onChange={handleOnchangeSelect}
                    type="radio"
                    name={`${e._id}-${i}`}
                    className="mt-3"
                    alt={i}
                    checked={e.isCorrect}
                  />
                  <Input
                    className="mt-2"
                    alt={i}
                    name="content"
                    value={e.content}
                    onChange={handleOnchangeAnswer}
                  />
                </Label>
              </FormGroup>
            );
          })}
        </Col>
        <Col md="1" className="mt-2">
          <Button onClick={(e) => onSubmitAnswer(e)} color="success">
            Sửa
          </Button>
        </Col>
      </Row>
      <ToastContainer />
    </div>
  );
}
