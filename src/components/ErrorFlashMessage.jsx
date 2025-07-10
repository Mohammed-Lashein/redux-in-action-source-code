import React, { Component } from 'react'

export class ErrorFlashMessage extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className='w-full p-4 bg-red-200 text-red-800 text-center'>
        {this.props.errorMessage}
      </div>
    )
  }
}