import React, { useEffect } from "react";
import { Container, Text, VStack, SimpleGrid } from "@chakra-ui/react";
import { useProductStore } from "../store/product";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const HomePage = () => {
  const { getProducts, products } = useProductStore();
  useEffect(() => {
    getProducts();
  }, []);
  return (
    <Container maxW={Container.xl} py={12}>
      <Text
        fontSize={"30"}
        mb={10}
        fontWeight={"bold"}
        bgGradient={"linear(to-r, cyan.400, blue.500)"}
        bgClip={"text"}
        textAlign={"center"}
      >
        Current Products 🚀
      </Text>
      <VStack spacing={8}>
        {products.length === 0 && (
          <Text
            fontSize="xl"
            textAlign={"center"}
            fontWeight="bold"
            color="gray.500"
          >
            No products found 😢{" "}
            <Link to={"/create"}>
              <Text
                as="span"
                color="blue.500"
                _hover={{ textDecoration: "underline" }}
              >
                Create a product
              </Text>
            </Link>
          </Text>
        )}
        <SimpleGrid
          columns={{
            base: 1,
            md: 2,
            lg: 3,
          }}
          spacing={10}
          width={"full"}
        >
          {products
            .filter(
              (product) =>
                product && product._id && product.name && product.price
            )
            .map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
        </SimpleGrid>
      </VStack>
    </Container>
  );
};

export default HomePage;
