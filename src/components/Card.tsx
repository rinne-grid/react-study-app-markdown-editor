import { CardPropsType } from '../types/CardPropsType';

const Card = (props: CardPropsType) => {
  return (
    <>
      <div className="card" onClick={(e) => props.setSelected(props.markdown)}>
        <h2>id: {props.markdown.id && props.markdown.id}</h2>
        <pre>{props.markdown.source && props.markdown.source}</pre>
      </div>
    </>
  );
};
export default Card;
