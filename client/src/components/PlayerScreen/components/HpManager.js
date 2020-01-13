import React, { Fragment, useEffect } from "react";

import { loadHp } from "../../../actions/hp";

import './HpManager.css'
import { connect } from "react-redux";


const HpManager = ({loadHp, hp}) => {

    useEffect(() => {
        loadHp()
        document.title = "DM Master"
    }, []);

   

    return(
        <Fragment>
            <div className="hp">
                {hp}
            </div>

        </Fragment>
    )
}

const mapStateToProps = state => ({
    hp: state.hp.hp
  });

  export default connect(
    mapStateToProps, // connect store state to component props
    { loadHp } // connect actions for the component to modify store state
  )(HpManager);