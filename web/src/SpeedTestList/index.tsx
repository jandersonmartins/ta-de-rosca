import React from 'react'
import { useSpeedTestData } from './useSpeedTestData'
import SpeedTestData from './SpeedTestData'

const SpeedTestList = () => {
  const data = useSpeedTestData()
  return (
    <div>
      <h1>SpeedTestList</h1>

      <table>
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
                  // TODO: receive url from environment variable
                  href={`http://localhost:3001/files?name=${d.screenshot}`}
                >Screenshot</a>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default SpeedTestList