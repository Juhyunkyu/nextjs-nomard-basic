/** @type {import('next').NextConfig} */

const API_KEY = process.env.API_KEY // 키를 숨기기위해 .env 파일을 만들고 github에 올라가지않게 .gitignore 파일에 작성

const nextConfig = {
  reactStrictMode: true,

  async redirects() {
    // url이 변하는것
    return [
      {
        source: '/old-blog/:path*', //여기 주소로 가면 destination 주소로 간다
        destination: '/next-sexy-blog/:path*',
        permanent: false,
      },
      // { 하나더 써주려면 이렇게 달아서 쓰면 된다
      //   source:
      //   destination:
      //   parmanent:
      // }
    ]
  },
  async rewrites() {
    //url일 변하지 않는것
    return [
      {
        source: '/api/movies', // api키를 숨기기위해 rewrites함수를 썻다
        destination: `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`,
      },
      {
        source: '/api/movies/:id', //영화 api 사이트에 가면 /movies/{movie.id}로 접근하라고 되어있음(https://developer.themoviedb.org/reference/movie-details)
        destination: `https://api.themoviedb.org/3/movie/:id?api_key=${API_KEY}`, //source에 :id라고 적음 여기도 :id라고 적어야함
      },
    ]
  },
}
module.exports = nextConfig
