import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import ReactPaginate from "react-paginate";
import "./Leaderboard.css";
export default function Leaderboard() {
  const [data, setData] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const getLeaders = async (page) => {
    console.log(page);

    const res = await axios.get(
      process.env.REACT_APP_BASE + `/leaderboard?page=${page.selected}`
    );
    const data = res.data[0];
    setData(data);
    setPageCount(Math.ceil(res.data[1].count / 10));
  };

  useEffect(() => {
    getLeaders({ selected: 0 });
  }, []);
  return (
    <Container className="base" fluid>
      <Row>
        <Col xs={12} lg={12} md={12} className="d-flex justify-content-center">
          <h1>Leaderboard</h1>
        </Col>
        <Col xs={12} lg={12} md={12} style={{ padding: "5vh" }}>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Score</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <th scope="row">1</th>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Col>
        <Col>
          <ReactPaginate
            previousLabel={"previous"}
            nextLabel={"next"}
            breakLabel={"..."}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={getLeaders}
            containerClassName={"pagination justify-content-center"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousClassName={"page-item"}
            previousLinkClassName={"page-link"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link"}
            breakClassName={"page-item"}
            breakLinkClassName={"page-link"}
            activeClassName={"active"}
          />
        </Col>
      </Row>
    </Container>
  );
}
