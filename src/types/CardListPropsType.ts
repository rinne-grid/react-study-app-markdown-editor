import React from 'react';
import { Markdown } from '../interfaces/Markdown';

export type CardListPropsType = {
  markdownList: Markdown[];
  setSelected: React.Dispatch<React.SetStateAction<Markdown>>;
};
