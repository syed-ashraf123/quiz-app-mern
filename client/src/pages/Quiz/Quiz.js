import { Paper, Typography, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Quiz.css";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Quiz() {
  let navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState({});
  const [initialRender, setInitialRender] = useState(true);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showAns, setShowAns] = useState(false);

  const register = async () => {
    const name = searchParams.get("name");
    const email = searchParams.get("email");
    axios.post(process.env.REACT_APP_BASE + "/register", { name, email });
  };
  const getQuestions = async () => {
    const category = searchParams.get("category");
    const difficulty = searchParams.get("difficulty");
    const res = await axios(
      `${process.env.REACT_APP_BASE}/questions?category=${category}&difficulty=${difficulty}`
    );
    const response = await res.data;
    setQuestions(response);
  };
  const postScore = async () => {
    const name = searchParams.get("name");
    const email = searchParams.get("email");
    const res = await axios.post(`${process.env.REACT_APP_BASE}/register/`, {
      score,
      name,
      email,
    });
    const response = await res.data;
    console.log(response);
    navigate("/leaderboard");
  };
  const mergeOption = async (ans) => {
    console.log(questionIndex + 1);
    if (questionIndex + 1 === 11) postScore();
    setCurrentQuestion(null);
    setShowAns(false);
    await new Promise((r) => setTimeout(r, 50));
    const question = questions[questionIndex];
    const questionText = question.question;
    const questionOptions = question.incorrect_answers;
    questionOptions.push(question.correct_answer);
    questionOptions.sort(() => Math.random() - 0.5);
    const questionAnswer = questionOptions.indexOf(question.correct_answer);
    setCurrentQuestion({ questionText, questionOptions, questionAnswer });

    setQuestionIndex(questionIndex + 1);
  };
  useEffect(() => {
    if (initialRender) return setInitialRender(false);
    mergeOption();
  }, [questions]);
  useEffect(() => {
    register();
    getQuestions();
  }, []);
  const checkAnswer = (answer) => {
    if (currentQuestion.questionAnswer === answer) setScore(score + 1);
    setShowAns(true);
  };
  return (
    <Container className="jumbo">
      {/* <Row>
        <Col className="d-flex justify-content-center mt-2">
          <h1>Quiz is Active</h1>
        </Col>
      </Row> */}
      <Row className="jumbo">
        <Col className="d-flex justify-content-center align-items-center">
          <div className="jumbotron">
            <Row>
              <Col className="d-flex display-6 justify-content-start align-items-center">
                Quiz
              </Col>
              <Col className="d-flex display-6 justify-content-end align-items-center">
                Score {score}
              </Col>
            </Row>
            <Row>
              <Col>
                <hr />
              </Col>
            </Row>
            {questions.length && currentQuestion?.questionOptions && (
              <Row>
                <Col lg={12} sm={12} xs={12} xl={12} md={12}>
                  <Typography variant="h5" margin={1}>
                    {questionIndex}. {currentQuestion.questionText}
                  </Typography>
                </Col>

                {currentQuestion?.questionOptions?.map((option, index) => (
                  <Col lg={12} sm={12} xs={12} xl={12} md={12} key={index}>
                    <Paper
                      className={`paper ${
                        showAns &&
                        index === currentQuestion.questionAnswer &&
                        "bg-success"
                      }`}
                    >
                      <input
                        name="option"
                        type="radio"
                        id={index}
                        value={index}
                        onChange={(e) => {
                          checkAnswer(index);
                        }}
                      />
                      <label htmlFor={index}>{option}</label>
                    </Paper>
                  </Col>
                ))}
                <Button
                  onClick={() => mergeOption()}
                  style={{ marginTop: "2vh" }}
                >
                  Next
                </Button>
              </Row>
            )}
            <Row>
              <Col>
                <hr />
              </Col>
            </Row>
            <Row>
              <Col className="d-flex justify-content-between">
                <Typography variant="h6">
                  {questionIndex} of 10 Questions
                </Typography>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Quiz;
