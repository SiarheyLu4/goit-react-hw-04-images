import React from "react";
import styled from "styled-components";
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ id, webformatURL, tags, largeImageURL, onClick }) => {
  return (
    <Li key={id}>
      <Image
        src={webformatURL}
        alt={tags}
        onClick={() => onClick(largeImageURL, tags)}
      />
    </Li>
  )
}

ImageGalleryItem.ropTypes = {
  id: PropTypes.number.isRequired,
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}

const Li = styled.li`
  border-radius: 2px;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12);
`

const Image = styled.img`
  width: 100%;
  height: 260px;
  object-fit: cover;
  transition: transform 250ms cubic-bezier(0.4, 0, 0.2, 1);
    &:hover {
  transform: scale(1.03);
  cursor: zoom-in;
}
`