const ImageGalery = props => {
  const { images } = props;

  return (
    <div>
      {
        images.map(image => (
          <div>
            <img src={image.url} alt={image.path}/>
          </div>
        ))
      }
    </div>
  )
}

export default ImageGalery;