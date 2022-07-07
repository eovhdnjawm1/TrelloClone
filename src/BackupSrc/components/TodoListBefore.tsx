import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { errorSelector } from 'recoil';


// function TodoList() {
// 	const [toDo, setTodo] = useState("")
// 	const [toDoError, setTodoError] = useState("");
// 	const onChange = (event: React.FormEvent<HTMLInputElement>) => {
// 		const {
// 			currentTarget: { value },
// 		} = event;
// 		setTodoError("");
// 		setTodo(value);
// 	}
// 	const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
// 		event.preventDefault();
// 		console.log(toDo);

// 		if (toDo.length < 10) {
// 			return setTodoError("To do should be longer");
// 		}
// 	};


// 	return (
// 		<div>
// 			<form onSubmit={onSubmit}>
// 				<input onChange={onChange} value={toDo} placeholder='Write a to do' />
// 				<button>Add</button>
// 				{toDoError ? toDoError : null}
// 			</form>
// 		</div>
// 	);
// }
interface IForm {
	email: string;
	FirstName: string;
	LastName?: string;
	// 필수가 아니라면 물음표
	Username: string;
	Password: string;
	Passwordconfirm: string;
	extraError?: string;
}

function TodoList() {
	// register 함수를 사용하면 onchange 같은거 props같은거 쓸필요가 없음
	//  watch 는 변화를 감지하는 함수
	const { register, handleSubmit, formState: { errors }, setError } = useForm<IForm>({
		defaultValues: {
			email: "@naver.com",
		}
	});
	const onValid = (data: IForm) => {
		if (data.Password !== data.Passwordconfirm) {
			setError("Passwordconfirm",
				{ message: "비밀번호가 다릅니다." },
				{ shouldFocus: true })
		}
		// setError("extraError", { message: "server offline" })

	}
	console.log(errors);
	// formState.erros <- 에러핸들링을 찾아줌 값을 다 입력해도 minLength에 걸린다.
	// onValid로 required 빈곳으로 자동으로 커서가 간다. 2개 이상일 경우 첫번째꺼
	// minLength 이런거 간단한거 하나만 해도 바로 검증이 된다.
	return (
		<div>
			<form style={{ display: "flex", flexDirection: "column" }} onSubmit={handleSubmit(onValid)}>
				{/* ... 함으로써 register에 있는 것을 props로 넘겨줌 value, state, change 모두 대체 */}
				<input {...register("email", {
					required: "필수", pattern: {
						value: /^[A-Za-z0-9._%+-]+@naver.com$/,
						message: "네이버만 입력해야함",
					}
				})} placeholder='Email try' />
				{/* input 의 required 속성을 사용했을때는 관리자 모드로 required를 지워버릴 수 있음
				즉 html 이 아닌 js로 required적용 */}
				<span>{errors?.email?.message}</span>
				<input {...register("FirstName", {
					required: "적으슈",
					// validate: (value) => value.includes("Young") ? "Young 은 안된다" : true,
					validate: {
						noYoung: async (value) => value.includes("Young") ? "Young 은 안된다" : true,
						noJin: (value) => value.includes("Jin") ? "Jin도 안된다" : true,

					}

				})} placeholder='First Name' />
				<span>{errors?.FirstName?.message}</span>

				<input {...register("LastName", { required: "적으슈" })} placeholder='Last Name' />
				<span>{errors?.LastName?.message}</span>
				<input {...register("Username", {
					required: "적으슈", minLength: {
						value: 5,
						message: "닉네임이 너무짧아요"
					}
				})} placeholder='Username' />
				<span>{errors?.Username?.message}</span>

				<input type={'password'} {...register("Password", { required: "적으슈" })} placeholder='Password' />
				<span>{errors?.Password?.message}</span>

				<input {...register("Passwordconfirm", { required: "적으슈" })} placeholder='Password confirm' />
				<span>{errors?.Passwordconfirm?.message}</span>
				<button>Add</button>
				<span>{errors?.extraError?.message}</span>
			</form>
		</div >
	)
}

export default TodoList;