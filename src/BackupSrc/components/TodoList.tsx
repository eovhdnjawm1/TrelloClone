import { useRecoilState, useRecoilValue } from 'recoil';
import { categoryState, ECategory, toDostate } from '../atoms';
import CreateToDo from './CreateToDo';
import ToDo from './ToDo'
import { toDoSelector } from '../atoms';

function ToDoListAfter() {
	// const value = useRecoilValue(toDostate);
	// const modFn = useSetRecoilState(toDostate);
	// 위에 2개가 아래 2개랑 같음
	// const [toDos, setToDos] = useRecoilState(toDostate);

	// const toDos = useRecoilValue(toDostate)
	// console.log(toDos);

	const todos = useRecoilValue(toDoSelector);
	const [category, setCategory] = useRecoilState(categoryState);
	const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
		setCategory(event.currentTarget.value as any);
	}


	return (

		<>
			<h1>To Dos</h1>
			<select onInput={onInput} value={category}>
				<option value={ECategory.해야할일}>해야할 것</option>
				<option value={ECategory.하는중}>하는 중</option>
				<option value={ECategory.완료}>완료</option>
			</select>
			<hr />
			<CreateToDo />
			<hr />
			<ul>

				{todos?.map((toDo) => (
					<ToDo key={toDo.id} {...toDo} />
				))}
			</ul>



		</>
	)
}

export default ToDoListAfter;