import { util } from '../utils/Utils.js'
import { FaRegListAlt } from 'react-icons/fa';
import { ListGroup, Row, Col, Badge } from 'react-bootstrap';

export default function Transaction(props) {
    return (<ListGroup.Item>
        <Row>
            <Col xs={1} style={{ padding: 0 }} className="d-flex align-items-center justify-content-center">
                <FaRegListAlt />
            </Col>
            <Col xs={4}>
                <h6 style={{ marginBottom: 0 }}>{props ? util.formatAddressEllipsisEnd(props.hash) : null}</h6>
                {props.timeStamp ? util.formatDate(props.timeStamp) : null}
            </Col>
            <Col xs={5}>
                From: {props.from ? util.formatAddressEllipsisCenter(props.from) : null}<br />
                To: {props.to ? util.formatAddressEllipsisCenter(props.to) : null}
            </Col>
            <Col xs={2}>
                <Badge bg="light" text="dark">
                    {props.gas ? util.formatGas(props.gas) : null}{' '}eth
                </Badge>
            </Col>
        </Row></ListGroup.Item>
    );
}