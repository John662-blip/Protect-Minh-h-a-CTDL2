import React from "react";
import './Node.scss'
class Node extends React.Component {
    render() {
        let { data } = this.props
        return (
            <div className="BOX" >
                {data}
            </div>
        )
    }
}
export default Node
