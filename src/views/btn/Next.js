import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesRight } from '@fortawesome/free-solid-svg-icons';
import Stack from "../Logic/StackLogic";
import ButtonManager from "../ButtonManager ";
class Next extends React.Component {
    constructor(props) {
        super(props)
        this.set = false
        this.stack = new Stack();
    }
    checkId(id) {
        let { arrNodes } = this.props
        for (let i = 1; i < arrNodes.length; i++) {
            if (id === arrNodes[i].id) return arrNodes[i].check
        }
        return true

    }
    LogicBFS = () => {
        let { roads, stack, arrNodes } = this.props
        if ((stack.length === 0) && roads.length !== 0 && this.set === false) {
            //let arr = []
            // arr = [...arr, arrNodes[0].id]
            // this.props.setStack(arr)
            this.stack.push(arrNodes[0].id);
            this.props.setStack(this.stack.toArr());
            this.props.changeCheck(arrNodes[0].id, arrNodes)
            this.set = true
        }
        // console.log(this.stack.toArr());
        if (stack.length !== 0) {
            // for (let i = 0; i < roads.length; i++) 
            for (let i = 0; i < arrNodes.length; i++) {
                if (this.checkHasRoad(arrNodes[i].id, this.stack.peek()/*stack[stack.length - 1]*/)) {
                    if (this.checkId(arrNodes[i].id) === false) {
                        this.props.addKq(this.stack.peek()/*stack[stack.length - 1]*/, arrNodes[i].id)
                        this.stack.push(arrNodes[i].id);
                        this.props.setStack(this.stack.toArr())
                        // this.props.setStack([...stack, arrNodes[i].id])
                        this.props.changeCheck(arrNodes[i].id, arrNodes)
                        return
                    }
                }
            }
            // let arr = stack;
            // arr.pop()
            this.stack.pop();
            this.props.setStack(this.stack.toArr());
            // this.props.setStack(arr);
        }
    }
    handleButtonClick = (Event) => {
        let { roads } = this.props
        if (roads.length !== 0) {
            ButtonManager.setDisableButtons(true)
            this.forceUpdate()
        } else return
        this.intervalId = setInterval(() => {
            this.LogicBFS()
            if (this.stack.isEmpty()) {
                clearInterval(this.intervalId);
            }
        }, 500);
    }
    checkHasRoad = (source, target) => {
        let { roads } = this.props;
        for (let i = 0; i < roads.length; i++)
            if ((source === roads[i].source.id && target === roads[i].target.id) || (target === roads[i].source.id && source === roads[i].target.id))
                return true
        return false;
    }
    render() {
        return (
            <button disabled={ButtonManager.disableButtons} className="btn btn-primary" onClick={(Event) => this.handleButtonClick(Event)}  >
                <FontAwesomeIcon icon={faAnglesRight} />
            </button>
        )
    }
}
export default Next