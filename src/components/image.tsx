"use client";

import { ProductType } from "../../interfaces";
import { FC, useState } from "react";

interface Props {
  product: ProductType;
  fill?: boolean;
}

const CustomImage: FC<Props> = ({ product, fill }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {fill ? (
        <img
          src={product.image}
          alt={product.title}
          style={{
            width: 400,
            height: 300,
          }}
          className={`object-contain duration-700 ease-in-out group-hover:opacity-75 ${
            isLoading
              ? "scale-110 blur-2xl grayscale"
              : "scale-100 blur-0 grayscale-0"
          }}`}
          onLoad={() => setIsLoading(false)}
        />
      ) : (
        <img
          src={product.image}
          alt={product.title}
          className={`object-contain duration-700 ease-in-out group-hover:opacity-75 ${
            isLoading
              ? "scale-110 blur-2xl grayscale"
              : "scale-100 blur-0 grayscale-0"
          }}`}
          onLoad={() => setIsLoading(false)}
        />
      )}
    </>
  );
};

export default CustomImage;
