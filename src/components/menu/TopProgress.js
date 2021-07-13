import LinearProgress from "@material-ui/core/LinearProgress";
import React from "react";
import {connect} from "react-redux";
import makeStyles from "@material-ui/styles/makeStyles";

function TopProgress({progressBar}) {

    const useStyles = makeStyles(() => ({
        root: {
            width: '100%',
        },
        progress: {
            background: 'transparent',
        },
    }));
    const classes = useStyles();

    return <div className={classes.root}>
        <LinearProgress className={classes.progress} color="secondary" variant="determinate" value={progressBar.progress}/>
    </div>
}

const mapProps = (state) => {
    return {
        progressBar: state.progressReducer,
    }
}

export default connect(mapProps)(TopProgress)
