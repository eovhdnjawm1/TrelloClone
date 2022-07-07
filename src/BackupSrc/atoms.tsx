import { atom, selector } from 'recoil';
import { recoilPersist } from 'recoil-persist';

export enum ECategory {
	"해야할일" = "해야할일",
	"하는중" = "하는중",
	"완료" = "완료",
	"제거" = "제거",
}

export interface IToDo {
	text: string;
	// todo doing done 3개만 받을 수 있음
	category: ECategory,
	id: number;

}

const { persistAtom } = recoilPersist({
	key: 'todoLocal',
	storage: localStorage,
})

export const categoryState = atom<ECategory>({
	key: "categoryState",
	default: ECategory.해야할일,
});

export const toDostate = atom<IToDo[]>({
	key: "toDo",
	default: [],
	effects_UNSTABLE: [persistAtom],
});

export const toDoSelector = selector({
	key: "toDoSelector",
	get: ({ get }) => {
		const toDos = get(toDostate);
		const toCategory = get(categoryState);
		return toDos.filter((toDo) => toDo.category === toCategory);
	},
});

