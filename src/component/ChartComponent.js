import React from 'react';
import ReactApexChart from 'react-apexcharts';

export default function ChartComponent({ options, series, type, title }) {
	return (
		<ReactApexChart
			options={{
				...options,
				chart: {
					id: 'chartComponent',
					type: type,
					toolbar: {
						show: true,
						tools: {
							download: true,
							selection: true,
							zoom: true,
							zoomin: true,
							zoomout: true,
							pan: true,
							reset: true,
						},
						autoSelected: 'zoom',
					},
					animations: {
						enabled: true,
						easing: 'linear',
						dynamicAnimation: {
							enabled: true,
							speed: 350,
						},
					},
				},
				// ตั้งค่าสี chart
				colors: ['#2E93fA', '#5cb85c', '#FF7F50', '#E91E63', '#FF9800'],
				// ตั้งค่าแกน X
				xaxis: {
					...options.xaxis,
					type: 'datetime', // Set type as datetime
					categories: options, // Use dates array from props
					labels: {
						formatter: function (val) {
							return new Date(val).toLocaleString(); // Format date
						},
						minHeight: undefined,
						maxHeight: 120,
						style: {
							colors: '#FFFFFF',
							fontSize: '12px',
							fontFamily: 'Helvetica, Arial, sans-serif',
							fontWeight: 400,
							cssClass: 'apexcharts-xaxis-label',
						},
					},
					zoom: {
						autoScaleYaxis: true,
						enabled: true,
						type: 'x',
						zoomedArea: {
							fill: {
								color: '#90CAF9',
								opacity: 0.4,
							},
							stroke: {
								color: '#0D47A1',
								opacity: 0.4,
								width: 1,
							},
						},
						zoomMax: 7,
					},
				},
				yaxis: {
					labels: {
						style: {
							colors: '#FFFFFF',
							fontSize: '12px',
							fontFamily: 'Helvetica, Arial, sans-serif',
							fontWeight: 400,
							cssClass: 'apexcharts-yaxis-label',
						}
					},
				},
				// ใส่ชื่อของกราฟ
				title: {
					text: title,
					align: 'center',
					margin: 10,
					offsetX: 0,
					offsetY: 0,
					floating: false,
					style: {
						fontSize: '30px',
						color: '#c99870'
						
					},
				},

				legend: {
					show: true,
					fontSize: '14px',
					fontFamily: 'Helvetica, Arial',

					labels: {
						colors: '#FFFFFF',
	
					},
				}
			}}
			series={series}
			type={type}
			height={400}
			width={900}
		/>
	);
}
