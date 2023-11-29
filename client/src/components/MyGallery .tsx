import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

const MyGallery = ({ urlImage, listImage }: any) => {


   const images =  listImage.reduce((init: any, cur: any) => {
    const newImage = {
      original: cur.urlImage.replace('small', 'large'),
      thumbnail: cur.urlImage,
      originalClass: 'custom-image',
      thumbnailClass: 'custom-thumbnail'
    }
   return init.concat(newImage)
   }, [])
    return <ImageGallery items={images} />;


  // Trường hợp không có hình ảnh
  return null;
};

export default MyGallery;
