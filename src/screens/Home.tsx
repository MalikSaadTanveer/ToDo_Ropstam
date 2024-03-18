import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Alert,Image } from 'react-native';

import { Header } from '../components/Header';
import { TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

import AsyncStorage from '@react-native-async-storage/async-storage'
import colors from '../utils/colors';
import { Task,EditTaskArgs } from '../types';
import noTaskImage from '../../assets/images/noTask.png'

export function Home() {

  const [tasks, setTasks] = useState<Task[]>([]);

  const getData = async () => {
    const jsonValue = await AsyncStorage.getItem('@storage_tasksList') 
    if (jsonValue) {
      const newTaskStorage = JSON.parse(jsonValue); 
      setTasks(newTaskStorage);
    }
  }

  function handleAddTask(newTaskTitle: string) {

    const newTask = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }

    const duplicateTask = tasks.find(task => task.title === newTaskTitle);

    if (duplicateTask) {
      return Alert.alert("Duplicate Task", "This task is duplicated and will not be added");
    }

    if (newTaskTitle !== undefined && newTaskTitle !== null) {

      const newList = tasks.map(task => ({ ...task }));

      newList.push(newTask);

      const jsonValue = JSON.stringify(newList);
      AsyncStorage.setItem('@storage_tasksList', jsonValue);

      setTasks(newList);
    }
  }

  function handleToggleTaskDone(id: number) {
    const toogleTask = [...tasks];

    const foundTask = toogleTask.find(task => task.id === id);

    if (!foundTask) {
      return
    }

    foundTask.done = !foundTask.done;
    setTasks(toogleTask);

    const jsonValue = JSON.stringify(toogleTask);
    AsyncStorage.setItem('@storage_tasksList', jsonValue);
  }


  const handleRemoveTask = async (id: number) => {
    const newList = [...tasks];

    Alert.alert('Remove item', 'Are you sure you want to delete?', [
      { 
        text: 'No'
      },
      {
        text: 'Yes',
        onPress: () => {
          setTasks(oldTasks => oldTasks.filter(task => task.id !== id));
          const jsonValue2 = JSON.stringify(newList.filter(task => task.id !== id));
          AsyncStorage.setItem('@storage_tasksList', jsonValue2);
        }
      }
    ]);
  }

  function handleEditTask({ taskId, taskNewTitle }: EditTaskArgs) {
    const updatedTasks = [...tasks];

    const taskToBeUpdated = updatedTasks.find(task => task.id === taskId);

    if (!taskToBeUpdated) {
      return;
    }
    taskToBeUpdated.title = taskNewTitle;
    setTasks(updatedTasks);

    const jsonValue2 = JSON.stringify(updatedTasks);
    AsyncStorage.setItem('@storage_tasksList', jsonValue2);
  }

  useEffect(() => {
    getData();
  }, [])

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      {tasks.length > 0 ? (
        <>
          <TasksList
            tasks={tasks}
            toggleTaskDone={handleToggleTaskDone}
            removeTask={handleRemoveTask}
            editTask={handleEditTask}
          />

        </>)
        :
        <View style={styles.noTaskImageContainer}>
          <Image source={noTaskImage} style={styles.noTaskImage} />
        </View>
      }

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor
  },
  noTaskImageContainer:{
    flex:1,
    justifyContent:'center',
    alignItems: 'center',
  },
  noTaskImage:{
    width:'80%',
    height:'40%'
  }
})