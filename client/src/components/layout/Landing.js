import React from 'react';
import { Link} from 'react-router-dom'

// import DMScreen from './../DMScreen/DMScreen'
// import Battlemap from './../BattleMap/Battlemap'
// import PlayerScreen from './../PlayerScreen/PlayerScreen'

const Landing = () => {
    return (
        <section className="landing">
            <div>
                <ul>
                    <li>
                        <Link to="/DMScreen">DMScreen</Link>
                    </li>
                    <li>
                        <Link to="/Battlemap">Battlemap</Link>
                    </li>
                    <li>
                        <Link to="/PlayerScreen">PlayerScreen</Link>
                    </li>
                </ul>
            </div>
        </section>
    )
}
 

export default Landing