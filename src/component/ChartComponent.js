import React from 'react';
import ReactApexChart from 'react-apexcharts';

export default function ChartComponent({ options, series, type, dates }) {
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
							speed: 200,
						},
					},
				},
				// ตั้งค่าสี chart
				colors: ['#2E93fA', '#66DA26', '#E91E63', '#E91E63', '#FF9800'],
				// ตั้งค่าเเนวนอน
				xaxis: {
					...options.xaxis,
					type: 'datetime', // Set type as datetime
					categories: options, // Use dates array from props
					labels: {
						formatter: function (val) {
							return new Date(val).toLocaleString(); // Format date
						},
						// show: true,
						// rotate: -45,
						// rotateAlways: false,
						// hideOverlappingLabels: true,
						// showDuplicates: false,
						// trim: false,
						// minHeight: undefined,
						// maxHeight: 120,
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
			}}
			series={series}
			type={type}
			height={400}
		/>
	);
}
