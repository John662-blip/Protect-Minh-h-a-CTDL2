import React from "react";
import Input from "../Input/Input.js";
import GraphVisualization from "../Graph/GraphVisualization.js";
import Result from "../result/result.js";
import Stack from "../stack/Stack.js";
import Next from "../btn/Next.js";
class MyComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            roads: [],
            stack: [],
            arrNodes: [],
            kq: [],
            arr: []
        }
    }
    addArr = (value) => {
        this.setState({
            arr: [...this.state.arr, value]
        })
    }
    addRoad = (road) => {
        this.setState({
            roads: road
        })
    }
    setArrNodes = (arr) => {
        this.setState({
            arrNodes: arr
        })
    }
    setStack = (st) => {
        this.setState({
            stack: st
        })
    }
    changeCheck = (stt, arr) => {
        let arr1 = []
        arr.forEach(item => {
            if (item.id !== stt) arr1 = [...arr1, item]
            else arr1 = [...arr1, { id: item.id, check: true }]
        });
        this.setState({
            arrNodes: arr1
        })
    }
    addKq = (a, b) => {
        this.setState({
            kq: [...this.state.kq, { source: a, target: b }]
        })
    }

    render() {


        return (
            <>
                <div className="col-12 d-flex justify-content-center " style={{ marginBottom: "20px" }}>
                    <div>
                        <Input setArrNodes={this.setArrNodes} addRoad={this.addRoad} />
                    </div>
                    <div style={{ marginLeft: "15px" }}>
                        <Next addArr={this.addArr} addKq={this.addKq} changeCheck={this.changeCheck} setStack={this.setStack} roads={this.state.roads} stack={this.state.stack} arrNodes={this.state.arrNodes} />
                    </div>
                </div>
                {(this.state.roads.length !== 0) && <Result kq={this.state.kq} />}
                {
                    (this.state.roads.length !== 0) &&
                    <div>
                        <GraphVisualization arr={this.state.arr} kq={this.state.kq} stack={this.state.stack} arrNodes={this.state.arrNodes} roads={this.state.roads} />
                    </div>
                }
                {(this.state.roads.length !== 0) && <Stack stack={this.state.stack} />}
            </>
        )
    }
}
export default MyComponent