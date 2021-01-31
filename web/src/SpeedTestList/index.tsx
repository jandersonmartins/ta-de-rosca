import React from 'react'
import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'

import { useSpeedTestData } from './useSpeedTestData'
import SpeedTestData from './SpeedTestData'

const BASE_URL = process.env.REACT_APP_SCREENSHOT_BASE_URL ?? 'http://localhost:3001'

const SpeedTestList = () => {
  const {
    data,
    loading,
    error,
    nextPage
  } = useSpeedTestData()

  return (
    <Container>
      <h1>SpeedTestList {loading ? ' - Loading...' : '' }</h1>

      <Row>
        {error ? (
          <Col>
            <Alert variant="danger">
              {error} <Button onClick={nextPage}>Retry</Button>
            </Alert>
          </Col>
        ) : (
          <Col>
            <Table responsive="sm">
              <thead>
                <tr>
                  <th>Download</th>
                  <th>Upload</th>
                  <th>Ping</th>
                  <th>Date/Time</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {data.map((d: SpeedTestData) =>
                  <tr key={d._id}>
                    <td>{d.downloadSpeed} {d.downloadUnit}</td>
                    <td>{d.uploadSpeed} {d.uploadUnit}</td>
                    <td>{d.ping} {d.pingUnit}</td>
                    <td>{d.dateTime}</td>
                    <td>
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={`${BASE_URL}/files?name=${d.screenshot}`}
                      >Screenshot</a>
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>

            <Col>
              <Button
                disabled={loading}
                onClick={nextPage}
              >Load More</Button>
            </Col>
          </Col>
        )}
      </Row>
    </Container>
  )
}

export default SpeedTestList
