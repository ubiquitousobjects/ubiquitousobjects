import {
  Create,
  Datagrid,
  Edit,
  EditButton,
  List,
  ReferenceField,
  ReferenceInput,
  SimpleForm,
  TextField,
  TextInput,
  useRecordContext,
} from "react-admin";

const PostTitle = () => {
  const record = useRecordContext();
  return <span>Post {record ? `"${record.title}"` : ""}</span>;
};

const postFilters = [
  <TextInput source="q" label="Search" alwaysOn />,
  <ReferenceInput source="userId" label="User" reference="users" />,
];

export const PostList = () => (
  <List filters={postFilters}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <ReferenceField source="userId" reference="users" />
      <TextField source="title" />
      <EditButton />
    </Datagrid>
  </List>
);

export const PostEdit = () => (
  <Edit title={<PostTitle />}>
    <SimpleForm>
      <ReferenceInput source="userId" reference="users" />
      <TextInput source="id" disabled />
      <TextInput source="title" />
      <TextInput source="body" multiline rows={5} />
    </SimpleForm>
  </Edit>
);
export const PostCreate = () => (
  <Create>
    <SimpleForm>
      <ReferenceInput source="userId" reference="users" />
      <TextInput source="title" />
      <TextInput source="body" multiline rows={5} />
    </SimpleForm>
  </Create>
);
