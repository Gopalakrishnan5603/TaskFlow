
import { Container, Card } from "react-bootstrap";

function Register() {
  return (
    <Container className="mt-5">
      <Card className="mx-auto shadow" style={{ maxWidth: "400px" }}>
        <Card.Body>
          <h3 className="text-center mb-4">Create Account</h3>
          <p className="text-center text-muted">
            Join TaskFlow today!
          </p>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Register;
