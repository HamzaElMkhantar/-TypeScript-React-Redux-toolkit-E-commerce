import { ICategoryProps } from '@customTypes/categoriesTypes';
import styles from './styles.module.css'
import { Link } from 'react-router-dom';
const {category, categoryImg,categoryTitle} = styles;

function Category({title, prefix, img}: ICategoryProps) {

  return (
    <Link to={'/products/'+prefix} className={category}>
      <div className={categoryImg}>
        <img src={img} alt={title} />
      </div>
       <h4 className={categoryTitle}>{title}</h4>
    </Link>
  )
}

export default Category
