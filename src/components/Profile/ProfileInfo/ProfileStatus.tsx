import React, {ChangeEvent} from "react";

type propsType = {
  status: string
  updateUserStatus: (newStatus:string)=>void
}
type stateType = {
  editMode: boolean
  status: string
}

class ProfileStatus extends React.Component<propsType,stateType> {
  state = {
    editMode: false,
    status: this.props.status,
  }
  activateEditMode = () => {
    this.setState({
      editMode: true
    })
  }
  deactivateEditMode = () => {
    this.setState({
      editMode: false
    })
    this.props.updateUserStatus(this.state.status)
  }
  onStatusChange = (e:ChangeEvent<HTMLInputElement>) => {
    this.setState({
      status: e.currentTarget.value
    })
  }

  componentDidUpdate(prevProps:propsType, prevState:stateType) {
    if (prevProps.status !== this.props.status){
      this.setState({
        status: this.props.status
      })
    }
  }

  render() {
    return (
        <div>
          {!this.state.editMode &&
              <div>
                <span onDoubleClick={this.activateEditMode}>{this.props.status || "Not status."}</span>
              </div>
          }
          {this.state.editMode &&
              <div>
                <input onChange={this.onStatusChange} autoFocus={true} onBlur={this.deactivateEditMode.bind(this)} value={this.state.status}/>
              </div>
          }
        </div>
    )
  }
}

export default ProfileStatus