import React, { useEffect } from "react";
import axios from "axios";
const App = () => {
  useEffect(async () => {
    let { data } = await axios.get("/api/products/test");
    console.log(data);
  }, []);
  return (
    <div>
      <h1>App</h1>
    </div>
  );
};

export default App;
