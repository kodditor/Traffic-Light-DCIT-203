import { useState } from 'react';
import './App.css';

function TrafficLight({state}){
	// States are such that
	// Red = 0
	// Yellow = 1
	// Green = 3
	return (
		<div className='w-full flex flex-col items-center md:gap-4 p-4 bg-gray-300'>
			<span className='w-16 h-16 rounded-full border-4 border-gray-400' style={{backgroundColor: (state === 0) ? 'red' : 'black'}} > </span>
			<span  className='w-16 h-16 rounded-full border-4 border-gray-400'  style={{backgroundColor: (state ===  1) ? 'yellow' : 'black'}}></span>
			<span  className='w-16 h-16 rounded-full border-4 border-gray-400'  style={{backgroundColor: (state ===  2) ? 'green' : 'black'}}></span>
		</div>
	)
}

function App() {
	
	const [P0, setP0] = useState(false)
	const [P1, setP1] = useState(false)

	return (
		<main className='p-8 min-h-screen w-full flex flex-col gap-4'>
			<section className='p-4 flex flex-col items-center gap-2'>
				<h1 className='font-bold text-3xl'>DCIT 203 SEMESTER PROJECT</h1>
				<h3>Group 47</h3>
			</section>
			<section className='mx-auto flex gap-10'>
				<div className='md:w-36 overflow-hidden rounded-3xl border-4 border-gray-500'>
					<TrafficLight state={2} />
				</div>
				<div className='md:w-36 overflow-hidden rounded-3xl border-4 border-gray-500'>
					<TrafficLight state={0} />
				</div>
			</section>
		</main>
	);
}

export default App;
