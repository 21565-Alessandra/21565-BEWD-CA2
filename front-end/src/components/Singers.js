//CONTINUOUS ASSESSMENT II - BSC30921
//STUDENT ID: 21565
//STUDENT NAME: ALESSANDRA SILVA DOS REIS

//component to view all Singers

import React from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';

class Singers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            singers: [],
            isLoaded: true
        }

    }

    componentDidMount() {

        axios.get('/singer')
            .then((response) => {
                // handle success status
                // gets singer details with the data from the server
                // set isLoaded to true to make sure we render the right values on screen


                this.setState({
                    singers: response.data,
                    isLoaded: true
                })

            })
            .catch((error) => {
                //handle error -- in case we get an error from the server

                this.setState({
                    isLoaded: false,
                    error
                })

            })

    }

    render() {

        const { isLoaded, error, singers } = this.state;

        //if we are waiting for our server to serve us the data render this part of code
        // also render this if the SERVER is offline

        if (!isLoaded) {
            return (
                <div>The page is loading or the SERVER is down...</div>
            )

            //render this part of code if we received the data from the server
        } else {
            return (
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Age</th>
                                <th>Nationality</th>
                                <th>Grammy Winner</th>
                            </tr>
                        </thead>

                        <tbody>
                            {singers.map(singer => (
                                <tr key={singer._id}>
                                    <td>{singer._id}</td>
                                    <td>{singer.name}</td>
                                    <td >{singer.age}</td>
                                    <td >{singer.nationality}</td>
                                    {/* https://reactjs.org/docs/conditional-rendering.html#inline-if-else-with-conditional-operator */}
                                    <td >{singer.grammyWinner ? 'Yes' : 'No'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )
        }
    }
}



export default Singers;