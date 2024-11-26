
import { useState, useEffect } from 'react';
import {  Card, Container, Row, Col } from 'react-bootstrap';
import {MdFlight } from 'react-icons/md';
import { useSearchParams } from "react-router";

import axios from 'axios';


const dataList = {
        "direct_flights": [
            {
                "id": 1,
                "origin": {
                    "code": "BOG",
                    "name": "Bogotá"
                },
                "destination": {
                    "code": "MDE",
                    "name": "Medellín"
                },
                "departure_time": "06:00:00",
                "arrival_time": "07:30:00",
                "days_of_week": "Monday, Wednesday, Friday",
                "duration": "1 horas, 30 minutos"
            }
        ],
        "routes_with_stops": []
    }
   
const FlightList = () => {
    const [results, setResults] = useState(dataList)
    const [showModal, setShowModalIndex] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const [loading, setLoading] = useState(false)

    const origin = searchParams.get('origin');
    const destination = searchParams.get('destination');
    const date = searchParams.get('date');


    const handleShowModal = (index) => {
        setShowModalIndex(index);
    };

    const handleCloseModal = () => {
        setShowModalIndex(null);
    };

    useEffect(() => {
        setLoading(true);


        const fetchFlightList = async () => {
            try {
                // const response = await axios.get('https://jsonplaceholder.typicode.com/users', {
                //         params: {
                //             origin,
                //             destination,
                //             date,
                //         },
                //     });
                    // setResults(response.data);

            } catch (err) {
                console.error('Error fetching airports:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchFlightList();
    }, [date, destination, origin]);




    return (
        <>
            {loading && (
                <div className="loader-overlay">
                    <div className="plane-loader">
                        <div className="plane"></div>
                        <div className="cloud cloud1"></div>
                        <div className="cloud cloud2 animated"></div>
                        <div className="cloud cloud3 animated"></div>
                    </div>
                </div>
            )}


            <div className="results-container">
                <Container className="mt-5 mb-5">
                    <h2 className="mb-5">Vuelos desde {origin} hacia {destination}</h2>
                    <Row className="g-4">
                        {results.direct_flights && results.direct_flights.length > 0 && results.direct_flights.map((flight, index) => (
                            <Col key={index} md={4}>
                                <Card className="card-flight">
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <div style={{ textAlign: 'left' }}>
                                            <h5 className="flight-info-header">{flight.departure_time}</h5>
                                            <span className="flight-info-sub">{flight.origin.code}</span>
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                            <h5 className="flight-info-header">{flight.arrival_time}</h5>
                                            <span className="flight-info-sub">{flight.destination.code}</span>
                                        </div>
                                    </div>
                                    <div className="text-center mb-3">
                                        <div className="flight-type">Directo</div>
                                        <div className="d-flex align-items-center justify-content-center mt-3">
                                            <div className="flight-details-divider"></div>
                                            <MdFlight className="flight-details-icon" />
                                            <div className="flight-details-divider"></div>
                                        </div>
                                        <div className="flight-duration">{flight.duration}</div>
                                    </div>
                                </Card>
                            </Col>
                        ))}

                        {results.routes_with_stops && results.routes_with_stops.length > 0 && results.routes_with_stops.map((route, index) => (
                            <Col key={index} md={4}>
                                <Card className="card-flight" style={{ position: 'relative' }}>
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <div style={{ textAlign: 'left' }}>
                                            <h5 className="flight-info-header">{route.flights[0].departure_time.split(' ')[1]}</h5>
                                            <span className="flight-info-sub">{route.flights[0].origin}</span>
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                            <h5 className="flight-info-header">{route.flights[route.flights.length - 1].arrival_time.split(' ')[1]}</h5>
                                            <span className="flight-info-sub">{route.flights[route.flights.length - 1].destination}</span>
                                        </div>
                                    </div>
                                    <div
                                        className="route-duration position-relative text-center"
                                        onMouseEnter={() => handleShowModal(index)}
                                        onMouseLeave={handleCloseModal}
                                    >
                                        {route.flights.length - 1} Escala{route.flights.length - 1 > 1 ? 's' : ''}
                                        {showModal === index && (
                                            <div className="tooltip-details">
                                                <h6 className="fw-bold text-center">Detalles del vuelo</h6>
                                                {route.flights.map((flight, idx) => (
                                                    <div key={idx} className="mb-3">
                                                        <div className="d-flex justify-content-between align-items-center text-dark">
                                                            <span style={{ fontWeight: 'bold' }}>
                                                                {flight.departure_time.split(' ')[1]} <span className='fw-normal'>{flight.origin}</span>
                                                            </span>
                                                            <MdFlight className="flight-details-icon" />

                                                            <span style={{ fontWeight: 'bold', textAlign: 'right' }}>
                                                                {flight.arrival_time.split(' ')[1]} <span className='fw-normal'>{flight.destination}</span>
                                                            </span>
                                                        </div>
                                                    </div>
                                                ))}
                                                <div style={{ fontSize: '1rem', fontWeight: 'normal', textAlign: 'center', color: '#12ab70' }}>
                                                    {route.total_duration}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="d-flex align-items-center justify-content-center mt-3">
                                        <div className="flight-details-divider"></div>
                                        <MdFlight className="flight-details-icon" />
                                        <div className="flight-details-divider"></div>
                                    </div>
                                    <div className="flight-duration text-center">{route.total_duration}</div>
                                </Card>
                            </Col>
                        ))}



                    </Row>
                    {results.direct_flights.length === 0 && results.routes_with_stops.length === 0 && (
                        <div className="no-flights-message">
                            <Card className="no-flights-card text-center p-4 mt-3">
                                <Card.Body>
                                    <Card.Title className='text-dark display-5 fw-bold'>No hay vuelos disponibles</Card.Title>
                                    <Card.Text>
                                        <p className='badge bg-danger'>Intenta con otra fecha o destino.</p>
                                    </Card.Text>
                                </Card.Body>

                            </Card>
                        </div>
                    )}
                </Container>

            </div>

        </>
    )
}

export default FlightList