import Head from 'next/head'

export default function Seo({ title }) {
  return (
    <Head>
      <title>{`${title} | Next Movies`}</title>
    </Head>
  )
}
// Warning: A title element received an array with more than 1 element as children. 
//In browsers title Elements can only have Text Nodes as children. 
//If the children being rendered output more than a single text node in aggregate the browser will display markup and comments as text in the title and hydration will likely fail and fall back to client rendering
// 위에 경고가 나와서 https://velog.io/@xmun74/A-title-element-received-an-array-with-more-than-1-element-as-children 참고해서 고침
// 문제되는 부분 <title>{title} | Next Movies</title>
//이부분이 React render에서는
// <title> <!-- -->{title}<!-- --> | xmunt blog</title>
// 변수 앞뒤로 주석으로 되는데 주석은 HTML노드여서 하위노드로 간주된다
// 주석-글자-주석-글자 => 이런식으로 여러 개의 자식노드가 있는 셈이 되어버린다 그래서 바꾸니 경고 안뜸
//