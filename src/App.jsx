import { useEffect, useState } from 'react'
import axios from 'axios';
import './App.css'

import SearchBar from './components/SearchBar/SearchBar'
import { ImageGallery } from './components/ImageGallery/ImageGallery';
import ErrorMessage from './components/ErrorMessage/ErrorMessage'
import Loader from './components/Loader/Loader';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import ImageModal from './components/ImageModal/ImageModal';


const App = () => {

  const [searchTerm, setSearchTerm] = useState(null);
  const [imgArr, setImgArr] = useState(null);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const [totalPages, setTotalPages] = useState();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalImgInfo, setModalImgInfo] = useState(null);
  const [noImgText, setNoImgText] = useState(null); 


  useEffect(() => {
    const fetchInfo = async () => {
      if (!searchTerm) return;
      try {
        setisLoading(true);
        setError(null);

        const { data } = await axios.get(`https://api.unsplash.com/search/photos?client_id=4lKKdkfWCfDLZYT9-8NaB0SDVimhhTVfwjX3NlnOhYs&page=${page}&query=${searchTerm}&orientation=landscape`)
      
        setTotalPages(data.total_pages);

        if (data.results.length === 0) {
          setNoImgText('There are no images according to your search term!');
        } else {
          setNoImgText(null);
        }

        setImgArr((prev) => {
          if (prev) {
            return [...prev, ...data.results]
          } else {
            return [...data.results]
          }
        });
      } catch (error) {
        setError(error.message);
      } finally {
        setisLoading(false);
      }}
    fetchInfo();
  }, [searchTerm, page])
    

  const onSubmit = searchWord => {
    setSearchTerm(searchWord);
    setImgArr(null);
    setPage(1);
    setNoImgText(null);

  }

  const onLoadMore = () => {
    setPage(page + 1);
  }

  function openModal(modalImgInfo) {
    setModalIsOpen(true);
    setModalImgInfo(modalImgInfo);
  }

  function closeModal() {
    setModalIsOpen(false);
  }


  return (
    <>
      <SearchBar onSubmit={onSubmit} />
      <ImageGallery imgArr={imgArr} openModal={openModal}/>
      {isLoading && <Loader/>}
      <ErrorMessage error={error} noImgText={noImgText} />
      {page < totalPages && <LoadMoreBtn onLoadMore={onLoadMore} imgArr={imgArr} />}
      {modalImgInfo && <ImageModal
        isOpen={modalIsOpen}
        modalImgInfo={modalImgInfo}
        onRequestClose={closeModal}
      />}
    </>
  )
}

export default App


