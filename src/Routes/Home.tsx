import { useQuery } from 'react-query';
import { getMovies, IGetMovieResult } from './../api';
import styled from 'styled-components';
import { makeImagePath } from './../utilities';
import { motion, AnimatePresence, useViewportScroll } from 'framer-motion';
import { useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';



const Wrapper = styled.div`
	background-color: black;
`

const Loader = styled.div`
	height: 20vh;
	display: flex;
	justify-content: center;
	align-items: center;
`

const Banner = styled.div<{ bgPhoto: string }>`
	height: 200vh;
	display: flex;
	flex-direction: column;
	justify-content:center;
	padding: 60px;
	background-image: linear-gradient(rgba(0,0,0, 0),
	rgba(0,0,0, 1)) ,url(${props => props.bgPhoto});
	background-size: cover;

`

const Title = styled.h2`
	font-size: 50px;
	margin-bottom: 20px;
`

const Overview = styled.p`
	font-size: 25px;
	width: 50%;
`
const Slider = styled.div`
	position: relative;
	top: -100px;
`

const Row = styled(motion.div)`
 	display:grid;
	grid-template-columns: repeat(6, 1fr);
	gap: 15px;
	position: absolute;
	width: 100%;
`


const Box = styled(motion.div) < { bgPhoto: string }> `
	background-color: red;
	height: 200px;
	font-size: 36px;
	background-image: url(${(props) => props.bgPhoto});
	background-size: cover;
	background-position: center center;
	
	cursor:pointer;

	&:first-child{
		transform-origin:center left;
	}
	&:last-child{
		transform-origin: center right;
	}
`

const rowVariants = {
	// 보이지 않을때
	hidden: {
		x: window.outerWidth - 20,
	},
	// 보일 때
	visible: {
		x: 10,
	},
	// 사라질때
	exit: {
		x: -window.outerWidth + 20,
	},
}

const boxVariants = {

	normal: {
		scale: 1,
	},
	hover: {
		scale: 1.2,
		y: -50,
		transition: {
			delay: .5,
			duration: 0.3,
			type: "tween",
		},
	},
}

const Info = styled(motion.div)`
	padding: 20px;
	background-color: ${props => props.theme.black.lighter};
	opacity: 0;
	position: absolute;
	width: 100%;
	bottom: 0;

	h4 {
		text-align: center;
		font-size: 18px;
	}
`

const infoVariants = {
	hover: {
		opacity: 1,
		transition: {
			delay: .5,
			duration: 0.3,
			type: "tween",
		},
	},
}

const Overlay = styled(motion.div)`
	position:fixed;
	top: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	opacity : 0;
`
// 
// , scrolly: number 
const BigMovie = styled(motion.div)`
	position: absolute;
	width: 40vw;
	height: 80vh;
	right: 0;
	left: 0;
	margin: 50px auto 0;
	border-radius: 15px;
	overflow: hidden;
	background-color: ${props => props.theme.black.lighter};
`

const BigCover = styled.div`
	width: 100%;
	background-size: cover;
	background-position: center center;
	height: 400px;
`

const BigTitle = styled.h3`
	color: ${props => props.theme.white.lighter};
	font-size: 32px;
	padding: 10px;
	position: relative;
	top: -80px;
`;

const BigOverview = styled.p`
	padding: 20px;
	position: relative;
	top: -80px;
	color: ${props => props.theme.white.lighter};
`



// 한번에 보여주고싶은 영화 수
const offset = 6;

function Home() {
	const { data, isLoading } = useQuery<IGetMovieResult>
		(["movies", "nowPlaying"], getMovies)

	const [index, setIndex] = useState(0)
	const [leaving, setLeaving] = useState(false);
	const history = useHistory();
	const bigMovieMatch = useRouteMatch<{ movieId: string }>("/movies/:movieId");
	const { scrollY } = useViewportScroll()
	const incraseIndex = () => {

		if (data) {
			if (leaving) return;
			toggleLeaving();
			const totalMovie = data.results.length - 1;
			const maxIndex = Math.ceil(totalMovie / offset) - 1;
			//  page가 0에서 시작하기 때문에 1감소
			setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
		}
		console.log("들옴?")
	}

	const toggleLeaving = () => setLeaving(prev => !prev)
	const onBoxClicked = (movieId: number) => {
		// 내가 클릭하고 있는 q박스의 url을 알아야함
		history.push(`/movies/${movieId}`)
	}

	const onOverlayClick = () => {
		history.push("/")
	}

	const clickedMovie = bigMovieMatch?.params.movieId && data?.results.find(
		movie => String(movie.id) === bigMovieMatch.params.movieId);




	return (
		<Wrapper >
			{isLoading ? <Loader>Loading...</Loader> :
				<>
					<Banner onClick={incraseIndex}
						bgPhoto={makeImagePath(data?.results[0].backdrop_path || "")}>
						<Title>{data?.results[0].title}</Title>
						<Overview>{data?.results[0].overview}</Overview>
					</Banner>
					<Slider>
						<AnimatePresence
							initial={false}
							onExitComplete={toggleLeaving}>
							<Row variants={rowVariants} key={index}
								initial="hidden"
								animate="visible"
								exit="exit"
								transition={{ type: "tween", duration: 1 }}

							>

								{data?.results.slice(1).slice(offset * index, offset * index + offset)
									.map((movie) => (
										<Box key={movie.id}
											layoutId={movie.id + ""}
											whileHover="hover"
											initial="normal"
											variants={boxVariants}
											transition={{ type: 'tween' }}
											bgPhoto={makeImagePath(movie.backdrop_path, "w500")}
											onClick={() => onBoxClicked(movie.id)}
										>
											<Info variants={infoVariants}>
												<h4>{movie.title}</h4>
											</Info>
										</Box>

									))}
							</Row>
						</AnimatePresence>
					</Slider>
					<AnimatePresence>
						<></>
						{bigMovieMatch ? (
							<>
								<Overlay onClick={onOverlayClick}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }} />
								<BigMovie style={{ top: scrollY }}
									layoutId={bigMovieMatch.params.movieId}>
									{clickedMovie && <>
										<BigCover
											style={{
												backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
													clickedMovie.backdrop_path,
													"w500"
												)})`,
											}}
										/>
										<BigTitle>{clickedMovie.title}</BigTitle>
										<BigOverview>{clickedMovie.overview}</BigOverview>
									</>}
								</BigMovie>
							</>
						) : null}
					</AnimatePresence>
				</>
			}
		</Wrapper>

	)
}

export default Home;