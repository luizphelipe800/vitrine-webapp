const ImageGalery = props => {
  const { images } = props;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 p-10">
      {
        images.map(image => (
          <div key={image.id} className="h-96 p-3 shadow-md rounded-md flex items-center justify-center">
            <img 
              src={image.url} 
              alt={image.path}
              className="object-cover h-full"
            />
          </div>
        ))
      }
    </div>
  )
}

export default ImageGalery;