import React,{useState} from 'react';
import {StyleSheet, View, FlatList, Button, Text} from 'react-native';

import GoalInput from './GoalInput';
import GoalItem from './GoalItem';

export default function App() {

  const [goalList, setGoalList] = useState([]);

  // Show adding-item when user clicks the button
  const [isAdd, setIsAdd] = useState(false);

  const addGoalHandler = (goal) => {
    setGoalList(currentGoals => [
      ...currentGoals, {id:Math.random().toString(), value:goal}
    ]);
    cancelGoalHandler();
  }

  const removeGoalHandler = goalId =>{
    setGoalList(currentGoals => 
      currentGoals.filter(goal => goal.id !== goalId))   
  }

  // Remove modal
  const cancelGoalHandler = () => {
    setIsAdd(false);
  }

  // Add a button for new goal
  return (
    <View style={styles.container}>
      <Button title="Add new Goal" onPress={() => setIsAdd(true)}/>
      
      <GoalInput 
      onAddGoal={addGoalHandler}
      onCancel={cancelGoalHandler}
      visible={isAdd} />
      <FlatList
        keyExtractor={(item) => item.id}
        data={goalList}
        renderItem={(item) => (
          <GoalItem
            title={item.item.value}
            id={item.item.id}
            onDelete={removeGoalHandler}
          />
        )}
      />
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:50,
  }, 
});
