import { useState, useEffect } from 'react';
import { Card, Row, Col, Container } from 'react-bootstrap';
import { FaClock, FaGlobe, FaGasPump, FaEthereum, FaHashtag, FaTerminal } from 'react-icons/fa';
import { alchemy, util } from '../utils/Utils.js'

function DashboardCard() {
    const [blockNumber, setBlockNumber] = useState('');
    const [gasPrice, setGasPrice] = useState('');

    async function getBlockNumber() {
        setBlockNumber(await alchemy.core.getBlockNumber());
    }
    async function getGasPrice() {
        setGasPrice((await alchemy.core.getGasPrice())._hex);
    }
    useEffect(() => {
        const interval = setInterval(() => {
            getBlockNumber();
            getGasPrice();
        }, 15000);
        return () => clearInterval(interval);
    }, []);

    return (
        <Container >
            <Card bg={'light'}>
                <Card.Body>
                    <Row>
                        <Col>
                            <Row>
                                <Col xs={1} style={{ padding: 0 }} className="d-flex align-items-center justify-content-center">
                                    <FaEthereum />
                                </Col>
                                <Col style={{ padding: 0 }}>
                                    <h5 style={{ marginBottom: 0 }}>Ether Price</h5>
                                    <div style={{ marginTop: 0 }} className="text-muted">$1,920.99</div>
                                </Col>
                            </Row>
                        </Col>
                        <Col>
                            <Row>
                                <Col xs={1} style={{ padding: 0 }} className="d-flex align-items-center justify-content-center">
                                    <FaGasPump />
                                </Col>
                                <Col style={{ padding: 0 }}>
                                    <h5 style={{ marginBottom: 0 }}>Gas Price</h5>
                                    <div style={{ marginTop: 0 }} className="text-muted">{util.formatGasPrice(gasPrice)}</div>
                                </Col>
                            </Row>
                        </Col>
                        <Col>
                            <Row>
                                <Col xs={1} style={{ padding: 0 }} className="d-flex align-items-center justify-content-center">
                                    <FaHashtag />
                                </Col>
                                <Col style={{ padding: 0 }}>
                                    <h5 style={{ marginBottom: 0 }}>Network</h5>
                                    <div style={{ marginTop: 0 }} className="text-muted">Ethereum Mainnet</div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Row>
                                <Col xs={1} style={{ padding: 0 }} className="d-flex align-items-center justify-content-center">
                                    <FaGlobe />
                                </Col>
                                <Col style={{ padding: 0 }}>
                                    <h5 style={{ marginBottom: 0 }}>Market Cap</h5>
                                    <div style={{ marginTop: 0 }} className="text-muted">$231,360,185,347.00</div>
                                </Col>
                            </Row>
                        </Col>
                        <Col>
                            <Row>
                                <Col xs={1} style={{ padding: 0 }} className="d-flex align-items-center justify-content-center">
                                    <FaClock />
                                </Col>
                                <Col style={{ padding: 0 }}>
                                    <h5 style={{ marginBottom: 0 }}>Last Block Number</h5>
                                    <div style={{ marginTop: 0 }} className="text-muted">{blockNumber}</div>
                                </Col>
                            </Row>
                        </Col>
                        <Col>
                            <Row>
                                <Col xs={1} style={{ padding: 0 }} className="d-flex align-items-center justify-content-center">
                                    <FaTerminal />
                                </Col>
                                <Col style={{ padding: 0 }}>
                                    <h5 style={{ marginBottom: 0 }}>Protocol version</h5>
                                    <div style={{ marginTop: 0 }} className="text-muted">65</div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default DashboardCard;