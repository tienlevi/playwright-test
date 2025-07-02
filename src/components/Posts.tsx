import usePost from "../hooks/usePost";

function Posts() {
  const { data } = usePost();
  return <div>Render Item</div>;
}

export default Posts;
