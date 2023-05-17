import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import isEmpty from '../../validation/is-empty';

class ProfileItem extends Component {
  generateRating = () => {
    // Generate a random rating between 3.5 and 5
    return (Math.random() * (5 - 3.5) + 3.5).toFixed(1);
  }
  render() {
    const { profile } = this.props;
    const rating = this.generateRating();

    // Generate stars based on the rating
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={i} className="fa fa-star" />);
    }

    if (hasHalfStar) {
      stars.push(<i key="half" className="fa fa-star-half" />);
    }
    console.log("profile",profile)

    return (
      <div className="card card-body bg-light mb-3">
        <div className="row">
          <div className="col-2">
            <img src="/assets/img/profile.png" alt="" style={{ width:"72px" }} className="rounded-circle" />
          </div>
          <div className="col-lg-6 col-md-4 col-8">
            <h3>{profile.instructor.first_name} {profile.instructor.last_name}</h3>
            <p>
              {profile.status}{' '}
              {isEmpty(profile.company) ? null : (
                <span>at {profile.company}</span>
              )}
            </p>
            <p>
              {isEmpty(profile.location) ? null : (
                <span>{profile.location}</span>
              )}
            </p>
            <Link to={`/profile/${profile.handle}`} className="btn btn-info">
              View Profile
            </Link>
            <br />
            <Link to={`/schedule`} className="btn btn-primary">
              View Schedule
            </Link>
          </div>
          <div className="col-md-4 d-none d-md-block">
            <h4>Expertise</h4>
            <ul className="list-group">
              {profile.skills.slice(0, 4).map((skill, index) => (
                <li key={index} className="list-group-item">
                  <i className="fa fa-check pr-1" />
                  {skill}
                </li>
              ))}
            </ul>
            <br />
            <div className="col-md-4 d-none d-md-block">
            <h4>Rating</h4>
              <div className="stars">
                {stars}
              </div>
              <p className="rating-text">{rating}/5</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;
