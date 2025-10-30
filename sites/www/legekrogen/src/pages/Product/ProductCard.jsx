import React from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

const ProductCard = ({ product }) => {
  return (
    <Card sx={{ maxWidth: 260 }} key={product._id}>
      <CardMedia
        component="img"
        alt={product.image}
        height="80"
        image={product.image}
      />
      <div className="py-2 px-2">
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {product.name}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {product.description}
          </Typography>
          <Typography gutterBottom variant="p" component="div">
            {product.price}
          </Typography>
        </CardContent>
        <div className="">
          <Link to={`/product-detail/${product._id}`}>Learn More</Link>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
