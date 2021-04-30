import React, {Component} from "react";

class AboutPage extends Component {
    state = {};

    render() {
        return (
            <div>
                <h1>AboutPage</h1>
                <h4>Created by:</h4>
                <div>
                    <ul>
                        <li>Rustami Ubaydullo</li>
                        <li>Sean O'Hare</li>
                    </ul>
                </div>
                <h4>Made Possible by:</h4>
                <div>
                    <ul>
                        <li><a href="https://reactjs.org/" target="_blank"
                               rel="noopener noreferrer">React</a></li>
                        <ul>
                            <li><a href="https://material-ui.com/" target="_blank"
                                   rel="noopener noreferrer">Material UI</a></li>
                        </ul>
                        <li>Backend</li>
                        <ul>
                            <li><a href="https://expressjs.com/" target="_blank"
                                   rel="noopener noreferrer">Express</a></li>
                            <li><a href="https://www.mongodb.com/" target="_blank"
                                   rel="noopener noreferrer">MongoDB</a></li>
                        </ul>
                    </ul>

                </div>
            </div>
        );
    }
}

export default AboutPage;
