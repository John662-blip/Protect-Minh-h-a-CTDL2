import React from "react";
import ButtonManager from "../ButtonManager ";
class Result extends React.Component {
    render() {
        let { kq, arrNodes } = this.props
        console.log(arrNodes.length)
        return (
            <div className="col-12">
                {(arrNodes.length > 1) &&
                    <div className="col-6 text-center mx-auto">
                        <div className="alert alert-primary">
                            {kq && kq.map((item) => {
                                return item.source + "-" + item.target + "  "
                            })}
                        </div>
                    </div>}
                {(arrNodes.length === 1) && (ButtonManager.disableButtons === true) &&
                    <div className="col-6 text-center mx-auto">
                        <div className="alert alert-primary">
                            {arrNodes[0].id}
                        </div>
                    </div>}
            </div>
        )
    }
}
export default Result