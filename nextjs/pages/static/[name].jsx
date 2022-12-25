import fetch from 'isomorphic-unfetch'

const name = ({ user, time }) => {
  const username = user && user.name
  return (
    <div>
      {username}
      {time}
    </div>
  )
}

export async function getStaticPaths () {
  return {
    paths: [{ params: { name: '56thfk' } }],
    fallback: true
  }
}

export const getStaticProps = async ({ params }) => {
  try {
    const res = await fetch(`https://api.github.com/users/${params.name}`)
    if (res === 200) {
      const user = await res.json()
      return { props: { user, time: new Date().toISOString() } }
    }
    return { props: { time: new Date().toISOString() } }
  } catch (e) {
    console.log(e)
    return { props: { } }
  }
}

export default name
