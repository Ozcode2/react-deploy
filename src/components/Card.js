import { Link } from "react-router-dom";

const Card = ({ products }) => {
  const productItems = products.map((product) => (
    <Link
      to={`/product/${product.id}`}
      style={{ textDecoration: "none" }}
      key={product.id}
    >
      <div className="card">
        <img src={product.image} alt={product.title} />
        <h3>{product.title.length < 10 ? product.title : `${product.title.slice(0, 10)}...`}</h3>
        <p>₦{product.price}</p>
        <del>₦{product.cut}</del>
      </div>
    </Link>
  ));

  return <section className="card-section">{productItems}</section>;
};

export default Card;
