import React from 'react'
import { VFormContext } from './Context'

export default function FieldHOC(C) {
    return class Field extends React.Component {
        static contextType = VFormContext
        constructor(props) {
            super(props)
            if (!props.name) { throw 'prop name is required for field component created by VForm.fieldFactory' }
        }

        render() {
            if (this.context.name !== 'VForm') {
                throw 'Please wrap field components under component VForm'
            }
            const { name, messages, children } = this.props
            const message = typeof messages === 'string' ? messages : ''
            return (
                <C name={name} message={message} >
                    {
                        React.Children.toArray(children, element =>
                            React.cloneElement(element, { name })
                        )
                    }
                </C>
            )
        }
    }
}
