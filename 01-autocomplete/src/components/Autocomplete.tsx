import { useEffect, useState } from "react";
import useDebounce from "../hooks/useDebounce";

export function Autocomplete() {
  const [search, setSearch] = useState();
  const [products, setProducts] = useState([]);
  const debouncedValue = useDebounce(search);

  async function getData(debouncedValue) {
    try {
      const response = await fetch(
        `https://dummyjson.com/products/search?q=${debouncedValue}`,
      );
      const result = await response.json();
      setProducts(result.products);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getData(debouncedValue);
  }, [debouncedValue]);

  return (
    <>
      <input type="text" onChange={(e) => setSearch(e.target.value)} />
      {products.map((product) => (
        <p key={product.id}>{product.title}</p>
      ))}
    </>
  );
}
