import { Navbar, Container } from 'react-bootstrap';

function NavbarMain() {
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand>
                    <img
                        alt=""
                        src="/logo512.png"
                        width="30"
                        height="30"
                        className="d-inline-block align-top" />{' '}
                    Block Explorer
                </Navbar.Brand>
            </Container>
        </Navbar>
    );
}

export default NavbarMain;