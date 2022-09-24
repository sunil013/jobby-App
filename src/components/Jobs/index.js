import Header from '../Header'

import './index.css'
import AllJobs from '../AllJobs'

const Jobs = () => (
  <>
    <Header />
    <div className="job-section">
      <div className="job-section-container">
        <AllJobs />
      </div>
    </div>
  </>
)

export default Jobs
