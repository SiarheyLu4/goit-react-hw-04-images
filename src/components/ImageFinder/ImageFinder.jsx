import React, { Component } from "react";
import styled from "styled-components";

import { Modal } from "../Modal/Modal";
import { Searchbar } from "components/Searchbar/Searchbar";
import { Loader } from "components/Loader/Loader";
import { ImageGallery } from "components/ImageGallery/ImageGallery";
import { Button } from "components/Button/Button";

const URL = "https://pixabay.com/api/";
const KEY = "28282273-de260e28427aa1fd2a8294f86"

export class ImageFinder extends Component {

  state = {
    query: '',
    images: [],
    page: 1,
    loading: false,
    error: null,
    status: 'idle',
    showModal: false,
    largeImageURL: null,
    tags: null,
  }

  componentDidUpdate(prevProps, prevState) {
    const { query, page} = this.state;

    if (prevState.query !== query ||
      prevState.page !== page) {
      this.setState({
        loading: true
      });

      // setTimeout(() => {
        fetch(`${URL}?key=${KEY}&q=${query}&page=${page}&image_type=photo&orientation=horizontal&per_page=12`)
          .then(response => {
            if (response.ok) {
              return response.json();
            }
            return Promise.reject(
              new Error('Image not found!!!')
            );
          })
          .then(result => {
            if (result.total === 0) {
              return this.setState({ status: 'rejected', images: [], loading: false });
            }
            this.setState(prevState => {
            return {
              images: [...prevState.images, ...result.hits],
              status: 'resolved',
              loading: false
            };
          });
          })
          .catch(error => this.setState({ error, status: 'rejected'}))
      // }, 1000);
    }
  };
  
  loadMore = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 }
    });
  };

  handleFormSubmit = (query) => {
    this.setState({query, images: [], page: 1})
  }

  toggleModal = (largeImageURL, tags) => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
    this.setState({largeImageURL: largeImageURL, tags: tags})
  }

  render() {
    const { images,
      status,
      loading,
      showModal,
      largeImageURL,
      tags
    } = this.state;

    const { handleFormSubmit, toggleModal, loadMore} = this;

    return (
      
      <Card>
        
        <Searchbar onSubmit={handleFormSubmit} />

        {status === 'idle' && <h2>Enter keyword</h2>}

        {loading && <Loader />}

        {status === 'rejected' && <h2>Image not found!</h2>}

        {status === 'resolved' && (<>
          <ImageGallery
            images={images}
            modal={toggleModal}
          />
          <Button onClick={loadMore}/>
        </>)}

        {showModal && <Modal
          onClose={toggleModal}
          bigImg={largeImageURL}
          tags={tags}
        />}

      </Card>
    );
  }
}

const Card = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 16px;
  padding-bottom: 24px;
`