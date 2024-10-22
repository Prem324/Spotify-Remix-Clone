import './index.css'

const Category = props => {
  const {categoryDetails} = props
  const {name, images, tracks} = categoryDetails
  const imageUrl = images[0]
  return (
    <li className="category-item">
      <div className="category-content">
        <img
          className="category-item-image"
          src={imageUrl.url}
          alt="category"
        />
        <p className="category-item-name">{name}</p>
        <p className="category-item-tracks-count">{`${tracks.total} Tracks`}</p>
      </div>
    </li>
  )
}

export default Category
