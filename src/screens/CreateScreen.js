import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import { Context } from "../context/BlogContext";
import BlogPostForm from "../Components/BlogPostForm";

const CreateScreen = ({ navigation }) => {  
  const { addBlogPost } = useContext(Context);

  return (
    // Here, "onSubmit" is passed as a prop to "BlogPostForm", in which inside it will be referred. No context object is passed
    <BlogPostForm
      onSubmit={(title, content) => {
        addBlogPost(title, content, () => navigation.navigate("Index"));
      }}
    />
  );
};

const styles = StyleSheet.create({});

export default CreateScreen;
