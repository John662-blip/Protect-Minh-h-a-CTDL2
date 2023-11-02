import React from "react";
import './Stack.scss'
import Node from "./Node";
class Stack extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            Nodes: this.props.stack
        }
    }
    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            this.setState({
                Nodes: this.props.stack
            })
        }
    }
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-8 mx-auto">
                        <div className="my-box" style={{ textAlign: "left", display: "flex" }}>
                            {
                                this.state.Nodes.map((item, index) => {
                                    return (
                                        <Node key={index} data={item} />
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Stack