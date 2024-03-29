import { useEffect, useRef, useState } from 'react';
import './App.css';
import { AND } from './logic';


const tableValues = [
	['P0', 'P1',  'Rns' ,'Gns',	'Yns', 'Rew', 'Yew', 'Gew'],
	['0',	'0',	'0',	'0',	'1',	'1',	'0',	'0'],
	['0',	'1',	'0',	'1',	'0',	'1',	'0',	'0'],
	['1',	'0',	'1',	'0',	'0',	'0',	'0',	'1'],
	['1',	'1',	'1',	'0',	'0',	'0',	'1',	'0']
]


function TrafficLight({P0, P1, direction}){
	// States are such that
	// Red = 0
	// Yellow = 1
	// Green = 3
	if (direction == 'NS'){

		let R = P0 				// P1
		let Y = AND(!P0, P1)	// P1'.P0
		let G = AND(!P0, !P1) 	// P1'.P0'

		//console.log('NS: ',R,Y,G)

		return (
			<div className='w-full flex flex-col items-center gap-2 md:gap-4 p-4 bg-gray-300'>
				<span className='w-16 h-16 rounded-full border-4 border-gray-400' style={{backgroundColor: (R) ? 'red' : 'black'}} > </span>
				<span  className='w-16 h-16 rounded-full border-4 border-gray-400'  style={{backgroundColor: (Y) ? 'yellow' : 'black'}}></span>
				<span  className='w-16 h-16 rounded-full border-4 border-gray-400'  style={{backgroundColor: (G) ? 'lightgreen' : 'black'}}></span>
			</div>
		)
	} else {

		let R = !P0 			// P0'
		let Y = AND(P0, P1) 	// P0.P1
		let G = AND(P0, !P1) 	// P1.P0'

		//console.log('EW: ', R,Y,G)

		return (
			<div className='w-full flex flex-col items-center gap-2 md:gap-4 p-4 bg-gray-300'>
				<span className='w-16 h-16 rounded-full border-4 border-gray-400' style={{backgroundColor: (R) ? 'red' : 'black'}} > </span>
				<span  className='w-16 h-16 rounded-full border-4 border-gray-400'  style={{backgroundColor: (Y) ? 'yellow' : 'black'}}></span>
				<span  className='w-16 h-16 rounded-full border-4 border-gray-400'  style={{backgroundColor: (G) ? 'lightgreen' : 'black'}}></span>
			</div>
		)
	}
}


function App() {

	const [P0, setP0] = useState(false)
	const [P1, setP1] = useState(false)
	const [timer, setTimer] = useState(0)
	const timerRef = useRef();

	let period = 6
	
	const tableAlgebra = [
		AND(!P0, !P1),
		AND(!P0, P1),
		AND(P0, !P1),
		AND(P0, P1)
	]

	function updateTimer(){
		let newTimer, newP0, newP1;
		let modTimer = timer % period
		let stateValues = {
			0: [0, 0],
			1: [0, 1],
			2: [1, 0],
			3: [1, 1]
		 }
		
		if(modTimer != 0){}
		else {
			let stateVal = (timer/period).toFixed(0)
			stateVal = stateVal % 4 

			newP0 = stateValues[stateVal][0]
			newP1 = stateValues[stateVal][1]
			
			setP0(newP0)
			setP1(newP1)
		} 

		newTimer = timer + 1
		setTimer(newTimer)
	}

	useEffect(()=> {
		timerRef.current = setInterval(updateTimer, 1000);
		return () => {
			clearInterval(timerRef.current);
		  }
	}, [timer])

	return (
		<main className='p-8 min-h-screen w-full flex flex-col gap-4'>
			<section className='p-4 flex flex-col items-center gap-2'>
				<h1 className='font-bold text-3xl text-center'>DCIT 203 SEMESTER PROJECT</h1>
				<h3>Group 47</h3>
			</section>
			<section className='mx-auto flex gap-10'>
				<span  className='flex flex-col gap-2 items-center' >
					<div className='md:w-36 overflow-hidden rounded-3xl border-4 border-gray-500'>
						<TrafficLight direction={'NS'} P0={P0} P1={P1} />
					</div>
					<small className='text-center'>North-South Direction</small>
				</span>
				<span className='flex flex-col gap-2 items-center' >
					<div className='md:w-36 overflow-hidden rounded-3xl border-4 border-gray-500'>
						<TrafficLight direction={'EW'} P0={P0} P1={P1}/>
					</div>
					<small className='text-center'>East-West Direction</small>
				</span>
			</section>
			<section className='m-auto flex flex-col items-center gap-3'>
				<span>
					<h4 className=' underline underline-offset-2'>Variables</h4>
				</span>
				<span className='flex md:flex-col gap-2 items-center'>
					<h4><span className='font-bold'>Timer:</span> {timer}s</h4>
					<h4><span className='font-bold'>P0:</span> {P0}</h4>
					<h4><span className='font-bold'>P1:</span> {P1}</h4>
				</span>
			</section>
			<section className='m-auto flex items-center'>
				<table className='border-2 border-black rounded-full'>
					<thead className='border-b-2 border-black'>				
						{tableValues[0].map( (header, idx) =>{
							return (
								<td className='p-1 md:p-2 m-auto' style={{borderRight: (idx == 1) ? '2px black solid' : ''}} key={idx}>{header}</td>
							)
						}) }
					</thead>
					{
						tableValues.slice(1).map((valRow, idx)=>{
							return(
								<tr className='border-b-2 border-b-gray-300 last:border-0' style={{fontWeight: (tableAlgebra[idx] ? 'bold' : '' )}}  key={idx}>
									{
										valRow.map( (val, idx) => {
											return (
												<td className='p-1 md:p-2 text-center' style={{borderRight: (idx == 1) ? '2px black solid' : ''}} key={idx} >{val}</td>
											)
										})
									}
								</tr>
							)
						})
					}
				</table>
				
			</section>
		</main>
	);
}

export default App;
