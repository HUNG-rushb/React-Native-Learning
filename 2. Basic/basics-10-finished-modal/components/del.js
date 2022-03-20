import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Button,
  FlatList,
  Text,
  TextInput,
  Modal,
  TouchableOpacity,
} from "react-native";

const TaskInput = (props) => {
  const [enteredTask, setEnteredTask] = useState("");

  const taskInputHandler = (enteredText) => {
    setEnteredTask(enteredText);
  };

  const addTaskHandler = () => {
    props.onAddTask(enteredTask);

    setEnteredTask("");
  };

  return (
    <View>
      <Modal visible={props.visible} animationType="slide">
        {/* Input  */}
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="To Do ..."
            style={styles.input}
            onChangeText={taskInputHandler}
            value={enteredTask}
            blurOnSubmit={true}
          />

          {/* Add Button  */}
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Button title="Add Something to do" onPress={addTaskHandler} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const TaskItem = (props) => {
  return (
    <TouchableOpacity onPress={props.onDelete.bind(this, props.id)}>
      <View style={styles.listItem}>
        <Text>{props.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default function TodoApp() {
  const [toDoList, setToDoList] = useState([]);

  const addTaskHandler = (taskTitle) => {
    setToDoList((currentTasks) => [
      ...currentTasks,
      { id: Math.random().toString(), value: taskTitle },
    ]);
    // console.log(toDoList);
  };

  const removeTaskHandler = (taskId) => {
    setToDoList((currentTasks) => {
      return currentTasks.filter((task) => task.id !== taskId);
    });
  };

  return (
    <>
      <View style={styles.screen}>
        <View>
          <TaskInput onAddTask={addTaskHandler} />
        </View>

        {toDoList.map((itemData, index) => (
          <TaskItem
            id={itemData.id}
            onDelete={removeTaskHandler}
            title={itemData.value}
          />
        ))}
      </View>

      <View>
        {/* <FlatList
          keyExtractor={(item) => item.id}
          data={toDoList}
          renderItem={(itemData) => (
            <TaskItem
              id={itemData.item.id}
              onDelete={removeTaskHandler}
              title={itemData.item.value}
            />
          )}
        /> */}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 50,
  },

  inputContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "80%",
    borderColor: "black",
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "60%",
  },
  button: {
    width: "40%",
  },

  listItem: {
    padding: 10,
    marginVertical: 10,
    backgroundColor: "#ccc",
    borderColor: "black",
    borderWidth: 1,
  },
});
