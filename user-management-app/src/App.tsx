import { BrowserRouter, Route, Routes } from "react-router-dom"
import PageLayout from "./pages/PageLayout"
import UserList from "./pages/public/UserList"
import AddUser from "./pages/public/AddUser"
import EditUser from "./pages/public/EditUser"
import { Toaster } from "sonner"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<PageLayout />}>
            <Route  index element={<UserList/>} />
            <Route path="/add-user" element={<AddUser/>} />
            <Route path="/user-list/edit-user/:id" element={<EditUser/>} />
          </Route>
        </Routes>
      </BrowserRouter>

       <Toaster position="top-right" richColors  />
    </>
  )
}

export default App
