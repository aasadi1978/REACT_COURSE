import { useState } from 'react';
import styled from 'styled-components';

// We define a styled component called List that is an unordered list with no padding and no list-style.
// Then replace the ul element with the List component in the ListGroup component. This means that
// we no longer need className='list-group' on the ul element in the ListGroup component.
const List = styled.ul`
  list-style: none;
  padding: 0;
`;

// One of the benefitd of CSS-in-JS is that we can pass styles dynamically to styled components using props:
interface ListItemProps {
  active: boolean;
}

const ListItem = styled.li<ListItemProps>`
  padding: 5px 0; // vertical padding of 5 px and horizontal padding of 0.
  background-color: ${(props) => (props.active ? '#f0f0f0' : 'transparent')};
`;

interface Props {
  items: string[];
  heading: string;
  onSelectItem: (item: string) => void;
}

function ListGroup({ items, heading, onSelectItem }: Props) {
  const [selectedIdx, setSelectedIdx] = useState(0);

  return (
    <>
      <h1>{heading}</h1>
      {items.length === 0 && <p>No items to display</p>}
      <List>
        {items.map((itm, idx) => (
          <ListItem
            key={itm}
            active={idx === selectedIdx}
            onClick={() => {
              setSelectedIdx(idx);
              onSelectItem(itm);
            }}
          >
            {itm}
          </ListItem>
        ))}
        ;
      </List>
    </>
  );
}

export default ListGroup;
