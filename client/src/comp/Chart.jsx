import React, { useEffect, useState } from 'react'
import {Bar, Line, Pie} from 'react-chartjs-2'
import { useSelector} from "react-redux"

export default function Chart({data}) {

    const usernameInStore = useSelector(state=>state.username)
    const roleInStore = useSelector(state=>state.role)

    
    return (

        <>
            <h1 className="chartTopic">Follower chart</h1>

        <div className="chart">
            <Bar
            data={data.chartData}
            width={500}
            height={400}
            options={{
                maintainAspectRatio : false
            }}
            />
        </div>
        </>
    )
}













// var React = require('react');
// var Component = React.Component;
// var CanvasJSReact = require('./canvasjs.react');
// var CanvasJS = CanvasJSReact.CanvasJS;
// var CanvasJSChart = CanvasJSReact.CanvasJSChart;
// export default function Chart() {
// 	render(
// 		const options = {
// 			title: {
// 				text: "Basic Column Chart"
// 			},
// 			data: [
// 			{
// 				// Change type to "doughnut", "line", "splineArea", etc.
// 				type: "column",
// 				dataPoints: [
// 					{ label: "Apple",  y: 10  },
// 					{ label: "Orange", y: 15  },
// 					{ label: "Banana", y: 25  },
// 					{ label: "Mango",  y: 30  },
// 					{ label: "Grape",  y: 28  }
// 				]
// 			}
// 			]
// 		}
// 		return (
// 		<div>
// 			<CanvasJSChart options = {options}
// 				/* onRef={ref => this.chart = ref} */
// 			/>
// 			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
// 		</div>
// 		);
// 	}
// }
// module.exports = App;   