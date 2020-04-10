/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import './UpdateProfileStyle.scss';

export class UpdateProfileComponent extends Component {
  constructor(props) {
    super(props);
    const { bio } = this.props;
    this.state = {
      bio,
      image: null,
      preview: null
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleFileUpload = e => {
    this.setState({
      image: e.target.files[0],
      preview: URL.createObjectURL(e.target.files[0])
    });
  }

  closeModal = () => {
    const { displayModal } = this.props;
    displayModal(false);
  }

  handleSubmit = e => {
    e.preventDefault();
    const { bio, image } = this.state;
    if (!bio && !image) {
      toast.error('No data provided', {
        position: toast.POSITION.TOP_RIGHT
      });
    } else {
      const { authenticated, updateProfile } = this.props;
      updateProfile(authenticated.username, this.state, this.closeModal);
    }
  };

  handleCloseClick = e => {
    e.preventDefault();
    const { displayModal } = this.props;
    displayModal(false);
  }

  render() {
    const { show } = this.props;
    const { preview, bio } = this.state;
    return show ? (
      <div>
        <div className="modal">
          <div className="modal__modal-content">
            <i className="fa fa-times modal-content__close" onClick={this.handleCloseClick} />
            <h2 className="modal-content__title">Update Profile</h2>
            <form className="modal-content__form" onSubmit={this.handleSubmit}>
              <label className="modal-content__label">Bio</label>
              <br />
              <textarea
                rows="5"
                cols="60"
                type="text"
                id="bio"
                onChange={this.handleChange}
                className="modal-content__textarea"
                value={bio}
              />
              <br />
              <label className="modal-content__label">Image</label>
              <br />
              <input
                type="file"
                onChange={this.handleFileUpload}
                className="modal-content__file"
              />
              <br />
              <img src={preview} className="modal-content__preview" />
              <br />
              <button type="submit" className="modal-content__btn">
              Update
              </button>
            </form>
          </div>
        </div>
      </div>
    ) : (null);
  }
}

const mapStateToProps = (state) => ({
  profile: state.profile
});

export default connect(
  mapStateToProps
)(UpdateProfileComponent);
