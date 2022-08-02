import React from "react";

const Profile = () => {
    return (
        <div className="content">
        <div>
          <img
            src="https://www.kultur-port.de/images/stories/blog/2022/Horizont_F_Pexelspixabay.jpg"
            className="first-img"
          />
        </div>
        {/* avatar and description */}
        <div>
          <img
            src="https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&w=600"
            className="second-img"
          />
        </div>
        {/* post */}
        <div>
          {/* new post */}
          <div>
            <div>
              <div>Post 1</div>
              <div>Post 2</div>
            </div>
          </div>
        </div>
      </div>
    )
}

export default Profile