import {
  TableWrap,
  Table,
  TableHead,
  Row,
  ColHead,
  TableBody,
  Col,
} from './styled';

// const columns = [
//   { label: 'ID', align: 'center' },
//   { label: 'namespace', align: 'center' },
//   { label: 'name' },
//   { label: 'type' },
//   { label: 'status', align: 'center' },
//   { label: 'actions', visibility: false },
// ];

// const rows = [
//   [
//     { value: 1, align: 'center' },
//     { value: 'api', align: 'center' },
//     { value: 'posts' },
//     { value: 'default' },
//     { value: 'published', align: 'center' },
//     {
//       value: (
//         <ActionWrap>
//           <DocIcon onClick={() => { }} />
//           <DeleteIcon onClick={() => { }} />
//         </ActionWrap>
//       )
//     }
//   ],
// ];

export default function TableComponent({ columns = [], rows = [] }) {
  return (
    <TableWrap>
      <Table>
        <TableHead>
          <Row>
            {columns.map(({ label, visibility = 'visible', align, width }) => (
              <ColHead
                key={label}
                scope="col"
                visibility={visibility}
                align={align}
                width={width}
              >
                {label}
              </ColHead>
            ))}
          </Row>
        </TableHead>
        <TableBody>
          {rows.map((row, i) => (
            <Row key={String(i)}>
              {row.map(({ value, align }, j) => (
                <Col key={String(j)} align={align}>
                  {value}
                </Col>
              ))}
            </Row>
          ))}
        </TableBody>
      </Table>
    </TableWrap>
  );
}
