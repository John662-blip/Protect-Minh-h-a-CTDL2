import React, { Component } from 'react';
import * as d3 from 'd3';


class GraphVisualization extends Component {
    constructor(props) {
        super(props)
        this.graphContainerRef = React.createRef();
        this.renderGraph = this.renderGraph.bind(this)
        this.nodes = null
        this.simulation = null;
    }
    componentDidMount() {
        this.graphContainerRef = this.graphContainerRef.current;
        this.renderGraph();
    }

    updateNodeColors(nodes) {

        nodes.attr('fill', d => this.checkArrNode(d, this.props.arrNodes))
    }
    clearGraph() {
        // Xóa đồ thị bằng cách xóa nút gốc (root node) của SVG container
        const svg = d3.select(this.graphContainerRef);
        svg.selectAll('*').remove();
    }
    renderGraph() {
        const width = window.innerWidth;
        const height = window.innerHeight * 60 / 100;
        const svg = d3.select(this.graphContainerRef)
            .append('svg')
            .attr('width', width)
            .attr('height', height);

        const linksData = this.props.roads
        const nodesData = [...new Set(linksData.flatMap(d => [d.source, d.target]))].map(d => ({ id: d }));
        this.simulation = d3.forceSimulation(nodesData)
            .force('link', d3.forceLink(linksData).id(d => d.id))
            .force('charge', d3.forceManyBody().strength(-800))
            .force('center', d3.forceCenter(width / 2, height / 2))
            .alphaTarget(0.005)

        const links = svg.selectAll('line')
            .data(linksData)
            .enter()
            .append('line')
            .attr('stroke-width', 6);

        const nodes = svg.selectAll('.node')
            .data(nodesData)
            .enter()
            .append('g')
            .attr('class', 'node')
        nodes.append('circle')
            .attr('r', 20)

        // Thêm nhãn (label) cho các nút
        nodes.append('text')
            .attr('x', 0) // Điều chỉnh vị trí của nhãn theo nút
            .attr('y', 0) // Điều chỉnh vị trí của nhãn theo nút
            .attr('fill', 'white')
            .attr('text-anchor', 'middle')
            .text(d => d.id);
        this.simulation.nodes(nodesData).on('tick', () => {
            links
                .attr('x1', d => d.source.x)
                .attr('y1', d => d.source.y)
                .attr('x2', d => d.target.x)
                .attr('y2', d => d.target.y)
                .attr('stroke', d => this.checkArrRoad(d, this.props.kq));
            nodes
                .attr('transform', d => `translate(${d.x},${d.y})`)
            this.updateNodeColors(nodes)
        });
    }
    checkArrRoad(d, road) {
        const roadId = road.find(item => ((item.source === d.source.id && item.target === d.target.id) || (item.source === d.target.id && item.target === d.source.id)))
        if (roadId) return 'green'
        else return '#0074E4'
    }
    checkArrNode(d, arr) {
        const nodeInfo = arr.find(item => item.id === d.id);
        let { stack } = this.props
        if (stack.length !== 0 && stack[stack.length - 1] === d.id) return "pink";
        if (nodeInfo && nodeInfo.check) {
            return "green";
        }
        return "red";
    }
    render() {
        return (
            <div ref={this.graphContainerRef} />
        );
    }
}

export default GraphVisualization
