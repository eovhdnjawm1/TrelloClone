import { useLocation } from 'react-router-dom';
import { URLSearchParams } from 'url';



function Search() {
	const location = useLocation();
	console.log(location);

	const keyword = new URLSearchParams(location.search).get("keyword");
	return (
		<>
		</>

	)
}

export default Search;