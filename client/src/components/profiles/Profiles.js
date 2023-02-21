import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import ProfileItem from "./ProfileItem";
import { getProfiles } from "../../actions/profileActions";

class Profiles extends Component {
  state = {
    search: "",
  };

  componentDidMount() {
    this.props.getProfiles();
  }

  handleSearch = (event) => {
    this.setState({ search: event.target.value });
  };

  render() {
    const { profiles, loading } = this.props.profile;
    const { search } = this.state;
    let profileItems;

    if (profiles === null || loading) {
      profileItems = <Spinner />;
    } else {
      if (profiles.length > 0) {
        profileItems = profiles
          .filter(
            (profile) =>
              profile.skills &&
              profile.skills
                .join(", ")
                .toLowerCase()
                .includes(search.toLowerCase())
          )
          .map((profile) => <ProfileItem key={profile._id} profile={profile} />);
      } else {
        profileItems = <h4>No study buddy found...</h4>;
      }
    }

    return (
      <div className="profiles">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Search by skill"
                  name="search"
                  value={search}
                  onChange={this.handleSearch}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">{profileItems}</div>
          </div>
        </div>
      </div>
    );
  }
}

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfiles })(Profiles);
