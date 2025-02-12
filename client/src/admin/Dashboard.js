import React, { Component } from "react";
import NavBar from "../components/NavBar";
import CanvasJSReact from "../canvas/canvasjs.react"

import axios from "axios";

// eslint-disable-next-line
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

var dd=[];
class Dashboard extends Component {
    constructor(props) {
        super(props);
        // initialize the state with an empty todos array
        this.state = {c1: [],c2:[],c3:[]
                   
        };
    }
	getGroupdata(){
		axios.get('https://studybuddypakistan.herokuapp.com/groups/')
            .then(response => {
				
				var dict={};
				dd=[];
				response.data.forEach(element => {
					//console.log(element);
					// eslint-disable-next-line
					if( dict[element.instructor.email] == undefined){
						dict[element.instructor.email] = 1;
					}
					else{
						dict[element.instructor.email] += 1;
					}
					
				});
				
				for( var k in dict){
					dd.push({ y : dict[k], label: k })
				}
				console.log(dd);
				
				this.setState({ c1: dd });
				dd=[]
				dict={}


				response.data.forEach(element => {
					//console.log(element);label
					// eslint-disable-next-line
					if( dict[element.category.categoryName] == undefined){
						dict[element.category.categoryName] = 1;
					}
					else{
						dict[element.category.categoryName] += 1;
					}
					
				});
				// eslint-disable-next-line
				for( var k in dict){
					dd.push({ y : dict[k], name: k })
				}
				console.log(dd);
				
				this.setState({ c3: dd });
            })
            .catch(function (error){
                console.log(error);
            })
	}

	getEnrollmentdata(){
		axios.get('https://studybuddypakistan.herokuapp.com/enrollments/')
            .then(response => {
				
				var dict={};
				dd=[];
				response.data.forEach(element => {
					//console.log(element);
					// eslint-disable-next-line
					if( dict[element.group.groupName] == undefined){
						dict[element.group.groupName] = 1;
					}
					else{
						dict[element.group.groupName] += 1;
					}
					
				});
				
				for( var k in dict){
					dd.push({ y : dict[k], label: k })
				}
				console.log(dd);
				this.setState({ c2: dd });
            })
            .catch(function (error){
                console.log(error);
            })
	}

	

    componentDidMount() {
        
			this.getGroupdata()
			this.getEnrollmentdata()
        
       
    }
    
      
	render() {
		
		const options1 = {
			exportEnabled: true,
			animationEnabled: true,
			title: {
				text: "Groups Per Instructor"
			},
			data: [{
				type: "pie",
				startAngle: 75,
				toolTipContent: "<b>{label}</b>: {y}",
				showInLegend: "true",
				legendText: "{label}",
				indexLabelFontSize: 16,
				indexLabel: "{label} - {y}",
				dataPoints: this.state.c1                                                                

			}]
		}

		const options2 = {
			exportEnabled: true,
			animationEnabled: true,
			title: {
				text: "Students Per Group"
			},
			data: [
			{
				// Change type to "doughnut", "line", "splineArea", etc.
				type: "column",
				dataPoints: this.state.c2
			}
			]
		}

		const options3 = {
			exportEnabled: true,
			animationEnabled: true,
			
			title: {
				text: "Groups Per Category"
			},
			subtitles: [{
				
				verticalAlign: "center",
				fontSize: 24,
				dockInsidePlotArea: true
			}],
			data: [{
				type: "doughnut",
				showInLegend: true,
				indexLabel: "{name}: {y}",
				yValueFormatString: "#,###",
				dataPoints:this.state.c3
			}]
		}

		return (
      <div>
        <NavBar />
     
			<div className='container'>
				<tr className='row'>
		<th className="col-md-6">
			<CanvasJSChart options = {options1}
				/* onRef={ref => this.chart = ref} */
			/>
			</th>
		<th className="col-md-6">
			<CanvasJSChart options = {options3}
				/* onRef={ref => this.chart = ref} */
			/>
		</th>
		</tr>	
		<br></br>
		<div className="row">
			<CanvasJSChart options = {options2}
				/* onRef={ref => this.chart = ref} */
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
    </div>
		</div>
		);
	}
}

export default Dashboard;
