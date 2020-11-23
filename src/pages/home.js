import React, { Component } from 'react';
import header from '../components/header';
import footer from '../components/footer';
import { Link } from 'react-router-dom';

export default class home extends Component {
    render() {
        return (
            <div className="home">
                <header></header>
                <section>
                    <div className="jumbotron jumbotron-fluid py-5">
                        <div className="container text-center py-5">
                            <h1 className="display-4">FeedBoxx</h1>
                            <p className="lead">Your virtual feedback box
                            </p>
                            <div className="mt-4">
                                <Link className="btn btn-primary px-5 mr-3" to="/signup">Create New Account</Link>
                                <Link className="btn px-5" to="/login">Login to Your Account</Link>
                            </div>
                        </div>
                    </div>
                </section>
                <footer></footer>
            </div>
        )
    }
}
