import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {getUserProfile, getUserStatus, savePhoto, saveProfile, updateUserStatus} from "../../redux/profile_reducer";
import {useParams} from "react-router-dom";
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {AppStateType} from "../../redux/redux_store";
import {profileType} from "../../types/types";


type StatePropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
  getUserProfile: (userId: number | null ) => void
  savePhoto: (file: File) => void
  getUserStatus: (userId: number | null ) => void
  updateUserStatus: (status: string) => void
  saveProfile: (profile: profileType) => Promise<any>
}
type ParamsType = {
  match:{params:{id: string}}
}

export function withRouter(Children: any) {
  return (props: StatePropsType & DispatchPropsType) => {
    const match = {params: useParams()};
    return <Children {...props} match={match}/>
  }
}

type PropsType = StatePropsType & DispatchPropsType & ParamsType;

class ProfileContainer extends React.Component<PropsType> {
  componentDidMount() {

    let userId: number | null = +this.props.match.params.id
    if (!userId) {
      userId = this.props.authorizedUserId
    }
    this.props.getUserProfile(userId)
    this.props.getUserStatus(userId)
  }

  componentDidUpdate(prevProps: PropsType, prevState:PropsType) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      let userId: number | null = +this.props.match.params.id
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

let mapStateToProps = (state: AppStateType) => ({
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

export default compose<React.ComponentType>(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
  withAuthRedirect
)(ProfileContainer)
