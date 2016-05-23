import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

const History = ({ history }) => (<span>{history.map(
  (line, index) =>
    <span
      style={{ display: 'block' }}
      className={line.type}
      key={index}
    >{line.value}</span>
)}</span>);

History.propTypes = {
  history: PropTypes.array.isRequired,
};

export default connect(({ terminal }) => ({ history: terminal.history }))(History);
