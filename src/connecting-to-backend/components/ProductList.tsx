import { useEffect, useState } from "react";

const ProductList = ({ category }: { category: string }) => {
  const [products, setProducts] = useState<string[]>([]);

  // Fetch products from the backend. We call this a call-back function as it is called back when the component is mounted.
  useEffect(() => {
    console.log("Fetching products from the backend for " + category);

    // To solve the compilation error, Type 'string' is not assignable to type 'never'
    // we need to provide the type of the data we will store in the state 'products'.
    // To this end, we provide the type 'string[]' to the useState hook:
    // const [products, setProducts] = useState<string[]>([]);
    setProducts(["Clothing", "Electronics", "Books"]);
  }, [category]);

  // Since when we execute setProducts(["Clothing", "Electronics", "Books"]); we triger a re-render of the component,
  // the function underlying the useEffect hook will be called again. Without adding the empty array as the second argument to the useEffect hook,
  // we will end up in an infinite loop. This is because the function underlying the useEffect hook will be called again and again. By adding the empty array as the second argument to the useEffect hook,
  // we ensure that the function underlying the useEffect hook does not depend on any values and is called only once when the component is mounted.
  // Later, when the value of the category changes such that we fetch data for a given category, we replace the second option by [category] to
  // update the dependecy on the category so that the function underlying the useEffect hook is called again when the category changes.
  // If the category does not change, the function underlying the useEffect hook is not called again.

  return <div>ProductList</div>;
};

export default ProductList;
