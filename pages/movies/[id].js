import { loadBindings } from 'next/dist/build/swc'
import { useRouter } from 'next/router'

export default function Detail() {
  const router = useRouter()
  console.log(router) //해보면 query에 id랑 title이름 나옴
  return (
    <div>
      <h4>{router.query.title || 'loadings...'}</h4>
      {/* router.query.title가 없음 loading....을 보여라 */}
    </div>
  )
}
