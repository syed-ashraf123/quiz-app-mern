import React, { useState, useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
} from "@mui/material";
import "./Home.css";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80vh",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
function Home() {
  const [open, setOpen] = useState(false);
  const [go, setGo] = useState(false);
  const [categories, setCategories] = useState([]);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [difficulty, setDifficulty] = useState("easy");
  const [category, setCategory] = useState("Sports");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  let navigate = useNavigate();

  // Getting All Categories
  const getCategories = async () => {
    const res = await axios(process.env.REACT_APP_BASE + "/categories");
    const response = await res.data;
    setCategories(response);
  };

  // Handling Forms
  const handleSubmit = async (e, data) => {
    e.preventDefault();
    navigate(
      `/quiz?category=${category}&name=${name}&email=${email}&difficulty=${difficulty}`
    );
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <Container className="container">
        <Row>
          <Col className="d-flex justify-content-center m-5">
            <h1>Quiz App</h1>
          </Col>
        </Row>
        <Row className="box">
          <Col className="d-flex justify-content-center align-items-center">
            <>
              <Button
                onClick={handleOpen}
                variant="contained"
                className="startButtom"
              >
                Start Quiz
              </Button>
              <Modal
                open={open}
                onClose={() => {
                  handleClose();
                  setGo(false);
                }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  {!go ? (
                    <>
                      <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                      >
                        Some Rules of the Quiz
                      </Typography>
                      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        1. You will have only <span>15 seconds</span> per each
                        question.
                      </Typography>
                      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        2. Once you select your answer, it can't be undone.{" "}
                      </Typography>
                      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        3. You can't select any option once time goes off.
                      </Typography>{" "}
                      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        4. You can't exit from the Quiz while you're playing.{" "}
                      </Typography>{" "}
                      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        5. You'll get points on the basis of your correct
                        answers.
                      </Typography>
                      <div>
                        <Row>
                          <Col className="d-flex align-items-center justify-content-end mt-2">
                            <Button
                              variant="contained"
                              color="warning"
                              className="quitButton"
                              onClick={handleClose}
                            >
                              Quit
                            </Button>
                            <Button
                              variant="contained"
                              onClick={() => setGo(true)}
                            >
                              {/* <Link to="/quiz" className="anchor"> */}
                              Continue
                              {/* </Link> */}
                            </Button>
                          </Col>
                        </Row>
                      </div>
                    </>
                  ) : (
                    <>
                      <form onSubmit={handleSubmit}>
                        <Typography
                          id="modal-modal-title"
                          variant="h6"
                          component="h2"
                        >
                          Please Enter the Quiz Details
                        </Typography>
                        <br />
                        <Row className="mb-4">
                          <TextField
                            id="outlined-basic"
                            label="Enter your name"
                            variant="outlined"
                            onChange={(e) => setName(e.target.value)}
                            required
                          />
                        </Row>
                        <Row className="mb-4">
                          <TextField
                            id="outlined-basic"
                            label="Enter your email"
                            variant="outlined"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                        </Row>
                        <Row>
                          <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">
                              Select Category
                            </InputLabel>
                            <Select
                              label="Category"
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              required
                              onChange={(e) => setCategory(e.target.value)}
                            >
                              {categories.map((categor, idx) => (
                                <MenuItem value={categor} key={idx}>
                                  {categor}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Row>
                        <Row className="mb-4 mt-4">
                          <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">
                              Select Category
                            </InputLabel>
                            <Select
                              label="Category"
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              required
                              onChange={(e) => setDifficulty(e.target.value)}
                            >
                              <MenuItem value={"easy"}>Easy</MenuItem>
                              <MenuItem value={"medium"}>Medium</MenuItem>

                              <MenuItem value={"hard"}>Hard</MenuItem>
                            </Select>
                          </FormControl>
                        </Row>
                        <Row className="mt-4">
                          <Button variant="contained" type="submit">
                            Submit
                          </Button>
                        </Row>
                      </form>
                    </>
                  )}
                </Box>
              </Modal>
            </>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Home;
