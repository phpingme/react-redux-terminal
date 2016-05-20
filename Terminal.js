import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';


export default class Terminal extends Component {

  componentDidMount() {
    this.props.lineHeight(this.refs.cursor.offsetHeight);
  }

  componentDidUpdate() {
    this.props.adjustPos(this.refs.input.innerText.length, this.refs.input.offsetWidth);
  }


  render() {
    const { isActive, input, lineHeight, cursorLeftPos, cursorLeftStack } = this.props.prompt;

    let cursorClassName = 'cursor';
    cursorClassName = + isActive ? ' cursor_active' : '';

    let cursorStyle = { position: 'absolute', opacity: 0.5 };
    if (cursorLeftPos < input.length) {
      cursorStyle.left = cursorLeftStack[cursorLeftPos];
    }

    const cursorTop = (this.props.history.length + 1) * lineHeight;

    return (
      <div
        className="terminal_wrapper"
        style={{ position: 'relative', height: 300, width: '100%' }}
        onClick={e => this.refs.consoleTextarea.focus(e)}
      >
        <div
          className="terminal"
          ref="terminal"
          style={{ position: 'absolute', top: 0, bottom: 0, right: 0, left: 0, overflow: 'auto' }}
        >
          <pre
            style={{ margin: 0, position: 'relative', minHeight: '100%', boxSizing: 'border-box' }}
            className="console"
            ref="console"
          >
            <div>
              <HistoryFactory />
              <span>
                <span ref="input" >{input}</span>
                <span ref="cursor" style={cursorStyle} className={cursorClassName}>&nbsp;</span>
              </span>
            </div>
          </pre>
          <div
            style={{ position: 'absolute', height: 1, width: 1, overflow: 'hidden',
            top: cursorTop }}
          >
            <textarea
              ref="consoleTextarea"
              style={{ position: 'absolute', width: 1, height: 0 }}
              autoComplete="off"
              wrap="off"
              autoCapitalize="off"
              spellCheck="off"
              onChange={e => {
                this.props.onChange(e);
              }}
              onFocus={e => {
                this.props.activate(e);
              }}
              onBlur={e => {
                this.props.deactivate(e);
              }}
              onKeyDown={e => {
                switch (e.keyCode) {
                  case 13:
                    return this.props.onEnter(input).then(() => {
                      this.refs.input.value = '';
                      this.refs.terminal.scrollTop = this.refs.console.scrollHeight;
                    });
                  case 8:
                    return this.props.toDelete();
                  case 37:
                    return this.props.toLeft();
                  case 38:
                    return this.props.toPrev();
                  case 39:
                    return this.props.toRight();
                  case 40:
                    return this.props.toNext();
                  default:
                    return null;
                }
              }}
            ></textarea>
          </div>
        </div>
      </div>);
  }

}


Terminal.propTypes = {
  prompt: PropTypes.object.isRequired,
  history: PropTypes.array.isRequired,
  isActive: PropTypes.bool,
  toDelete: PropTypes.func.isRequired,
  toLeft: PropTypes.func.isRequired,
  toPrev: PropTypes.func.isRequired,
  toRight: PropTypes.func.isRequired,
  toNext: PropTypes.func.isRequired,
  onEnter: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  activate: PropTypes.func.isRequired,
  deactivate: PropTypes.func.isRequired,
  adjustPos: PropTypes.func.isRequired,
  lineHeight: PropTypes.func.isRequired,
};


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

const HistoryFactory = connect(({ history }) => ({ history }))(History);
