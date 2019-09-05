import React from "react";
import "./app.scss";
import DatePicker from './DatePicker';
import { convertDate } from './utils/date';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: new Date(),
      isOpen: false
    }

  }

  componentWillMount() {
    // console.log(this._reactInternalFiber)

  }

  componentDidMount() {
  }

  handleChange = (time) => {
    console.log('handleSelect', time);
  }

  open() {
    this.setState({
      isOpen: true
    });
  }


  render() {

    const { isOpen } = this.state;

    return (
      <div>
        <div>{convertDate(this.state.time, 'YYYY-MM-DD')}</div>
        <div onClick={this.open.bind(this)}>open</div>
        <DatePicker
          value={new Date()}
          max={new Date()}
          showCaption
          dateConfig={{
            'year': {
                format: 'YYYY',
                caption: '年',
                step: 1,
            },
            'month': {
                format: 'MM',
                caption: '月',
                step: 1,
            },
            'date': {
                format: 'DD',
                caption: '日',
                step: 1,
            }
          }}
          onChange={this.handleChange}
          onCancel={() => {
            this.setState({
              isOpen: false
            })
          }}
          onSelect={(date) => {
            console.log('onSelect', date)
            this.setState({
              isOpen: false,
              time: date
            })
          }}
          isOpen={isOpen}
        />
      </div>
    );
  }
}

export default App;