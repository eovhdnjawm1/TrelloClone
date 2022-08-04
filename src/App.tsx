
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useRecoilState, useRecoilValue } from 'recoil';
import { hourSelector, minutesState } from './atoms';


function App() {
	const [minutes, setMinutes] = useRecoilState(minutesState)
	const [hours, setHours] = useRecoilState(hourSelector)
	const onMinutesChange = (event: React.FormEvent<HTMLInputElement>) => {
		setMinutes(+event.currentTarget.value);
	}

	const onHoursChange = (event: React.FormEvent<HTMLInputElement>) => {
		setHours(+event.currentTarget.value);
	}

	const onDragEnd = () => { };

	return (
		<>
			<input value={minutes} onChange={onMinutesChange} type="number" placeholder='Minutes' />
			<input onChange={onHoursChange} value={hours} type="number" placeholder='Hours' />
			<DragDropContext onDragEnd={onDragEnd}>
				<div>
					<Droppable droppableId="one">
						{() => (
							<ul>
								<Draggable draggableId="first" index={0}>
									{() => <li>One</li>}
								</Draggable>
								<Draggable draggableId="second" index={1}>
									{() => <li>Two</li>}
								</Draggable>
							</ul>
						)}
					</Droppable>
				</div>

			</DragDropContext>
		</>
	);
}

export default App;
