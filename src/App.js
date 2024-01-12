import { useEffect, useRef, useState } from 'react';
import './App.css';
import { AND } from './logic';

function TrafficLight({P0, P1, direction}){
	// States are such that
	// Red = 0
	// Yellow = 1
	// Green = 3
	if (direction == 'NS'){

		let R = P1 				// P1
		let Y = AND(!P1, P0)	// P1'.P0
		let G = AND(!P1, !P0) 	// P1'.P0'

		console.log('NS: ',R,Y,G)

		return (
			<div className='w-full flex flex-col items-center md:gap-4 p-4 bg-gray-300'>
				<span className='w-16 h-16 rounded-full border-4 border-gray-400' style={{backgroundColor: (R) ? 'red' : 'black'}} > </span>
				<span  className='w-16 h-16 rounded-full border-4 border-gray-400'  style={{backgroundColor: (Y) ? 'yellow' : 'black'}}></span>
				<span  className='w-16 h-16 rounded-full border-4 border-gray-400'  style={{backgroundColor: (G) ? 'green' : 'black'}}></span>
			</div>
		)
	} else {

		let R = !P1 			// P1'
		let Y = AND(P1, P0) 	// P1.P0
		let G = AND(P1, !P0) 	// P1.P0'

		console.log('EW: ', R,Y,G)
		

		return (
			<div className='w-full flex flex-col items-center md:gap-4 p-4 bg-gray-300'>
				<span className='w-16 h-16 rounded-full border-4 border-gray-400' style={{backgroundColor: (R) ? 'red' : 'black'}} > </span>
				<span  className='w-16 h-16 rounded-full border-4 border-gray-400'  style={{backgroundColor: (Y) ? 'yellow' : 'black'}}></span>
				<span  className='w-16 h-16 rounded-full border-4 border-gray-400'  style={{backgroundColor: (G) ? 'green' : 'black'}}></span>
			</div>
		)
	}
}


function App() {

	const [P0, setP0] = useState(false)
	const [P1, setP1] = useState(false)
	const [timer, setTimer] = useState(0)
	const timerRef = useRef();

	function updateTimer(){
		let newTimer;
		let newP0;
		let newP1;
		if(timer == 6){
			newP0 = 0
			newP1 = 1
		} else if(timer == 12){
			newP0 = 1;
			newP1 = 0
		} else if(timer == 18){
			newP0 = 1
			newP1 = 1
		} else {
			newP0 = P0
			newP1 = P1
		}
		newTimer = timer + 1
		setP0(newP0)
		setP1(newP1)
		setTimer(newTimer)
	}

	useEffect(()=> {
		timerRef.current = setInterval(updateTimer, 2000);
		return () => {
			clearInterval(timerRef.current);
		  }
	}, [timer])

	return (
		<main className='p-8 min-h-screen w-full flex flex-col gap-4'>
			<section className='p-4 flex flex-col items-center gap-2'>
				<h1 className='font-bold text-3xl'>DCIT 203 SEMESTER PROJECT</h1>
				<h3>Group 47</h3>
			</section>
			<section className='mx-auto flex gap-10'>
				<div className='md:w-36 overflow-hidden rounded-3xl border-4 border-gray-500'>
					<TrafficLight direction={'NS'} P0={P0} P1={P1} />
				</div>
				<div className='md:w-36 overflow-hidden rounded-3xl border-4 border-gray-500'>
					<TrafficLight direction={'EW'} P0={P0} P1={P1}/>
				</div>
			</section>
			<section>
				Table?
			</section>
			<section className='flex flex-col gap-3'>
				<span>
					<h4>Controls</h4>
				</span>
				<span>
					<h4>Timer: {timer}s</h4>
				</span>
			</section>
		</main>
	);
}

export default App;
