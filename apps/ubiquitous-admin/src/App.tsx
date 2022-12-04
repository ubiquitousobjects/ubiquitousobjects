import { Admin, EditGuesser, ListGuesser, Resource } from "react-admin";
import jsonServerProvider from "ra-data-json-server";
import { UserList } from "./components/resources/users";
import { PostCreate, PostEdit, PostList } from "./components/resources/posts";

const dataProvider = jsonServerProvider("https://jsonplaceholder.typicode.com");

import PostIcon from "@mui/icons-material/Book";
import UserIcon from "@mui/icons-material/Group";
import { Dashboard } from "./pages/Dashboard";
import { authProvider } from "./providers/authProvider";

const App = () => (
  <Admin
    dataProvider={dataProvider}
    dashboard={Dashboard}
    authProvider={authProvider}
  >
    <Resource
      name="users"
      list={UserList}
      recordRepresentation="name"
      icon={UserIcon}
    />
    <Resource
      name="posts"
      list={PostList}
      edit={PostEdit}
      create={PostCreate}
      icon={PostIcon}
    />
  </Admin>
);

export default App;
