"use client";

import { useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, ShoppingCart } from "lucide-react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProductType } from "../../interfaces";
import { toast } from "react-toastify";

function ProductId() {
  const [product, setProduct] = useState<ProductType | null>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams<{ id: string | undefined }>();

  useState(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data: ProductType = await res.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  });

  const handleAddToCart = () => {
    toast.success("Mahsulot savatga qo'shildi.");
  };

  if (loading) {
    return <ProductSkeleton />;
  }

  if (!product) {
    return <p className="text-center mt-20">Mahsulot topilmadi.</p>;
  }

  return (
    <div className="flex  h-screen justify-center items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto  px-4"
      >
        <Card className="overflow-hidden">
          <div className="md:flex items-center">
            <motion.div
              className="md:w-1/2"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.title}
                className="w-full h-[400px] object-contain p-4"
              />
            </motion.div>
            <CardContent className="md:w-1/2 p-6">
              <CardHeader>
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <CardTitle className="text-2xl font-bold mb-2">
                    {product.title}
                  </CardTitle>
                  <Badge className="mb-2">{product.category}</Badge>
                </motion.div>
              </CardHeader>
              <motion.p
                className="text-gray-600 mb-4"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                {product.description}
              </motion.p>
              <motion.div
                className="flex items-center mb-4"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <span className="text-2xl font-bold mr-2">
                  ${product.price.toFixed(2)}
                </span>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.round(product.rating.rate)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">
                    ({product.rating.count} ta baho)
                  </span>
                </div>
              </motion.div>
              <CardFooter className="p-0">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  <Button onClick={handleAddToCart} className="w-full">
                    <ShoppingCart className="mr-2 h-4 w-4" /> Savatga qo'shish
                  </Button>
                </motion.div>
              </CardFooter>
            </CardContent>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}

function ProductSkeleton() {
  return (
    <div className="flex  h-screen justify-center items-center">
      <div className="container mx-auto  px-4">
        <Card className="overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2 h-[400px] bg-gray-200 animate-pulse" />
            <CardContent className="md:w-1/2 p-6">
              <div className="h-6 w-20 bg-gray-200 animate-pulse mb-2" />
              <div className="h-8 w-3/4 bg-gray-200 animate-pulse mb-4" />
              <div className="h-4 w-full bg-gray-200 animate-pulse mb-2" />
              <div className="h-4 w-full bg-gray-200 animate-pulse mb-2" />
              <div className="h-4 w-3/4 bg-gray-200 animate-pulse mb-4" />
              <div className="h-8 w-1/4 bg-gray-200 animate-pulse mb-4" />
              <div className="h-10 w-full bg-gray-200 animate-pulse" />
            </CardContent>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default ProductId;
