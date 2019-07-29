import React, { Component } from 'react';
import moment from 'moment';
import List from './components/List';
import filter from 'lodash/filter';

const DATA = [
    {
        date: '2018-10-24 13:37:00',
        device: 'Samsung A7',
        IP: '169.120.0.1',
    },
    {
        date: '2019-07-24 13:37:00',
        device: 'Samsung A7',
        IP: '123.123.1.1',
    },
    {
        date: '2019-07-28 13:37:00',
        device: 'Samsung A7',
        IP: '123.123.1.0',
    },
    {
        date: '2019-07-23 13:37:00',
        device: 'Samsung A9',
    },
    {
        date: '2019-06-23 13:37:00',
        device: 'Iphone X',
    },
    {
        date: '2019-06-29 13:37:00',
        device: 'Oppo V9',
        IP: '169.120.0.1',
    },
    {
        date: '2019-07-22 13:37:00',
        device: 'Iphone XS Max',
    },
];

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: []
        };
    }

    selectFilter = val => {
        switch(val) {
            case 'yesterday':
                return moment().startOf('day').subtract(2, 'day');
            break;
            case 'lastWeek':
                return moment().startOf('day').subtract(1,'week');
            break;
            case 'lastMonth':
                return moment().startOf('day').subtract(1,'month');
            default:
                return moment();
        }
    }

    _handleFilters = e => {
        let {value} = e.target;
        const filteredDate = filter(DATA, d => moment(d.date).isBetween(this.selectFilter(value), moment()));
        console.log('filteredDate', filteredDate);
        this.setState({ data: filteredDate });
    }

    render() {
        return (
            <main className="wrapper">
                <header className="header">
                    <p className="header__title">React Exam</p>
                </header>
                <select onClick={this._handleFilters}>
                    <option value="today">Today</option>
                    <option value="yesterday">Yesterday</option>
                    <option value="lastWeek">Last Week</option>
                    <option value="lastMonth">Last Month</option>
                </select>
                <List />
                <footer className="footer">
                    <p className="footer__title">Copyright @2019</p>
                </footer>
            </main>
        );
    }
}
