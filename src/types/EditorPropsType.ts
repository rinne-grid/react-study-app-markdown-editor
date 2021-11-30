import React, { FormEvent } from 'react';
import { Markdown } from '../interfaces/Markdown';

export type EditorPropsType = {
  markdown: Markdown;
  onChangeSource: (e: FormEvent<HTMLTextAreaElement>) => void;
};
