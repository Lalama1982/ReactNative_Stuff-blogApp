import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import { Context } from "../context/BlogContext";
import BlogPostForm from "../Components/BlogPostForm";

const EditScreen = ({ navigation }) => {
  const idNavigation = navigation.getParam("id");
  const { state, editBlogPost } = useContext(Context);

  const blogPost = state.find(
    (blogPost) => blogPost.id === idNavigation
    // Passing the "id" got from navigation, to "state" which contains all the blogs from Context and select the blog post required
  );

  return (
    <BlogPostForm
      initialValues={{ title: blogPost.title, content: blogPost.content }}
      onSubmit={(title, content) => {
        //editBlogPost(idNavigation, title, content, () => navigation.navigate("Show")) // Could use this as well
        editBlogPost(idNavigation, title, content, () => navigation.pop())
      }}
    />
  );
};

const styles = StyleSheet.create({});

export default EditScreen;
