const API_KEY = 'eec88896e5c19ed3e854c3c64c9a184a';
const BASE_PATH = "https://api.themoviedb.org/3"
const POSTER_PATH = "https://image.tmdb.org/t/p/"



interface IMovie {
	id: number;
	backdrop_path: string;
	poster_path: string;
	title: string;
	overview: string;
}

export interface IGetMovieResult {
	dates: {
		maximum: string;
		minimum: string;
	};
	page: number;
	results: IMovie[];
	total_pages: number;
	total_results: number;
}

export function getMovies() {
	return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`).then(
		res => res.json())
}




// const BASE_URL = `https://api.coinpaprika.com/v1`;

// export function fetchCoins() {
// 	return fetch(`${BASE_URL}/coins`).then(response => response.json());
// }

// export function fetchCoinInfo(coinId: string) {
// 	return fetch(`${BASE_URL}/coins/${coinId}`).then(response => response.json());
// }

// export function fetchCoinTickers(coinId: string) {
// 	return fetch(`${BASE_URL}/tickers/${coinId}`).then(response => response.json());
// }

// export function fetchCoinHistory(coinId: string) {

// 	const endDate = Math.floor(Date.now() / 1000)
// 	//  일주일 전
// 	const startDate = endDate - 60 * 60 * 23;

// 	return fetch(
// 		`${BASE_URL}/coins/${coinId}/ohlcv/historical?start=${startDate}&end=${endDate}`
// 	).then((response) => response.json());
// }


// export function fetchCoinPrice(coinId: string) {
// 	return fetch(`${BASE_URL}/coins/${coinId}/ohlcv/today`).then((response) =>
// 		response.json()
// 	);
// }


// // floor 는 내림 처리
// // ceil 는 올림 처리



