import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { deletePost, updatePost, addLike, removeLike } from '../../actions/postActions';

class PostItem extends Component {
  onUpdateClick(id, data) {
    console.log("id",id)
    console.log("data",data)
    this.props.updatePost(id, data);
  }

  onDeleteClick(id) {
    this.props.deletePost(id);
  }

  onLikeClick(id) {
    this.props.addLike(id);
  }

  onUnlikeClick(id) {
    this.props.removeLike(id);
  }

  findUserLike(likes) {
    const { auth } = this.props;
    //check if user is in the like array
    if (likes&&likes.length>0&&likes.filter(like => like.user === auth.users.id).length > 0) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    const { post, auth, showActions } = this.props;


    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
              <img
                className="rounded-circle d-none d-md-block"
                src={post?post.avatar:""}
                alt=""
              />
            <br />
            <p className="text-center">{post.first_name} {post.last_name?post.last_name:""}</p>
          </div>
          <div className="col-md-10">
            <p className="lead">{post.text}</p>
            {showActions ? (
              <span>
                <button
                  onClick={this.onLikeClick.bind(this, post._id)}
                  type="button"
                  className="btn btn-light mr-1"
                >
                  <i
                    className={classnames('fas fa-thumbs-up', {
                      'text-info': this.findUserLike(post.likes)
                    })}
                  />
                  <span className="badge badge-light">{post.likes.length}</span>
                </button>
                <button
                  onClick={this.onUnlikeClick.bind(this, post._id)}
                  type="button"
                  className="btn btn-light mr-1"
                >
                  <i className="text-secondary fas fa-thumbs-down" />
                </button>
                <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
                  Comments
                </Link>
                {post.user === auth.users.id ? (
                  <button
                    onClick={this.onDeleteClick.bind(this, post._id)}
                    type="button"
                    className="btn btn-danger mr-1"
                  >
                    <i className="fas fa-times" />
                  </button>
                ) : null}



                {/* {post.user === auth.users.id ? (
                  <Link
                    to={`/post/edit/${post._id}`}
                    onClick={this.onUpdateClick.bind(this, post._id)}
                    className="btn btn-raised btn-warning btn-sm mr-5"
                  >
                  <i className='fas fa-edit'/>
                  Edit Post
                  </Link>
                ) : null} */}
              </span>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

PostItem.defaultProps = {
  showActions: true
};

PostItem.propTypes = {
  updatePost: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { deletePost,updatePost, addLike, removeLike })(
  PostItem
);
