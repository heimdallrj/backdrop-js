import {
  TableWrap,
  Table,
  TableHead,
  Row,
  ColHead,
  TableBody,
  Col,
  NoData,
} from './styled';

export default function TableComponent({
  columns = [],
  rows = [],
  onClickRow = () => { },
}) {
  return (
    <TableWrap>
      <Table>
        <TableHead>
          <Row>
            {columns.map(({ label, align, size, visible = true }) => (
              <ColHead key={label} scope="col" align={align} width={`${size}%`}>
                <span style={{ visibility: visible ? 'visible' : 'hidden' }}>
                  {label}
                </span>
              </ColHead>
            ))}
          </Row>
        </TableHead>
        <TableBody>
          {rows.map((row, i) => (
            <Row key={row.id} onClick={() => onClickRow(row)}>
              {row.data.map(({ value, align, size }, j) => (
                <Col key={String(j)} align={align} width={`${size}%`}>
                  {value}
                </Col>
              ))}
            </Row>
          ))}
        </TableBody>
      </Table>

      {rows.length === 0 && (<NoData>No data found.</NoData>)}
    </TableWrap>
  );
}
