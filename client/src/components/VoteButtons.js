import React from "react"

const VoteButtons = ({ user, hasVoted, handleDownVote, handleUpVote}) => {
    const UpVote = () => {
        let className = ""
        if(hasVoted) {
            className = " voteGreen"
        }
        return(
            <button type="text" onClick={handleUpVote} className={className}>UpVote</button>
            ) 
        }

    const DownVote = () => {
        let className = ""
        if(hasVoted) {
            className += " voteRed"
        }
        return(
            <button type="text" onClick={handleDownVote} className={className}>DownVote</button>
        ) 
    }
    
    if (user) {
        return(
            <div>
                <UpVote />
                <DownVote />
            </div>
        )
    } else {
        return(<></>)
    }
}

export default VoteButtons