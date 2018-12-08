import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import Dotdotdot from 'react-dotdotdot';
// import { Icon } from 'react-fa';

import { Table, TableBody, TableRow, TableCell, TableHead, TableHeadCell } from 'shared/components/Table';

import s from './TableView.styl';



const TableView = props => (
  <div className={s.tendersListWrapper}>
    <div className={s.tendersListTop}>
    </div>
    <Table className={s.tenderListTable}>
      <TableHead>
        <TableRow>
          <TableHeadCell>ИНН</TableHeadCell>
          <TableHeadCell>Наименование</TableHeadCell>
          <TableHeadCell className={s.numberColumn}>Адрес</TableHeadCell>
          <TableHeadCell className={s.numberColumn}>Еще что то</TableHeadCell>
          <TableHeadCell>Статус</TableHeadCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {props.firmList
          .map(tender => (
            <TableRow
              hover
              key={tender.linearId}
              onClick={() => {
                console.log(props);
                props.history.push(createTenderDetailRoute(tender.linearId));
              }}>
              <TableCell>
               что то 
              </TableCell>
              <TableCell>
                <Dotdotdot clamp={3}>
                  <div className={s.tenderName}>{tender.name}</div>
                </Dotdotdot>
                <div className={s.smallText}>Открытый конкурс</div>
              </TableCell>
              <TableCell className={s.numberColumn} align="right">
                что то 
              </TableCell>
              <TableCell className={s.numberColumn} align="right">
                что то
              </TableCell>
              <TableCell className={s.statusColumn}>
                <Status size={Status.size.SMALL} status={tender.status} />
                <div className={s.smallText} style={{ marginTop: '0' }}>что то</div>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  </div>
);

TendersTable.propTypes = {
  firmList: PropTypes.array.isRequired
};

export default withRouter(TableView);
