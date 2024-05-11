class ApexChart extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			series: [
				{
					data: generateDayWiseTimeSeries(new Date('11 Feb 2017').getTime(), 20, {
						min: 10,
						max: 60,
					}),
				},
			],
			options: {
				chart: {
					id: 'fb',
					group: 'social',
					type: 'line',
					height: 160,
				},
				colors: ['#008FFB'],
			},

			seriesLine2: [
				{
					data: generateDayWiseTimeSeries(new Date('11 Feb 2017').getTime(), 20, {
						min: 10,
						max: 30,
					}),
				},
			],
			optionsLine2: {
				chart: {
					id: 'tw',
					group: 'social',
					type: 'line',
					height: 160,
				},
				colors: ['#546E7A'],
			},

			seriesArea: [
				{
					data: generateDayWiseTimeSeries(new Date('11 Feb 2017').getTime(), 20, {
						min: 10,
						max: 60,
					}),
				},
			],
			optionsArea: {
				chart: {
					id: 'yt',
					group: 'social',
					type: 'area',
					height: 160,
				},
				colors: ['#00E396'],
			},

			seriesSmall: [
				{
					data: generateDayWiseTimeSeries(new Date('11 Feb 2017').getTime(), 20, {
						min: 10,
						max: 60,
					}),
				},
			],
			optionsSmall: {
				chart: {
					id: 'ig',
					group: 'social',
					type: 'area',
					height: 160,
					width: 300,
				},
				colors: ['#008FFB'],
			},

			seriesSmall2: [
				{
					data: generateDayWiseTimeSeries(new Date('11 Feb 2017').getTime(), 20, {
						min: 10,
						max: 60,
					}),
				},
			],
			optionsSmall2: {
				chart: {
					id: 'li',
					group: 'social',
					type: 'area',
					height: 160,
					width: 300,
				},
				colors: ['#546E7A'],
			},
		};
	}

	render() {
		return (
			<div>
				<div id="wrapper">
					<div id="chart-line">
						<ReactApexChart
							options={this.state.options}
							series={this.state.series}
							type="line"
							height={160}
						/>
					</div>
					<div id="chart-line2">
						<ReactApexChart
							options={this.state.optionsLine2}
							series={this.state.seriesLine2}
							type="line"
							height={160}
						/>
					</div>
					<div id="chart-area">
						<ReactApexChart
							options={this.state.optionsArea}
							series={this.state.seriesArea}
							type="area"
							height={160}
						/>
					</div>
					<div class="columns">
						<div id="chart-small">
							<ReactApexChart
								options={this.state.optionsSmall}
								series={this.state.seriesSmall}
								type="area"
								height={160}
								width={300}
							/>
						</div>
						<div id="chart-small2">
							<ReactApexChart
								options={this.state.optionsSmall2}
								series={this.state.seriesSmall2}
								type="area"
								height={160}
								width={300}
							/>
						</div>
					</div>
				</div>
				<div id="html-dist"></div>
			</div>
		);
	}
}

const domContainer = document.querySelector('#app');
ReactDOM.render(React.createElement(ApexChart), domContainer);

// const chartOptions = {
// 	xaxis: {
// 		categories: options,
// 	},
// 	stroke: {
// 		curve: 'smooth',
// 	},
// };

// const chartSeries = series.map((serie) => ({
// 	name: serie.name,
// 	data: serie.data,
// }));

// if (!options || !series) {
// 	return <div>Please provide options and series data to display the chart.</div>;
// }

// return <Chart options={chartOptions} series={chartSeries} type={type} />;

import React from 'react';
import Chart from 'react-apexcharts';

export default function ChartComponent({ chartOptions, chartSeries, type }) {
	const renderChart = (type, options, series) => {
		switch (type) {
			case 'line':
				return <ReactApexChart options={options} series={series} type="line" height={160} />;
			case 'area':
				return <ReactApexChart options={options} series={series} type="area" height={160} />;
			default:
				return null;
		}
	};

	return (
		<div id="wrapper">
			{/* Render the chart based on the type */}
			{renderChart(type, chartOptions, chartSeries)}
		</div>
	);
}
