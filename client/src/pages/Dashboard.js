import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

function Dashboard() {
    const svgRef = useRef();
    const pieRef = useRef();

    const data = [
        { "month": "January", "area1": 100, "area2": 80, "area3": 50 },
        { "month": "February", "area1": 120, "area2": 90, "area3": 60 },
        { "month": "March", "area1": 140, "area2": 100, "area3": 70 },
        { "month": "April", "area1": 160, "area2": 110, "area3": 80 },
        { "month": "May", "area1": 180, "area2": 120, "area3": 90 },
        { "month": "June", "area1": 200, "area2": 130, "area3": 100 },
        { "month": "July", "area1": 220, "area2": 140, "area3": 110 }
    ];

    useEffect(() => {
        const margin = { top: 20, right: 30, bottom: 40, left: 40 };
        const width = 960 - margin.left - margin.right;
        const height = 500 - margin.top - margin.bottom;

        const svg = d3.select(svgRef.current)
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        const x = d3.scaleBand()
            .range([0, width])
            .padding(0.2)
            .domain(data.map(d => d.month));

        const y = d3.scaleLinear()
            .range([height, 0])
            .domain([0, d3.max(data, d => Math.max(d.area1, d.area2, d.area3))]);

        const xAxis = d3.axisBottom(x);
        const yAxis = d3.axisLeft(y);

        svg.append('g')
            .attr('transform', `translate(0,${height})`)
            .call(xAxis)
            .selectAll("text")
            .attr("transform", "rotate(-45)")
            .style("text-anchor", "end");

        svg.append('g')
            .call(yAxis);

            const colors = ['#A9CFA5', '#C8A2C8', '#D3A6A6']; // Dull Green, Dull Purple, Dull Red

        ['area1', 'area2', 'area3'].forEach((area, index) => {
            svg.selectAll(`.bar-${area}`)
                .data(data)
                .enter()
                .append('rect')
                .attr('class', `bar-${area}`)
                .attr('x', d => x(d.month) + (index * (x.bandwidth() / 3)))
                .attr('width', x.bandwidth() / 3)
                .attr('y', d => y(d[area]))
                .attr('height', d => height - y(d[area]))
                .attr('fill', colors[index]);
        });

        // Add legend
        const legend = svg.selectAll('.legend')
            .data(['area1', 'area2', 'area3'])
            .enter().append('g')
            .attr('class', 'legend')
            .attr('transform', (d, i) => `translate(0,${i * 20})`);

        legend.append('rect')
            .attr('x', width - 18)
            .attr('width', 18)
            .attr('height', 18)
            .style('fill', (d, i) => colors[i]);

        legend.append('text')
            .attr('x', width - 24)
            .attr('y', 9)
            .attr('dy', '.35em')
            .style('text-anchor', 'end')
            .text(d => d);

        // Pie chart
        const pieSvg = d3.select(pieRef.current)
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', `translate(${(width + margin.left + margin.right) / 2}, ${(height + margin.top + margin.bottom) / 2})`);

        const avgData = [
            { area: 'area1', value: d3.mean(data, d => d.area1) },
            { area: 'area2', value: d3.mean(data, d => d.area2) },
            { area: 'area3', value: d3.mean(data, d => d.area3) }
        ];

        const pie = d3.pie()
            .value(d => d.value);

        const arc = d3.arc()
            .innerRadius(0)
            .outerRadius(Math.min(width, height) / 2 - 1);

        const arcs = pieSvg.selectAll('arc')
            .data(pie(avgData))
            .enter().append('g')
            .attr('class', 'arc');

        arcs.append('path')
            .attr('d', arc)
            .attr('fill', (d, i) => colors[i]);

        arcs.append('text')
            .attr('transform', d => `translate(${arc.centroid(d)})`)
            .attr('dy', '0.35em')
            .attr('text-anchor', 'middle')
            .text(d => d.data.area);

    }, []);

    return (
        <div className="w-full h-screen ">
            <div className="w-full flex flex-wrap px-4 h-auto py-2 gap-5 items-center justify-between">
                <div className="w-56 h-56 bg-[#6761D9]">
                    {/* Content */}
                </div>
                <div className="w-56 h-56 bg-[#2B89DB]">
                    {/* Content */}
                </div>
                <div className="w-56 h-56 bg-[#F7A00D]">
                    {/* Content */}
                </div>
                <div className="w-56 h-56 bg-[#DF4544]">
                    {/* Content */}
                </div>
            </div>
            <div className="w-full flex mx-3 items-center justify-center py-3">
                <div className="flex-1  rounded-xl  border-black border-opacity-15 border-2 p-3">
                <div className='flex text-center flex-col text-xl font-bold'>
                    <h2>Water consumption each month</h2>
                        <svg ref={svgRef}></svg>
                    </div>
                </div>
            </div>
            <div className="w-full flex mx-3 items-center justify-center py-3">
                <div className="flex-1  rounded-xl  border-black border-opacity-15 border-2 p-3">
                <div className='flex text-center flex-col text-xl font-bold'>
                        <h2>Average Water Consumption Per Month</h2>
                        <svg ref={pieRef}></svg>
                    </div>
                </div>
            </div>
           
        </div>
    );
}

export default Dashboard;
