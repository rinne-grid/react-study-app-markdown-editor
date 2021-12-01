import React from 'react';
import { Markdown } from '../interfaces/Markdown';

export type CardPropsType = {
  markdown: Markdown;
  setSelected: React.Dispatch<React.SetStateAction<Markdown>>;
};
