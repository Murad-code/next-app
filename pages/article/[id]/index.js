import Link from "next/link";
import { server } from "../../../config";
import { useRouter } from "next/router";
import Meta from '../../../components/Meta'

const article = ({ article }) => {
  // const router = useRouter();
  // const { id } = router.query

  return (
    <>
    <Meta title={article.title} />
      <h1>{article.title}</h1>
      <p>{article.body}</p>
      <br />
      <Link href="/">Go Back</Link>
    </>
  );
};

// Fetching data using the api which accesses data in data.js

export const getStaticProps = async (context) => {
  const res = await fetch(`${server}/api/articles/${context.params.id}`);
  const article = await res.json();

  return {
    props: {
      article,
    },
  };
};

export const getStaticPaths = async () => {
  const res = await fetch(`${server}/api/articles`);
  const articles = await res.json();
  const ids = articles.map((article) => article.id);
  const paths = ids.map((id) => ({ params: { id: id.toString() } }));

  return {
    paths,
    fallback: false, //if no path id returns a 404 page
  };
};

// Fetching data from website

// export const getServerSideProps = async (context) => {
//   const res = await fetch(
//     `https://jsonplaceholder.typicode.com/posts/${context.params.id}`
//   );
//   const article = await res.json();
//   return {
//     props: {
//       article,
//     },
//   };
// };

// export const getStaticProps = async (context) => {
//   const res = await fetch(
//     `https://jsonplaceholder.typicode.com/posts/${context.params.id}`
//   );
//   const article = await res.json();
//   return {
//     props: {
//       article,
//     },
//   };
// };
// export const getStaticPaths = async () => {
//   const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);
//   const article = await res.json();

//   const ids = article.map(article => article.id);
//   const paths = ids.map(id => ({params: {id: id.toString()}}))

//   return {
//       paths,
//       fallback: false //if no path id returns a 404 page
//   }
// };

export default article;
