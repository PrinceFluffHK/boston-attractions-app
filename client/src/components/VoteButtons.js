import React from "react"

const VoteButtons = ({ user, hasVoted, handleDownVote, handleUpVote, netVoteValue}) => {
    let plusMinus = ""
    if(netVoteValue > 0) {
        plusMinus = "+"
    }

    const UpVote = () => {
        let className = "container__col-md-4"
        if(hasVoted) {
            className.concat(" voteGreen")
        }
        return(
            <button type="text" onClick={handleUpVote} className={className}>UpVote</button>
        ) 
    }

    const DownVote = () => {
        let className = "container__col-md-4"
        if(hasVoted) {
            className.concat(" voteRed")
        }
        return(
            <button type="text" onClick={handleDownVote} className={className}>DownVote</button>
        ) 
    }

    if (user) {
        return(
            <div className="container__row">
                <UpVote />
                <h3 className="container__col-md-3 align-center">{plusMinus}{netVoteValue}</h3>
                <DownVote />
            </div>
        )
    } else {
        return(<></>)
    }
}

export default VoteButtons