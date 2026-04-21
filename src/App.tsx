import { RouterProvider } from "react-router-dom";
import { router } from "./routes/index";
import { Providers } from "./layouts/Providers";


function App() {
  return (
  <Providers>
      <RouterProvider router={router} />
  </Providers>
  );
}

export default App;