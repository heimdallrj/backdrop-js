import { List, ListItem } from 'providers/ThemeProvider/styled/selector';

export default function Selector({ options, selected, onSelect }) {
  return (
    <List>
      {options.map(({ name, label }) => (
        <ListItem
          key={name}
          active={selected === name}
          onClick={() => onSelect(name)}
        >
          {label}
        </ListItem>
      ))}
    </List>
  );
}
