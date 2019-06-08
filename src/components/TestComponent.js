import React, { Component } from 'react'
import { connect } from 'react-redux';

class TestComponent extends Component {
  render() {
    return (
      <div>
        {this.props.version}
      </div>
    )
  }
}
function mapStatesToProps(state, ownProps){
    return {
        version: state.meta.version
    }
}
export default connect(mapStatesToProps, {})(TestComponent);