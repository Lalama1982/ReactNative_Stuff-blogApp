import React, { useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Button,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons"; // In reference to "expo.github.io/vector-icons"
import { Context as BlogContext } from "../context/BlogContext";
/**
 * [import BlogContext from "../context/BlogContext";] is not used as,
 * "BlogContext.js" returns { Context, Provider }
 */

const IndexScreen = ({ navigation }) => {
  const { state, deleteBlogPost, getBlogPosts } = useContext(BlogContext);
  // "state" is in reference to the var created at "createDataContext.js"

  /**
   * Calling just "getBlogPosts" will result in an infinte rule.
   * Hence the use of "useEffect"
   * Now "getBlogPosts", updates the "state" variable hence
   * - the "FlatList" below is get updated from the "db.json" file at "jsonserver" project
   */
  useEffect(() => {
    getBlogPosts();

    // Below is like listener class, it get triggered when the "IndexScreen" gets the focus
    const listener = navigation.addListener("didFocus", () => {
      getBlogPosts();
    });

    // Below function will get executed everytime
    // In order to fix issues like memory leaks, "listener" is removed once the "getBlogPosts" is executed
    return () => {
      listener.remove();
    };

  }, []);

  return (
    <View>
      {/*<Text>Index Screen</Text>*/}
      {/* Example: <Text>{valueFromBlogContext}</Text>*/}
      {/*<Button title="Add Post" onPress={addBlogPost} />  Will not work anymore as, "addBlogPost" has arguments now*/}
      <FlatList
        data={state}
        keyExtractor={(blogPost) => blogPost.title}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                console.log("Post Text Clicked for: ", item.id);
                navigation.navigate("Show", { id: item.id }); // Even though "item.id" is passed, actually the "navigation" prop
              }}
            >
              <View style={styles.row}>
                <Text style={styles.title}>
                  {item.title} : {item.id}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    console.log("Trash Icon Clicked for: ", item.id);
                    deleteBlogPost(item.id);
                  }}
                >
                  {/* Making "Trash" icon touchable*/}
                  <Feather style={styles.icon} name="trash" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

/**
 * Setting the Header of the Page
 * When "IndexScreen" is about to be diplayed by React Navigation, this will be called by default
 * And will be implement in the "Header" (above the button)
 * "plus" is by using "Feather" library
 *  */
IndexScreen.navigationOptions = ({ navigation }) => {
  return {
    headerRight: () => (
      <TouchableOpacity
        onPress={() => {
          console.log("+ Icon Clicked");
          navigation.navigate("Create");
        }}
      >
        <Feather style={styles.icon} name="plus" />
      </TouchableOpacity>
    ),
  };
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    //borderBottomWidth: 1,
    borderColor: "gray",
  },
  title: {
    fontSize: 18,
  },
  icon: {
    fontSize: 24,
    paddingRight: 9,
  },
});

export default IndexScreen;
