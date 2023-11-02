import React from "react";

class Result extends React.Component {
    render() {
        let { kq } = this.props
        return (
            <div className="col-12">
                <div className="col-6 text-center mx-auto">
                    <div className="alert alert-primary">
                        {kq && kq.map((item) => {
                            return item.source + "-" + item.target + ","
                        })}
                    </div>
                </div>
            </div>
        )
    }
}
export default Result