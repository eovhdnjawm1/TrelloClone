import { atom, selector } from 'recoil';


export const minutesState = atom({
	key: "minutes",
	default: 0,
});


export const hourSelector = selector({
	key: "hours",
	get: ({ get }) => {
		// selector 안에서 aotm에 접근하고 싶다면? get을 쓰는것
		const minutes = get(minutesState);
		return minutes / 60;

	}
})