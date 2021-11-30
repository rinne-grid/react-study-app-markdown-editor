import { EditorPropsType } from '../types/EditorPropsType';

const Editor = (props: EditorPropsType) => {
  return (
    <>
      <textarea
        value={props.markdown && props.markdown.source}
        onChange={props.onChangeSource}
      ></textarea>
    </>
  );
};
export default Editor;
