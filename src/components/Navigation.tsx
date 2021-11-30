import { NavigationPropsType } from '../types/NavigationPropsType';

const Navigation = (props: NavigationPropsType) => {
  return (
    <>
      <button onClick={props.onAddMarkdown}>Markdownを追加する</button>
    </>
  );
};
export default Navigation;
