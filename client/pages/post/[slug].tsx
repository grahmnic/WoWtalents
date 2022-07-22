import { useRouter } from 'next/router'

const Post = (props: any) => {
  const router = useRouter();

  const { slug } = router.query

  return <p>Post: {slug}</p>;
}

export default Post;