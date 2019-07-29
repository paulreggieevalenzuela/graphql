import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import moment from 'moment';
export const GET_POSTS = gql`
  query GetPosts {
    posts {
      id
      IP
      date
    }
  }
`;

export default class List extends Component {
    constructor(props) {
        super(props);

        this.state = { };
    }
    render() {
        return (
            <Query query={GET_POSTS}>
                {({ loading, data }) => !loading && (
                    <ul className="list">
                        <li className="list__item list__item-header">
                            <span>Date</span>
                            <span>Device</span>
                            <span>IP Address</span>
                        </li>
                        {data.posts.map(item => (
                            <li className="list__item" key={item.id}>
                                <span>{moment(item.date).format('MMMM Do YYYY')}</span>
                                <span>{item.device}</span>
                                <span>{item.IP}</span>
                            </li>    
                        ))}
                    </ul>
                )}
            </Query>
        );
    }
}
