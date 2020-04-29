import React from 'react';

export default class SongItem extends React.Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(e) {
        e.preventDefault();
    }

    render() {
        return (
            <div>
                <img src="" alt=""/>

                <div>
                    <div>
                        <button>Play</button>
                        <div>
                            <span>Elydium</span>
                            <span>Untitled</span>
                        </div>
                    </div>
                    
                    <canvas>

                    </canvas>

                    <div>
                        <ul>
                            <li>Like</li>
                            <li>Comment</li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}