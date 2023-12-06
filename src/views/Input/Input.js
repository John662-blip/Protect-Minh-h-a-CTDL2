import React, { Component } from 'react';
class Input extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null,
        };
        this.button = false;
    }

    handleFileChange = (event) => {
        let file = null;
        file = event.target.files[0];
        this.setState({ selectedFile: file });
    };

    checkForTree(data, value) {
        const graph = new Map();

        for (const { source, target } of data) {
            if (!graph.has(source)) {
                graph.set(source, []);
            }
            graph.get(source).push(target);

            if (!graph.has(target)) {
                graph.set(target, []);
            }
            graph.get(target).push(source);
        }
        const visited = new Set();
        const queue = [];
        queue.push(value);
        while (queue.length > 0) {
            const node = queue.shift();
            visited.add(node);
            for (const neighbor of graph.get(node)) {
                if (!visited.has(neighbor)) {
                    queue.push(neighbor);
                }
            }
        }

        if (visited.size !== graph.size) {
            return false;
        }

        return true;
    }

    checkExist(a, arr) {
        for (let i = 0; i < arr.length; i++)
            if (a === arr[i].id) return true;
        return false
    }
    handleUpload = () => {
        const { selectedFile } = this.state;
        if (selectedFile) {
            const reader = new FileReader()
            reader.onload = (e) => {
                const fileContent = e.target.result;
                const lines = fileContent.split('\n');
                let fileData = [];

                lines.forEach((line) => {
                    const [source, target] = line.split(' ').map(Number);
                    if (!isNaN(source) && !isNaN(target)) {
                        fileData.push({ source, target });
                    }
                })
                try {
                    if (fileData[0].source);
                }
                catch (e) {
                    alert("Ko the doc file")
                    return
                }
                if (this.checkForTree(fileData, fileData[0].source)) {
                    this.props.addRoad(fileData)
                    let arr = []
                    fileData.forEach((item) => {
                        if (!this.checkExist(item.source, arr)) arr = [...arr, { id: item.source, check: false }]
                        if (!this.checkExist(item.target, arr)) arr = [...arr, { id: item.target, check: false }]
                    })
                    for (let i = 0; i < arr.length; i++)
                        for (let j = i + 1; j < arr.length - 1; j++)
                            if (arr[i].id > arr[j].id) {
                                let tam = arr[i];
                                arr[i] = arr[j];
                                arr[j] = tam;
                            }
                    this.props.setArrNodes(arr)
                    this.button = true;
                }
                else alert("Khong The Tao Cay Khung")

            }
            reader.readAsText(selectedFile)
        }
    }


    render() {
        return (
            <div>
                <input disabled={this.button} type="file" onChange={(event) => this.handleFileChange(event)} />
                <button onClick={this.handleUpload} disabled={this.button}>Save</button>
            </div>
        );
    }
}

export default Input;
