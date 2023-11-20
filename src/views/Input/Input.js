import React, { Component } from 'react';

class Input extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null,
        };
        this.clicked = false
    }

    handleFileChange = (event) => {
        const file = event.target.files[0];
        this.setState({ selectedFile: file });
    };

    checkForTree(data) {
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
        queue.push(1);
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
        if (selectedFile && !this.clicked) {
            const reader = new FileReader()
            reader.onload = (e) => {
                const fileContent = e.target.result;
                const lines = fileContent.split('\n');
                const fileData = [];

                lines.forEach((line) => {
                    const [source, target] = line.split(' ').map(Number);
                    if (!isNaN(source) && !isNaN(target)) {
                        fileData.push({ source, target });
                    }
                })
                console.log(fileData)
                if (this.checkForTree(fileData)) {
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
                }
                else alert("Khong The Tao Cay Khung")

            }
            reader.readAsText(selectedFile)
            this.clicked = true
        };
    }
    render() {
        return (
            <div>
                <input type="file" onChange={this.handleFileChange} />
                <button onClick={this.handleUpload}>Save</button>
            </div>
        );
    }
}

export default Input;
