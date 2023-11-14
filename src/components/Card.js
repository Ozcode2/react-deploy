import { Link } from "react-router-dom";
import Rating from "./Rating";

const Card = ({ products }) => {
  const productItems = products.map((product) => (
    <Link
      to={`/product/${product.id}`}
      style={{ textDecoration: "none" }}
      key={product.id}
    >
      <div className="card">
        <img src={process.env.PUBLIC_URL + product.image} alt={product.title} />
        <h3>
          {product.title.length < 10
            ? product.title
            : `${product.title.slice(0, 10)}...`}
        </h3>
        <p>₦{product.price}</p>
        <del>₦{product.cut}</del>
        <p id="star-rating">{product.rating && <Rating rating={product.rating} />} </p>
      </div>
    </Link>
  ));

  return <section className="card-section">{productItems}</section>;
};

export default Card;
