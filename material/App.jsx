import React from 'react'
import ReactDOM from 'react-dom'
import Form from './Form'

class App extends React.Component {
    render() {
        return (
            <Form />
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'))