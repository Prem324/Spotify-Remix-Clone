import {ThreeDots} from 'react-loader-spinner'
import './index.css'

const LoaderView = () => (
  <div>
    <ThreeDots type="TailSpin" color="#0074D9" height={80} width={80} />
    <h1>Loading...</h1>
  </div>
)

export default LoaderView
