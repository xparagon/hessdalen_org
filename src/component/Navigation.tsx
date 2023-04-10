import React, { useEffect } from 'react';
import { Topic } from '../types';

import { gql, useQuery } from '@apollo/client';

interface Props {
    language: string;
    onSelected: (topic: Topic) => void;
}

const GET_TOPICS = gql`
query GetTopics($locales: [Locale!]!) {
    topics(
      locales: $locales
      orderBy: seq_ASC
    ) {
      name
      short
      seq
      id
    }
  }
`;

function Navigation({ language, onSelected }: Props) {

    const { loading, error, data, refetch } = useQuery(GET_TOPICS, {
        variables: { locales: [language] }
    });
    const [selected, setSelected] = React.useState<Topic | null>(null);
    function handleSelected(topic: Topic) {
        setSelected(topic);
        onSelected(topic);
    }

    useEffect(() => {
        refetch();
    }, [language]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{JSON.stringify(error)}</p>;

    let topics = data.topics as Topic[];

    return (
        <nav>
            <ul>
                {
                    topics.map((topic) => (
                        <li key={topic.id} >
                            <a href="#" onClick={() => handleSelected(topic)}
                                role={selected?.id === topic.id ? 'button' : ''}>
                                {topic.short}
                            </a>
                        </li>
                    ))
                }
            </ul>
        </nav>

    );
}
export default Navigation;