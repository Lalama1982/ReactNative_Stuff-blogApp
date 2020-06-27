import createDataContext from "./createDataContext";
import jsonServer from "../api/jsonServer";

//const BlogContext = React.createContext(); // Context is imported from "createDataContext.js"

/*
 *"state" variable actually holds the dataset of blog posts like holding it for the session.
 *hence every page/js object, import an instance of context of the "BlogContext.js"
 */

const blogReducer = (state, action) => {
  switch (action.type) {
    case "get_blogposts":
      return action.payload;

    case "edit_blogpost":
      return state.map((blogPost) => {
        return blogPost.id === action.payload.id ? action.payload : blogPost;
        /*
        * Below is similar to ternary function above.
        * This traverse through all the blogposts of "state", one matched will return.
        * It will be "saved" into the 'State' context
        * 
        if (blogPost.id === action.payload.id ){
          return action.payload;
        } else {
          return blogPost;
        }
        */
      });
    case "delete_blogpost":
      return state.filter((blogPost) => blogPost.id !== action.payload);
    /*
      It is not deleting a specfic "blog post", but except for the specified rest are populated to "state" variable
      */
    case "add_blogpost":
      return [
        ...state,
        {
          id: Math.floor(Math.random() * 99999), // To uniquely identify a blog post
          title: action.payload.title, //`Blog Post(via Reducer) #${state.length + 1}`,
          content: action.payload.content,
        },
      ];
    default:
      return state;
  }
};

const getBlogPosts = (dispatch) => {
  return async () => {
    const response = await jsonServer.get("/blogposts");
    dispatch({ type: "get_blogposts", payload: response.data });
  };
};

const addBlogPost = () => {
  return async (title, content, callback) => {
    await jsonServer.post("/blogposts", { title, content });
    /*
    // Above implementing the "API method" & case "add_blogpost"is no longer used. Also use of "const addBlogPost = (dispatch) => {"
    // More like; updating of "state" Context variable is abondanded and updating of "db.json" is adopted.
    // Only the "getBlogPosts" deals with the contex now
    dispatch({ type: "add_blogpost", payload: { title, content } });
    */

    if (callback) {
      callback();
    }
  };
};

const deleteBlogPost = (dispatch) => {
  return async (id) => {
    await jsonServer.delete(`/blogposts/${id}`);
    /**
     * Now above deletes the blog post from "db.json" file
     * Yet it is still in the "state" context variable
     * Hence used the exisitng method below to remove it from context
     */
    dispatch({ type: "delete_blogpost", payload: id }); // "payload" & "type" are not keywords. "payload" = id of the blogpost
  };
};

const editBlogPost = (dispatch) => {
  return async (id, title, content, callback) => {
    await jsonServer.put(`/blogposts/${id}`, { title, content });
    /**
     * Now above updates the blog post from "db.json" file
     * Yet it is still in the "state" context variable
     * Hence used the exisitng method below to edit it from context
     */
    dispatch({ type: "edit_blogpost", payload: { id, title, content } });
    if (callback) {
      callback();
    }
  };
};

export const { Context, Provider } = createDataContext(
  blogReducer,
  { addBlogPost, deleteBlogPost, editBlogPost, getBlogPosts },
  []
  /**
   * [{ title: "Default Title", content: "Default Content", id: "1" }]
   * This will set the "state" variable with default attributes
   * In this case at "IndexScreen" for "state", they will be shown at initiation
   */
);
