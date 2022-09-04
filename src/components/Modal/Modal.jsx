import React, { Component } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import PropTypes from 'prop-types';

const selectedModal = document.querySelector('#modal');

export class Modal extends Component {

  componentDidMount() {
    window.addEventListener('keydown', this.hadleKeyDown)
  };

  componentWillUnmount() {
    window.removeEventListener('keydown', this.hadleKeyDown)
  };

  hadleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleClickBackdrop = e => {
    if (e.currentTarget === e.target) {
    this.props.onClose();
    }
  };
  
  render() {

    const { bigImg, tags } = this.props;

    return createPortal(
      <Overlay onClick={this.handleClickBackdrop}>
        <ModalCard>
          <img src={bigImg} alt={tags} />
        </ModalCard>
      </Overlay>,
      selectedModal)
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  bigImg: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1200;
`

const ModalCard = styled.div`
  max-width: calc(100vw - 48px);
  max-height: calc(100vh - 24px);
  background-color: white;
`