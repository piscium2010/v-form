import React from 'react'
import ReactDOM from 'react-dom'
import Form from './Form'

class App extends React.Component {
    render() {
        return (
            <div style={{height: 380}}>
                <Form />
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'))