import React, { useEffect } from 'react';
import { Topic } from '../types';


interface Props {
    topic: Topic | null;
}

function NavigationSelected({ topic }: Props) {

    return (
        <h3>{topic?.name}</h3>
    );
}
export default NavigationSelected;