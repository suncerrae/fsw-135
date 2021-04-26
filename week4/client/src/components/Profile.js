import React, { useContext } from 'react';
import IssueForm from '../components/IssueForm';
import IssueList from '../components/IssueList';
import { UserContext } from '../context/UserProvider';

const Profile = () => {

  const { addIssue, issues } = useContext(UserContext);

  const {
    user: {
        username
    }
  } = useContext(UserContext)

  return (
    <div className="profile">
      <h1>Welcome {username}!</h1>
      <IssueForm addIssue={addIssue}/>
      <h3>Profile Issues</h3>
      <IssueList issues={issues}/>
      </div>
  )
}

export default Profile;