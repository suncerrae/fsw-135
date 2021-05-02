import React from 'react';
import Issue from '../components/Issue';

const IssueList = (props) => {
    const {issues, addComment} = props

    return(
        <div className="issue-list">
            {issues.map(issue => <Issue addComment={addComment}{...issue} key={issue._id}/>)}
        </div>
    )
}

export default IssueList;