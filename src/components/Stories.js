import React, { useRef, useState, useEffect } from "react";
import {
  Form,
  Button,
  Card,
  Alert,
  Row,
  Col,
  Container,
  Navbar,
  Nav,
} from "react-bootstrap";
import api from "../services/apiService";
import { useAuth } from "../services/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Stories() {
  const { currentUser } = useAuth();

  const [prompt, setPrompt] = useState("");
  const [title, setTitle] = useState("");
  const [liberalStory, setLiberalStory] = useState("");
  const [conservativeStory, setConservativeStory] = useState("");

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit() {
    // e.preventDefault();
    try {
      setError("");
      setLoading(true);

      await queryStory(prompt);
    } catch {
      setError("Failed to log in");
    }

    setLoading(false);
  }
  async function queryStory(prompt) {
    try {
      await api
        .createStory("From a liberal perspective, " + prompt, currentUser)
        .then((response) => {
          console.log(response);
          setLiberalStory(response.data);
          console.log("@@@@@@@@@@@@@@");

          console.log(liberalStory);
        });
    } catch {
      setError("Failed to load story");
    }
    try {
      await api
        .createStory("From a conservative perspective, " + prompt, currentUser)
        .then((response) => {
          console.log(response.data);
          setConservativeStory(response.data);
          console.log("####################");

          console.log(conservativeStory);
        });
    } catch {
      setError("Failed to load story");
    }

    setLoading(false);
  }
  async function regenerateStory(side) {
    const singlePrompt =
      side === "left"
        ? "From a liberal perspective, " + prompt
        : "From a conservative perspective, " + prompt;
    try {
      await api.createStory(singlePrompt, currentUser).then((response) => {
        console.log(response);

        side === "left"
          ? setLiberalStory(response.data)
          : setConservativeStory(response.data);
        console.log("@@@@@@@@@@@@@@");

        console.log(liberalStory);
      });
    } catch {
      setError("Failed to load story");
    }
  }
  async function postStories() {
    try {
      await api
        .postStory(liberalStory, "Liberal", title, currentUser)
        .then((response) => {
          console.log(response);
          setLiberalStory(response.data);
          console.log("@@@@@@@@@@@@@@");

          console.log(liberalStory);
        });
    } catch {
      setError("Failed to load story");
    }
    try {
      await api
        .postStory(conservativeStory, "Conservative", title, currentUser)
        .then((response) => {
          console.log(response.data);
          setConservativeStory(response.data);
          console.log("&&&&&&&&&&&&&&&&&");

          console.log("Success");
        });
    } catch {
      setError("Failed to load story");
    }

    setLoading(false);
  }

  return (
    <>
      <Container
        // className="body"
        // fluid
        style={{
          maxHeight: "100%",
          minHeight: "90%",
          width: "100%",
          maxWidth: "100%",
          minWidth: "100%",
        }}
      >
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="/">Navbar</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="#Custom">Custom Prompts</Nav.Link>
              <Nav.Link href="#Predetermined">Predetermined Prompts</Nav.Link>
              {/* <Nav.Link href="#pricing">Pricing</Nav.Link> */}
            </Nav>
          </Container>
        </Navbar>
        <Container
          className="body"
          fluid
          style={{ maxHeight: "100%", minHeight: "90%", width: "90%" }}
        >
          <br />
          {/* <div className="h-100"> */}
          <Row fluid style={{ maxHeight: "100%", minHeight: "90%" }}>
            <Col>
              <Container
                className="body"
                fluid
                style={{ maxHeight: "100%", minHeight: "90%", height: 175 }}
              >
                <Card
                  style={{
                    maxHeight: "100%",
                    minHeight: "90%",
                  }}
                >
                  <Card.Body>
                    <h4 className="text-left ">Prompt</h4>
                    {/* {error && <Alert variant="danger">{error}</Alert>} */}
                    <Form
                      style={{
                        maxHeight: "100%",
                        minHeight: "90%",
                        height: 85,
                      }}
                    >
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      ></Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                      >
                        <Form.Control
                          as="textarea"
                          rows={3}
                          value={prompt}
                          onChange={(e) => setPrompt(e.target.value)}
                          type="text"
                          style={{
                            maxHeight: "100%",
                            minHeight: "90%",
                            height: 35,
                          }}
                        />
                      </Form.Group>
                      <Button variant="primary" onClick={handleSubmit}>
                        Send Prompt
                      </Button>
                    </Form>
                  </Card.Body>
                </Card>
              </Container>
            </Col>
            <Col>
              <Card
                style={{
                  maxHeight: "100%",
                  minHeight: "90%",
                  background:
                    liberalStory === "" && conservativeStory === ""
                      ? "#9e9e9e"
                      : "white",
                }}
              >
                <Card.Body>
                  <h4>Article Title</h4>
                  {/* {error && <Alert variant="danger">{error}</Alert>} */}
                  <Form
                    style={{
                      maxHeight: "100%",
                      minHeight: "90%",
                      height: 85,
                    }}
                  >
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    ></Form.Group>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlTextarea1"
                    >
                      <Form.Control
                        style={{
                          maxHeight: "100%",
                          minHeight: "60%",
                          height: 35,
                          background:
                            liberalStory === "" && conservativeStory === ""
                              ? "lightgrey"
                              : "white",
                        }}
                        as="textarea"
                        rows={3}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        type="text"
                      />
                    </Form.Group>
                    <Button
                      variant="primary"
                      onClick={postStories}
                      disabled={liberalStory === "" && conservativeStory === ""}
                    >
                      Send to App
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <div style={{ maxHeight: "100%", minHeight: "60%", height: 5 }}></div>
          <Row fluid style={{ maxHeight: "100%", minHeight: "90%" }}>
            <Col>
              {" "}
              <Container
                className="body"
                fluid
                style={{ maxHeight: "1000px", minHeight: "90%" }}
              >
                <Card height={200}>
                  <Card.Body>
                    <h2 className="text-center mb-4">Liberal Stories</h2>
                    {/* {error && <Alert variant="danger">{error}</Alert>} */}
                    <Form style={{ maxHeight: "100%", minHeight: "90%" }}>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      ></Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                      >
                        <Form.Control
                          style={{
                            maxHeight: "100%",
                            minHeight: "60%",
                            height: 400,
                          }}
                          as="textarea"
                          rows={3}
                          value={liberalStory}
                        />
                      </Form.Group>

                      <Button
                        variant="primary"
                        aria-disabled={prompt === "" ? "true" : "false"}
                        onClick={() => regenerateStory("left")}
                      >
                        Regenerate
                      </Button>
                    </Form>
                  </Card.Body>
                </Card>
              </Container>
            </Col>

            <Col>
              {" "}
              <Card>
                <Card.Body>
                  <h2 className="text-center mb-4">Conservative Stories</h2>
                  {/* {error && <Alert variant="danger">{error}</Alert>} */}
                  <Form>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    ></Form.Group>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlTextarea1"
                    >
                      <Form.Control
                        style={{
                          maxHeight: "100%",
                          minHeight: "60%",
                          height: 400,
                        }}
                        as="textarea"
                        rows={3}
                        value={conservativeStory}
                      />
                    </Form.Group>
                    <Button
                      aria-disabled={prompt === "" ? "true" : "false"}
                      variant="primary"
                      onClick={() => regenerateStory("right")}
                    >
                      Regenerate
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <div style={{ maxHeight: "100%", minHeight: "60%", height: 5 }}></div>
        </Container>
      </Container>
      {/* </div> */}
    </>
  );
}

// <Row>
// <Col>
//   <Container
//     className="body"
//     fluid
//     style={{ maxHeight: "100%", minHeight: "90%", height: 50 }}
//   >
//     <Card>
//       <Card.Body>
//         <h4 className=" mb-4">Article Title</h4>
//         {/* {error && <Alert variant="danger">{error}</Alert>} */}
//         <Form
//           style={{ maxHeight: "100%", minHeight: "90%", height: 100 }}
//         >
//           <Form.Group
//             className="mb-3"
//             controlId="exampleForm.ControlInput1"
//           ></Form.Group>
//           <Form.Group
//             className="mb-3"
//             controlId="exampleForm.ControlTextarea1"
//           >
//             <Form.Control
//               style={{
//                 maxHeight: "100%",
//                 minHeight: "60%",
//                 height: 50,
//               }}
//               as="textarea"
//               rows={3}
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               type="text"
//             />
//           </Form.Group>
//           <Button variant="primary" onClick={postStories}>
//             Send to App
//           </Button>
//         </Form>
//       </Card.Body>
//     </Card>
//   </Container>
// </Col>
// </Row>
