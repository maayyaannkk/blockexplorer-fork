import React from 'react';
import { useState, useEffect } from 'react';
import { Form, InputGroup, FormControl, Container, Card, ListGroup, Row, Col, Button } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import { alchemy, util } from '../utils/Utils.js'
import Transaction from './Transaction.jsx';

function Transactions() {
    const [inputAddressValue, setInputAddressValue] = useState('');
    const [inputBlockValue, setInputBlockValue] = useState('');
    const [isAddressValid, setIsAddressValid] = useState(true);
    const [isBlockNumberValid, setIsBlockNumberValid] = useState(true);

    function handleInputChange(event) {
        const value = event.target.value;
        setInputAddressValue(value);
        setIsAddressValid(value.length === 0 || util.isValidEthereumAddress(value));
    }

    function handleBlockInputChange(event) {
        const value = event.target.value;
        setInputBlockValue(value);
        setIsBlockNumberValid(value.length === 0 || util.isHexString(value) || util.isUnsignedInt(value));
    }

    function handleAddressSubmit(event) {
        event.preventDefault();
        if (isAddressValid)
            getAddressTransactions(inputAddressValue);
    }

    function handleBlockNumberSubmit(event) {
        event.preventDefault();
        if (isBlockNumberValid)
            getBlockTransactions(inputBlockValue.length === 0 ? null : util.isHexString(inputBlockValue) ? inputBlockValue : "0x" + parseInt(inputBlockValue, 10).toString(16));
    }

    const [blockTransactions, setBlockTransactions] = useState();
    const [addressTransactions, setAddressTransactions] = useState();

    const [readMore, setReadMore] = useState(false);

    async function getBlockTransactions(blockNumber = null) {
        setBlockTransactions(await alchemy.core.getBlockWithTransactions(blockNumber));
    }

    async function getAddressTransactions(address) {
        setAddressTransactions(await alchemy.core.getAssetTransfers({
            fromBlock: "0x0",
            fromAddress: address,
            maxCount: "0x19",
            withMetadata: true,
            order: "desc",
            category: ["external", "internal", "erc20", "erc721", "erc1155"],
        }));
    }

    function toggle() {
        setReadMore(readMore => {
            return !readMore
        })
    }

    useEffect(() => {
        getBlockTransactions();
    }, []);

    return (
        <Container>
            <Row>
                <Col>
                    <Form onSubmit={handleBlockNumberSubmit}>
                        <Form.Group>
                            <Form.Label className="text-light">Block Number</Form.Label>
                            <InputGroup>
                                <FormControl type="text" placeholder="Enter Block Number" onChange={handleBlockInputChange} isInvalid={!isBlockNumberValid} />
                                <InputGroup.Text>
                                    <FaSearch />
                                </InputGroup.Text>
                            </InputGroup>
                        </Form.Group>
                    </Form>
                    <br />
                    {blockTransactions && blockTransactions.transactions.length > 0 ?
                        <Card>
                            <Card.Body>
                                <Card.Title>Transactions for Block {' '}
                                    {blockTransactions ?
                                        blockTransactions.transactions[0].blockNumber : null
                                    }
                                </Card.Title>
                                <Card.Body>
                                    <ListGroup variant="flush">
                                        {blockTransactions ?
                                            blockTransactions.transactions.slice(0, readMore ? blockTransactions.transactions.length : 6).map(transaction => {
                                                return <Transaction gas={transaction.value._hex} hash={transaction.hash} from={transaction.from} to={transaction.to} timeStamp={blockTransactions.timestamp} />
                                            }) : null
                                        }
                                        <ListGroup.Item className="d-flex justify-content-end">
                                            <Button variant="link" onClick={toggle}>Show {readMore ? "Less" : "More"}</Button>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Card.Body>
                            </Card.Body>
                        </Card> : null}
                </Col>
                <Col xs={6}>
                    <Form onSubmit={handleAddressSubmit}>
                        <Form.Group>
                            <Form.Label className="text-light">Address</Form.Label>
                            <InputGroup>
                                <FormControl type="text" placeholder="Enter address" onChange={handleInputChange} isInvalid={!isAddressValid} />
                                <InputGroup.Text>
                                    <FaSearch />
                                </InputGroup.Text>
                            </InputGroup>
                        </Form.Group>
                    </Form>
                    <br />
                    {addressTransactions && addressTransactions.transfers.length > 0 ?
                        <Card>
                            <Card.Body>
                                <Card.Title>Transactions for Address {' '}
                                    {addressTransactions && addressTransactions.transfers.length > 0 ?
                                        util.formatAddressEllipsisCenter(addressTransactions.transfers[0].from) :
                                        null
                                    }
                                </Card.Title>
                                <Card.Body>
                                    <ListGroup variant="flush">
                                        {addressTransactions && addressTransactions.transfers.length > 0 ?
                                            addressTransactions.transfers.slice(0, readMore ? addressTransactions.transfers.length : 6).map(transaction => {
                                                return <Transaction gas={transaction.value} hash={transaction.hash} from={transaction.from} to={transaction.to} timeStamp={transaction.metadata.blockTimestamp} />
                                            }) : null
                                        }
                                        <ListGroup.Item className="d-flex justify-content-end">
                                            <Button variant="link" onClick={toggle}>Show {readMore ? "Less" : "More"}</Button>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Card.Body>
                            </Card.Body>
                        </Card> : null
                    }
                </Col>
            </Row>

        </Container>
    );
}

export default Transactions;