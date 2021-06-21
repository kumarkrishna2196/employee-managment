
import './App.css';
import Routes from './Routes';
import { Row, Col, Button } from 'reactstrap';
import {history} from "./store/configureStore"
import { PAGE_PATHS } from './constants/PagePaths';

function App() {
  return (
    <div className="App">
      <Row style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'left'}}>
        <Col md={1}>
        <Button
        color={"primary"}
        onClick={() => history.push(PAGE_PATHS.HOME)}
        >
          Home
        </Button>
        </Col>
        <Col md={1}>
        <Button
        color={"primary"}
        onClick={() => history.push(PAGE_PATHS.CREATE)}
        >
          Add
        </Button>
        </Col>
      </Row>
      <Routes/>
    </div>
  );
}

export default App;
