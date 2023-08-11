import React from "react"

const VoteButtons = ({ user, hasVoted, handleDownVote, handleUpVote, netVoteValue}) => {
    let plusMinus = ""
    if(netVoteValue > 0) {
        plusMinus = "+"
    }

    if (user) {
        return(
            <div className="container__row">
                <button type="text" onClick={handleUpVote} className="container__col-md-4">UpVote</button>
                <h3 className="container__col-md-3 align-center">{plusMinus}{netVoteValue}</h3>
                <button type="text" onClick={handleDownVote} className="container__col-md-4">DownVote</button>
            </div>
        )
    } else {
        return(<></>)
    }
}

export default VoteButtons