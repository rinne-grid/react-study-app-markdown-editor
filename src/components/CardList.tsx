import { CardListPropsType } from '../types/CardListPropsType';
import Card from './Card';
const CardList = (props: CardListPropsType) => {
  return (
    <>
      {props.markdownList.map((markdown) => (
        <Card
          key={markdown.id}
          markdown={markdown}
          setSelected={props.setSelected}
        />
      ))}
    </>
  );
};

export default CardList;
