import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

const History = ({ history }) => (<ul className="terminal-history">{history.map(
  (line, index) =>
    <li
      className={line.type.replace(/_/, '-')}
      key={index}
    >
      <span className="history-label" />
      <span>{line.value}</span>
    </li>
)}</ul>);

History.propTypes = {
  history: PropTypes.array.isRequired,
};

export default connect(({ terminal }) => ({ history: terminal.history }))(History);
