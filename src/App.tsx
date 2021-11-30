import React, { FormEvent, useEffect, useState } from 'react';
import './App.css';
import Navigation from './components/Navigation';
import CardList from './components/CardList';
import Editor from './components/Editor';
import Preview from './components/Preview';
import { Markdown } from './interfaces/Markdown';

function App() {
  const [markdownList, setMarkdownList] = useState<Markdown[]>([]);
  const [selected, setSelected] = useState(0);

  const getMarkdownList = () => {
    // TODO: from api by fetch
    const result: Markdown[] = [
      { id: '1', source: '**hello**' },
      { id: '2', source: '```source```' },
      { id: '3', source: '### Title and Title' },
    ];
    return result;
  };

  const onAddMarkdown = (e: FormEvent<HTMLButtonElement>) => {
    console.log('markdown追加ボタンをクリック');
    let pk = '' + markdownList.length; // generateNewMarkdown()
    setMarkdownList([
      ...markdownList,
      {
        id: pk,
        source: 'new',
      },
    ]);
  };

  const onChangeSource = (e: FormEvent<HTMLTextAreaElement>) => {
    const currentMarkdown = markdownList[selected];
    currentMarkdown.source = e.currentTarget.value;
    setMarkdownList(
      markdownList.map((markdown, index, markdownList) =>
        index === selected ? currentMarkdown : markdown
      )
    );
  };

  // componentDidMount and componentDidUpdate
  // useEffect(() => {
  //   setMarkdownList(getMarkdownList());
  //   const lastIndexStr = localStorage.getItem('lastIndex');
  //   let lastIndex = 0;
  //   if (lastIndexStr !== undefined && lastIndexStr !== null) {
  //     lastIndex = Number.parseInt(lastIndexStr);
  //   }
  //   setSelected(lastIndex);
  //   setMarkdown(markdownList[selected]);
  // }, markdownList);

  return (
    <div className="App">
      <Navigation onAddMarkdown={onAddMarkdown} />
      <CardList markdownList={markdownList} />
      {markdownList[selected] && (
        <Editor
          markdown={markdownList[selected]}
          onChangeSource={onChangeSource}
        />
      )}
      <Preview />
    </div>
  );
}

export default App;
