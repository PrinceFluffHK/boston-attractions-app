import React from "react"

const VoteButtons = ({ user, hasVoted, handleDownVote, handleUpVote, netVoteValue}) => {
    let plusMinus = ""
    if(netVoteValue > 0) {
        plusMinus = "+"
    }

    const UpVote = () => {
        let classSet = "fa-solid fa-thumbs-up fa-2xl"
        if(hasVoted) {
            return <div className="container__col-md-4"></div>
        }
        return(
            <div className="container__col-md-4">
                <i className={classSet} onClick={handleUpVote}></i>
            </div>
        ) 
    }

    const DownVote = () => {
        let classSet = "fa-solid fa-thumbs-down fa-2xl"
        if(hasVoted) {
            return <div className="container__col-md-1"></div>
        }
        return(
            <div className="container__col-md-1">
                <i className={classSet} onClick={handleDownVote}></i>
            </div>
        ) 
    }

    if (user) {
        return(
            <div className="container__row">
                <UpVote/>
                <h3 className="container__col-md-3 align-center">{plusMinus}{netVoteValue}</h3>
                <DownVote/>
            </div>
        )
    } else {
        return(<></>)
    }
}

export default VoteButtons