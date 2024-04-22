'use client';
import ReactCharts from 'echarts-for-react';

interface ClassroomUsageChartProps {
	data: number[];
	labels: string[];
	classnames: string;
}

export const ClassroomUsageChart = ({ data, labels, classnames }: ClassroomUsageChartProps) => {
	const options = {
		xAxis: {
			type: 'category',
			data: labels,
		},
		yAxis: {
			// type: 'value',
		},
		series: [
			{
				data,
				type: 'bar',
				showBackground: true,
				backgroundStyle: {
					color: '#9cedff44',
					borderRadius: 8,
				},
				color: ['#008af3'],
			},
		],
	};

	return (
		<ReactCharts
			option={options}
			className={classnames}
			style={{
				height: '100%',
			}}
		/>
	);
};
