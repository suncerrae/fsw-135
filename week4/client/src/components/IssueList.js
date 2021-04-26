import React from 'react';
import Issue from '../components/Issue';

const IssueList = (props) => {
    const {issues} = props

    return(
        <div className="issue-list">
            {issues.map(issue => <Issue {...issue} key={issue._id}/>)}
        </div>
    )
}

export default IssueList;