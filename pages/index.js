import { useEffect, useState } from 'react'
import Seo from '../components/Seo'
import Link from 'next/link'
import { useRouter } from 'next/router'

// const KEY = '35ba1135f8dab3f0491d31e22c9ce301'
// const URL = `https://api.themoviedb.org/3/movie/popular?api_key=${KEY}`
//https://www.themoviedb.org/ 여기에 회원 가입을 해서 key를 부여받음 그리고 popular(인기 순위)주소를 찾음

export default function Home({ results }) {
  const router = useRouter()
  const onClick = (id, title) => {
    router.push(
      {
        //객체를 써서 중괄호를 썻다
        pathname: `/movies/${id}`,
        query: {
          // id,//id는 url에 적혀져 나와서 필요없음
          title,
        },
      },
      `/movies/${id}`, //router.push의 두번째 옵션 url주소에 보면 위에 query의 내용이 나타나지 않는다
    )
    // router.push(`/movies/${id}`)//이렇게 주소를 String을 써도 되지만 객체를 써도 된다
    // router.push(url, as, options)
    // 클라이언트 측 전환을 처리합니다. 이 방법은 next/link가 충분하지 않은 경우에 유용합니다.
    // url: UrlObject | String: 탐색할 URL
    // as: UrlObject | String: 브라우저 URL 표시줄에 표시될 경로에 대한 선택적 데코레이터입니다.
    console.log(title) //title가 undifine이 나와서 보니 Home에 인자를 넣음 ㅜㅜ
  }
  // const [movies, setMovies] = useState()

  // useEffect(() => {
  //   //useEffect의 첫번째 인자는 콜백함수를 받는다
  //   ;(async () => {
  //     const { results } = await (await fetch(`/api/movies`)).json()
  //     //응답 데이터의 results 속성을 구조 분해 할당(destructuring assignment)을 사용하여 추출
  //     setMovies(results)
  //   })() //익명의 콜백 함수를 즉시 호출하는 IIFE(Immediately Invoked Function Expression)를 사용하여 비동기 함수를 실행
  // }, [])

  //위에 코드와 같은것
  // const getMovies = async () => {
  //   const { results } = await (await fetch(URL)).json()
  //   setMovies(results)
  // }
  // useEffect(() => {
  //   getMovies()
  // }, [])

  return (
    <div className="container">
      <Seo title="Home" />
      {/* {!movies && <h4>loading....</h4>} */}
      {/* movies가 값이 없음 && (and연산)으로 <h4></h4>가 실행된다 */}
      {results?.map((
        movie, //밑에 getServerSideProps를 적어 movies가 없어짐 그래서 results를 받음
      ) => (
        // movies?는 Optional Chaining(선택적 체이닝)을 의미하며, 값이 존재하는 경우에만 map() 함수를 실행
        // movies가 null 또는 undefined일 경우, 일반적인 접근 방식인 movies.map()을 사용하면 에러가 발생할 수 있습니다. 하지만 Optional Chaining(movies?.map())을 사용하면 movies가 null 또는 undefined인 경우에도 코드가 정상적으로 실행되며, map() 함수가 실행되지 않습니다.

        <div
          className="movie"
          onClick={() => onClick(movie.id, movie.original_title)}
          href={{
            pathname: `/movies/${movie.id}`,
            query: { title: movie.original_title },
          }}
          as={`/movies/${movie.id}`} //as 주소를 감추는것 router.push의 두번째 항목처럼 하는것
          key={movie.id}
        >
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
          <h4>{movie.original_title}</h4>
        </div>
      ))}
      <style jsx>{`
        .container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          padding: 20px;
          gap: 20px;
        }
        .movie {
          cursor: pointer;
        }
        .movie img {
          max-width: 100%;
          border-radius: 12px;
          transition: transform 0.2s ease-in-out;
          box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
        }
        .movie:hover img {
          transform: scale(1.05) translateY(-10px);
        }
        .movie h4 {
          font-size: 18px;
          text-align: center;
        }
      `}</style>
    </div>
  )
}

export async function getServerSideProps() {
  //여기 이름은 바뀌면 안된다(getServerSideProps) 오로지 server에서 작동을 할것임 여기에 api_kye를 적음 절대 client에선 보이지 않는다
  const { results } = await (
    await fetch(`http://localhost:3000/api/movies`)
  ).json()
  return {
    props: {
      results,
    },
  }
}
//next 13.4 버전 기준으로 getServerSideProps 대신에 fetch에 옵션 값('no-store')을 주어 SSR을 구현할 수 있습니다. (기존 getServerSideProps는 레거시가 되었다고 합니다.)

// https://ahnanne.tistory.com/92
// 참고하여 작성하였습니다!

// async function fetchData() {
// const res = await fetch('http://localhost:3000/api/movies', {
// cache: 'no-store',
// })
// const { results } = await res.json()
// return results
// }

// export default async function Home() {
// const results = await fetchData()
// return (
// *div*
// {results?.map((movie: any) => (
// ... (코드 동일)
// ))}
// */div*
// )
// }
