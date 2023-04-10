import { useEffect, useState } from 'react'
import { gql, useQuery } from '@apollo/client';

import './App.css'
import { Topic, Post } from './types'
import Navigation from './component/Navigation';
import SelectLanguage from './component/SelectLanguage';
import NavigationSelected from './component/NavigationSelected';


const GET_TOPICS = gql`
query GetTopics($locales: [Locale!]!) {
    posts(
      locales: $locales
      orderBy: date_DESC
    ) {
      id
      title
      date
      excerpt
      content {
        html
      }
      author {
        id
        name
        title
        biography
      }
      topic {
        id
        name
      }
      tags
      coverImage {
        url(transformation: {image: {resize: {width: 500, height: 250, fit: scale}}})
        mimeType
      }
    }
  }
`;


function App() {
  const [lang, setLang] = useState('en');
  const [selected, setSelected] = useState<Topic | null>(null);

  const { loading, error, data, refetch } = useQuery(GET_TOPICS, {
    variables: { locales: [lang] }
  });


  useEffect(() => {
    refetch();
  }, [lang]);


  if (loading) return <p>Loading...</p>;
  if (error) return <p>{JSON.stringify(error)}</p>;

  let posts = data.posts as Post[];
  let selectedPosts = posts.filter((post) => post.topic?.id === selected?.id);


  return (
    <div className="container">
      <SelectLanguage language={lang} onSelected={(language) => setLang(language)} />

      <h4>
        Hessdalen.org
      </h4>
      <Navigation language={lang} onSelected={(topic) => setSelected(topic)} />
      <NavigationSelected topic={selected} />

      {selectedPosts.map((post) => (
        <article key={post.id}>
          <header>
            <div className="grid">
              <div>
                <h1>{post.title}</h1>
                <small>
                  {post.date}
                  <br />
                  {post.author?.name}
                  <br />
                  {post.excerpt}
                </small>
              </div>
              <div>
                <img src={post.coverImage?.url} />

              </div>
            </div>
          </header>
          {selected?.id && post.topic?.id === selected?.id &&
            <div dangerouslySetInnerHTML={{ __html: post.content.html }} />
          }
        </article>
      ))}
      <hr />
      <figure>
        <table>
          <tbody>
            <tr>
              {posts.map((post) => (
                <td className='toc-element' key={'__' + post.id}>
                  <small>
                    <a onClick={() => setSelected(post.topic)}>{post.topic?.name}</a>
                    <br />
                    {post.date}:
                  </small>
                  <br />
                  <b>
                    {post.title}
                  </b>
                  <br />
                  <small>
                    {post.excerpt}
                  </small>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </figure>
    </div>
  );
}


export default App
