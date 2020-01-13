import React, { Fragment, useEffect, useState } from "react";

import { loadHp } from "../../../actions/hp";

import './HpManager.css'
import { connect } from "react-redux";


const HpManager = ({loadHp}) => {

    useEffect(() => {
        loadHp()
        document.title = "DM Master"
    }, []);

    const [formData] = useState({
        hp: ""
      });

    const {hp} = formData;

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