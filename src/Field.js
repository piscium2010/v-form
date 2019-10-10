import React from 'react'

export default function FieldHOC(C) {
    return class Field extends React.Component {
        constructor(props) {
            super(props)
            if(!props.name) { throw 'name is required for component created by VForm.fieldFactory' }
        }

        render() {
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
