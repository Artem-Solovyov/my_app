import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {getUserProfile, getUserStatus, savePhoto, saveProfile, updateUserStatus} from "../../redux/profile_reducer";
import {useParams} from "react-router-dom";
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";

export function withRouter(Children) {
  return (props) => {
    const match = {params: useParams()};
    return <Children {...props} match={match}/>
  }
}

class ProfileContainer extends React.Component {
  componentDidMount() {

    let userId = this.props.match.params.id
    if (!userId) {
      userId = this.props.authorizedUserId
    }
    this.props.getUserProfile(userId)
    this.props.getUserStatus(userId)
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      let userId = this.props.match.params.id
      if (!userId) {
        userId = this.props.authorizedUserId
      }
      this.props.getUserProfile(userId)
      this.props.getUserStatus(userId)
    }
  }

  render() {
    return <Profile {...this.props}
                    isOwner={!this.props.match.params.id}
                    profile={this.props.profile}
                    status={this.props.status}
                    updateUserStatus={this.props.updateUserStatus}
                    savePhoto={this.props.savePhoto}/>
  }
}

let mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  authorizedUserId: state.auth.id,
  isAuth: state.auth.isAuth,
})
let mapDispatchToProps = {
  getUserProfile, savePhoto,
  getUserStatus, updateUserStatus,
  saveProfile
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter,
    withAuthRedirect
)(ProfileContainer)
