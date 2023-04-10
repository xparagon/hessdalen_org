import React from "react";

interface Props {
    language: string;
    onSelected: (language: string) => void;
}

function SelectLanguage({ language, onSelected }: Props) {
    function handleSelected(language: string) {
        onSelected(language);
    }
    return (
        <div style={{ textAlign: 'right' }}>
            <a className={language === 'nb' ? 'underlined' : ''} onClick={() => handleSelected('nb')}>Norsk</a>
            &nbsp;|&nbsp;
            <a className={language === 'en' ? 'underlined' : ''} onClick={() => handleSelected('en')}>English</a>
        </div >
    );
}

export default SelectLanguage;