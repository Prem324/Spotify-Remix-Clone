import {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {IoMdArrowBack} from 'react-icons/io'

import './index.css'

class BackNavigation extends Component {
  onClickGoBack = () => {
    const {history} = this.props
    history.goBack()
  }

  render() {
    return (
      <div className="back-arrow-container">
        <button
          type="button"
          onClick={this.onClickGoBack}
          className="back-button"
        >
          <IoMdArrowBack className="back-arrow" />
        </button>
        <p className="button-text">Back</p>
      </div>
    )
  }
}

export default withRouter(BackNavigation)
