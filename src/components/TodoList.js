import React from "react";
import { CardBody, Flex, Spinner } from "@chakra-ui/react";

import useTodo from "../hooks/useTodo";
import TodoItem from "./TodoItem";
import TodoForm from "./TodoForm";

function TodoList() {
  const [isLoading, isError, todoList, createTodo, updateTodo, deleteTodo] =
    useTodo();

  if (isLoading || todoList === null) {
    return (
      <CardBody display="flex" flexDir="column" overflowY="auto" p={0}>
        <Flex
          flexDir="column"
          flex={1}
          py={6}
          overflowY="scroll"
          justifyContent="center"
          alignItems="center"
        >
          <Spinner
            color="blue.500"
            size="xl"
            thickness="4px"
            emptyColor="gray.200"
            speed="0.65s"
          />
        </Flex>
      </CardBody>
    );
  }

  if (isError) {
    return (
      <CardBody display="flex" flexDir="column" overflowY="auto" p={0}>
        <Flex flexDir="column" flex={1} py={6} overflowY="scroll">
          Error
        </Flex>
      </CardBody>
    );
  }

  if (todoList.length === 0) {
    return (
      <CardBody display="flex" flexDir="column" overflowY="auto" p={0}>
        <Flex flexDir="column" flex={1} px={8} py={6} overflowY="scroll">
          할 일이 없습니다.
        </Flex>
        <TodoForm createTodo={createTodo} />
      </CardBody>
    );
  }

  return (
    <CardBody display="flex" flexDir="column" overflowY="auto" p={0}>
      <Flex flexDir="column" flex={1} py={6} overflowY="scroll">
        {todoList.map((item) => (
          <TodoItem
            key={item.id}
            id={item.id}
            text={item.fields.text}
            isDefaultChecked={item.fields.isDone}
            updateTodo={updateTodo}
            deleteTodo={deleteTodo}
          />
        ))}
      </Flex>
      <TodoForm createTodo={createTodo} />
    </CardBody>
  );
}

export default TodoList;
