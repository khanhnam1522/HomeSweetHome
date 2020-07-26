import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import Screen from "../components/Screen";
import {
  ListItem,
  ListItemDeleteAction,
  ListItemSeparator,
} from "../components/lists";
import useApi from "../hooks/useApi";
import messagesApi from "../api/messages";
import ActivityIndicator from "../components/ActivityIndicator";

function MessagesScreen(props) {
  const getMessagesApi = useApi(messagesApi.get);
  useEffect(() => {
    getMessagesApi.request();
  }, []);
  const handleDelete = (message) => {
    // Delete the message from messages
    getMessagesApi.setData(
      getMessagesApi.data.filter((m) => m._id !== message._id)
    );
  };

  return (
    <>
      <ActivityIndicator visible={getMessagesApi.loading} />

      <Screen>
        <FlatList
          data={getMessagesApi.data}
          keyExtractor={(message) => message._id}
          refreshing={getMessagesApi.refreshing}
          onRefresh={getMessagesApi.handleRefresh}
          renderItem={({ item }) => (
            <ListItem
              title={item.fromUser.name}
              subTitle={item.content}
              image={require("../assets/profilePicture.png")}
              onPress={() => console.log("Message selected", item)}
              renderRightActions={() => (
                <ListItemDeleteAction onPress={() => handleDelete(item)} />
              )}
            />
          )}
          ItemSeparatorComponent={ListItemSeparator}
        />
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({});

export default MessagesScreen;
