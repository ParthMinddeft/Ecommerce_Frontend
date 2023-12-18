import { useQuery } from "@apollo/client";
import React from "react";
import { useParams } from "react-router-dom";
import { GET_PRODUCT } from "../gqloperation/queries";
import Carousel from "@brainhubeu/react-carousel";
import { BACKEND_URL } from "../helpers";
import { useCart } from "react-use-cart";

const Product = () => {
  const { pid } = useParams();
  const { addItem } = useCart();
  const { loading, error, data } = useQuery(GET_PRODUCT, {
    variables: {
      productId: pid,
    },
  });
  if (loading) return <h1>Loading Please Wait</h1>;
  if (error) console.log(error);
  if (data) console.log(data);

  const { name, price, description, images } = data.product.data.attributes;

  const addToCart = () => {
    addItem({
      id: pid,
      name: name,
      price: price,
      img: BACKEND_URL + images.data[0].attributes.url,
    });
  };

  console.log(images);
  return (
    <div className="container">
      <Carousel plugins={["arrows"]}>
        {images.data.map(({ attributes }) => {
          return (
            <img
              style={{ height: "50vh" }}
              src={BACKEND_URL + attributes.url}
            />
          );
        })}
      </Carousel>
      <div>
        <h3>{name}</h3>
        <h5 className="green-text" style={{ fontWeight: "bold" }}>
          {" "}
          ₹ {price}
        </h5>
        <p>{description}</p>
        <button className="btn blue" onClick={addToCart}>
          Add To Cart
        </button>
      </div>
    </div>
  );
};

export default Product;
